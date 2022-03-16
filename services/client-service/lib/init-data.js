const _ = require('lodash');
const Promise = require('bluebird');
const logger = require('@moment/logger').defaultLogger;
const cache = require('./cache');

const saveCollectionInRedis = async ({ type, mediaCollection }) => {
  await Promise.each(Object.keys(mediaCollection), async (collection) => {
    await cache.set({
      key: `${type}.${collection}`,
      value: mediaCollection[collection].data,
      ttlPriority: mediaCollection[collection].ttl,
    });

    logger.info(`Set new collection in redis`, `${type}.${collection}`);
  });
};

const initData = async () => {
  const isMoviesCached = await cache.getWithPrefix({ prefix: 'movie.*' });
  const isTvShowsCached = await cache.getWithPrefix({ prefix: 'tv.*' });
  const isBooksCached = await cache.getWithPrefix({ prefix: 'books.*' });
  const isCollectionNoCached =
    _.isEmpty(isMoviesCached) || _.isEmpty(isTvShowsCached) || _.isEmpty(isBooksCached);
  if (isCollectionNoCached) {
    logger.info('Refetching to load collection in cache');
    // Initalize TheMovieDb API client
    // eslint-disable-next-line global-require
    const { TheMovieDbApiClient } = require('../../../infra/api-clients');
    const TheMovieDBApiClient = TheMovieDbApiClient.getInstance();
    // load movies collections to redis
    const moviesCollections = await TheMovieDBApiClient.getCollections({ mediaType: 'movie' });
    await saveCollectionInRedis({ type: 'movie', mediaCollection: moviesCollections });
    // load tvshows collections to redis
    const tvShowsCollections = await TheMovieDBApiClient.getCollections({ mediaType: 'tv' });
    await saveCollectionInRedis({ type: 'tv', mediaCollection: tvShowsCollections });

    // Initialize Google Books API client
    // eslint-disable-next-line global-require
    const { GoogleBooksApiClient } = require('../../../infra/api-clients');
    const GoogleBooksAPIClient = GoogleBooksApiClient.getInstance();
    const booksCollections = await GoogleBooksAPIClient.getCollections();
    await saveCollectionInRedis({ type: 'books', mediaCollection: booksCollections });

    logger.info('Collections loaded to redis');
  }
};

module.exports = {
  initData,
};

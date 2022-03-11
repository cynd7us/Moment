const _ = require('lodash');
const Promise = require('bluebird');
const cache = require('./cache');

const saveCollectionInRedis = async ({ type, mediaCollection }) => {
  await Promise.each(Object.keys(mediaCollection), async (collection) => {
    await cache.set({
      key: `${type}.${collection}`,
      value: mediaCollection[collection].data,
      ttlPriority: mediaCollection[collection].ttl,
    });
  });
};

const initData = async () => {
  const isMoviesCached = await cache.getWithPrefix({ prefix: 'movie.*' });
  const isTvShowsCached = await cache.getWithPrefix({ prefix: 'tv.*' });
  const isCollectionNoCached = _.isEmpty(isMoviesCached) && _.isEmpty(isTvShowsCached);
  if (isCollectionNoCached) {
    // eslint-disable-next-line global-require
    const { TheMovieDbApiClient } = require('../../../infra/api-clients');
    const TheMovieDBApiClient = TheMovieDbApiClient.getInstance();
    // load movies collections to redis
    const moviesCollections = await TheMovieDBApiClient.getCollections({ mediaType: 'movie' });
    await saveCollectionInRedis({ type: 'movie', mediaCollection: moviesCollections });
    // load tvshows collections to redis
    const tvShowsCollections = await TheMovieDBApiClient.getCollections({ mediaType: 'tv' });
    await saveCollectionInRedis({ type: 'tv', mediaCollection: tvShowsCollections });
  }
};

module.exports = {
  initData,
};

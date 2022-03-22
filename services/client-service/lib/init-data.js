const logger = require('./logger');
const cache = require('./cache');
const { moviesRepository, tvShowsRepository, booksRepository } = require('../repositories');

const initData = async () => {
  const isMoviesCached = await cache.getWithPrefix({ prefix: 'movie.*' });
  const isTvShowsCached = await cache.getWithPrefix({ prefix: 'tv.*' });
  const isBooksCached = await cache.getWithPrefix({ prefix: 'books.*' });
  const isCollectionNoCached =
    isMoviesCached.length !== 3 || isTvShowsCached.length !== 3 || isBooksCached.length !== 3;
  if (isCollectionNoCached) {
    logger.info('Refetching to load collection in cache');
    await moviesRepository.fetchAndSaveCollections();
    await tvShowsRepository.fetchAndSaveCollections();
    await booksRepository.fetchAndSaveCollections();
    logger.info('Collections loaded to redis');
  }
};

module.exports = {
  initData,
};

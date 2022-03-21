const { ApplicationError, EntityNotFoundError } = require('@moment/http-errors');
const { TheMovieDbApiClient } = require('@moment/api-clients');
const Promise = require('bluebird');
const logger = require('../lib/logger');
const cache = require('../lib/cache');

const getMostRated = async () => {
  let mostRatedTvShows;
  try {
    mostRatedTvShows = await cache.get({ key: 'tv.mostRated', isJson: true });
  } catch (error) {
    logger.error('failed to find most rated tv shows from cache', { error });
    throw new ApplicationError({ displayMessage: 'failed to find most rated tv shows from cache' });
  }
  return mostRatedTvShows;
};

const getPopular = async () => {
  let popularTvShows;
  try {
    popularTvShows = await cache.get({ key: 'tv.popular', isJson: true });
  } catch (error) {
    logger.error('failed to popular tv shows from cache', { error });
    throw new ApplicationError({ displayMessage: 'failed to find popular tv shows from cache' });
  }
  return popularTvShows;
};

const getUpcoming = async () => {
  let upcomingTvShows;
  try {
    upcomingTvShows = await cache.get({ key: 'tv.upcoming', isJson: true });
  } catch (error) {
    logger.error('failed to find latest tv shows from cache', { error });
    throw new ApplicationError({ displayMessage: 'failed to find latest tv shows from cache' });
  }
  return upcomingTvShows;
};

const getTvShowDetails = async ({ tvShow }) => {
  const TheMovieDBAPIClient = TheMovieDbApiClient.getInstance();
  let tvShowDetails;

  try {
    tvShowDetails = await TheMovieDBAPIClient.search({ mediaType: 'tv', keyword: tvShow });
  } catch (error) {
    logger.error('failed to find tv show details', { error, tvShow });
    throw new EntityNotFoundError({ displayMessage: 'failed to find tv show' });
  }

  return tvShowDetails;
};

const fetchAndSaveCollections = async () => {
  const TheMovieDBAPIClient = TheMovieDbApiClient.getInstance();
  const tvCollections = await TheMovieDBAPIClient.getCollections({
    mediaType: 'tv',
  });
  await Promise.each(tvCollections, async (collection) => {
    await cache.set({
      key: `tv.${collection.type}`,
      value: collection.data,
      ttlPriority: collection.ttl,
    });

    logger.info('new tv collection saved in redis', { type: collection.type });
  });
};

module.exports = {
  getMostRated,
  getPopular,
  getUpcoming,
  getTvShowDetails,
  fetchAndSaveCollections,
};

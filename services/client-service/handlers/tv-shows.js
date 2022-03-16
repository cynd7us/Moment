const { TheMovieDbApiClient } = require('@moment/api-clients');
const { EntityNotFoundError, ApplicationError } = require('@moment/http-errors');
const cache = require('../lib/cache');
const logger = require('../lib/logger');

const getMostRatedTvShows = async () => {
  logger.info('get most rated tv shows requested');
  let mostRatedTvShows;
  try {
    mostRatedTvShows = await cache.get({ key: 'tv.mostRated', isJson: true });
  } catch (error) {
    logger.error('failed to find most rated tv shows from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to find most rated tv shows from cache' });
  }
  return mostRatedTvShows;
};

const getPopularTvShows = async () => {
  logger.info('get popular tv shows requested');
  let popularTvShows;
  try {
    popularTvShows = await cache.get({ key: 'tv.popular', isJson: true });
  } catch (error) {
    logger.error('failed to popular tv shows from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to find popular tv shows from cache' });
  }
  return popularTvShows;
};

const getLatestTvShows = async () => {
  logger.info('get latest tv shows requested');
  let upcomingTvShows;
  try {
    upcomingTvShows = await cache.get({ key: 'tv.upcoming', isJson: true });
  } catch (error) {
    logger.error('failed to find latest tv shows from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to find latest tv shows from cache' });
  }
  return upcomingTvShows;
};

const getTvShowDetails = async ({ params: { tvShow } }) => {
  logger.info('get tv show details requested');
  const TheMovieDBAPIClient = TheMovieDbApiClient.getInstance();
  let tvShowDetails;

  try {
    tvShowDetails = await TheMovieDBAPIClient.search({ mediaType: 'tv', keyword: tvShow });
  } catch (error) {
    logger.error('failed to find tv show details', error, tvShow);
    throw new EntityNotFoundError({ displayMessage: 'failed to find tv show' });
  }

  return tvShowDetails;
};

module.exports = {
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getTvShowDetails,
};

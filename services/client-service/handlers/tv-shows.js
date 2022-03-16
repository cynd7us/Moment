const cache = require('../lib/cache');
const logger = require('../lib/logger');

const getMostRatedTvShows = async () => {
  logger.info('get most rated tv shows requested');
  const mostRatedTvShows = await cache.get({ key: 'tv.mostRated', isJson: true });
  return mostRatedTvShows;
};

const getPopularTvShows = async () => {
  logger.info('get popular tv shows requested');
  const popularTvShows = await cache.get({ key: 'tv.popular', isJson: true });
  return popularTvShows;
};

const getLatestTvShows = async () => {
  logger.info('get latest tv shows requested');
  const upcomingTvShows = await cache.get({ key: 'tv.upcoming', isJson: true });
  return upcomingTvShows;
};

module.exports = {
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
};

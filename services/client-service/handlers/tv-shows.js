const cache = require('../lib/cache');

const getMostRatedTvShows = async () => {
  const mostRatedTvShows = await cache.get({ key: 'tv.mostRated', isJson: true });
  return mostRatedTvShows;
};

const getPopularTvShows = async () => {
  const popularTvShows = await cache.get({ key: 'tv.popular', isJson: true });
  return popularTvShows;
};

const getLatestTvShows = async () => {
  const upcomingTvShows = await cache.get({ key: 'tv.upcoming', isJson: true });
  return upcomingTvShows;
};

module.exports = {
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
};

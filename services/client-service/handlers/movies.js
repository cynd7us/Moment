const cache = require('../lib/cache');
const logger = require('../lib/logger');

const getMostRatedMovies = async () => {
  logger.info('get most rated movies requested');
  const mostRatedMovies = await cache.get({ key: 'movie.mostRated', isJson: true });
  return mostRatedMovies;
};

const getPopularMovies = async () => {
  logger.info('get popular movies requested');
  const mostRatedMovies = await cache.get({ key: 'movie.popular', isJson: true });
  return mostRatedMovies;
};

const getUpcomingMovies = async () => {
  logger.info('get upcoming movies requested');
  const mostRatedMovies = await cache.get({ key: 'movie.upcoming', isJson: true });
  return mostRatedMovies;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
};

const { TheMovieDbApiClient } = require('../../../infra/api-clients');
const cache = require('../lib/cache');

const getMostRatedMovies = async () => {
  const mostRatedMovies = await cache.get({ key: 'movie.mostRated', isJson: true });
  return mostRatedMovies;
};

const getPopularMovies = async () => {
  const mostRatedMovies = await cache.get({ key: 'movie.popular', isJson: true });
  return mostRatedMovies;
};

const getUpcomingMovies = async () => {
  const mostRatedMovies = await cache.get({ key: 'movie.upcoming', isJson: true });
  return mostRatedMovies;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
};

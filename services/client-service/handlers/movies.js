const { TheMovieDbApiClient } = require('@moment/api-clients');
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

const getMovieDetails = async ({ params: { movie } }) => {
  logger.info('get movie details requested');
  const TheMovieDBAPIClient = TheMovieDbApiClient.getInstance();
  let movieDetails;
  try {
    movieDetails = await TheMovieDBAPIClient.search({ mediaType: 'movie', keyword: movie });
  } catch (error) {
    logger.error('failed to find movie details', error, movie);
    throw new Error('failed to find movie details');
  }

  return movieDetails;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
};

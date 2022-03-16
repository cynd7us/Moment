const { TheMovieDbApiClient } = require('@moment/api-clients');
const { EntityNotFoundError, ApplicationError } = require('@moment/http-errors');
const cache = require('../lib/cache');
const logger = require('../lib/logger');

const getMostRatedMovies = async () => {
  logger.info('get most rated movies requested');
  let mostRatedMovies;
  try {
    mostRatedMovies = await cache.get({ key: 'movie.mostRated', isJson: true });
  } catch (error) {
    logger.error('failed to get most rated movies from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get most rated movies from cache' });
  }
  return mostRatedMovies;
};

const getPopularMovies = async () => {
  logger.info('get popular movies requested');
  let popularMovies;
  try {
    popularMovies = await cache.get({ key: 'movie.popular', isJson: true });
  } catch (error) {
    logger.error('failed to get popular movies from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get popular movies from cache' });
  }
  return popularMovies;
};

const getUpcomingMovies = async () => {
  logger.info('get upcoming movies requested');
  let upcomingMovies;
  try {
    upcomingMovies = await cache.get({ key: 'movie.upcoming', isJson: true });
  } catch (error) {
    logger.error('failed to get upcoming movies from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get upcoming movies from cache' });
  }
  return upcomingMovies;
};

const getMovieDetails = async ({ params: { movie } }) => {
  logger.info('get movie details requested');
  const TheMovieDBAPIClient = TheMovieDbApiClient.getInstance();
  let movieDetails;
  try {
    movieDetails = await TheMovieDBAPIClient.search({ mediaType: 'movie', keyword: movie });
  } catch (error) {
    logger.error('failed to find movie details', error, movie);
    throw new EntityNotFoundError({ displayMessage: 'failed to find movie details' });
  }

  return movieDetails;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
};

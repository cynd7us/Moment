const { ApplicationError, EntityNotFoundError } = require('@moment/http-errors');
const { TheMovieDbApiClient } = require('@moment/api-clients');
const Promise = require('bluebird');
const logger = require('../lib/logger');
const cache = require('../lib/cache');

const getMostRated = async () => {
  let mostRatedMovies;
  try {
    mostRatedMovies = await cache.get({ key: 'movie.mostRated', isJson: true });
  } catch (error) {
    logger.error('failed to get most rated movies from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get most rated movies from cache' });
  }
  return mostRatedMovies;
};

const getPopular = async () => {
  let popularMovies;
  try {
    popularMovies = await cache.get({ key: 'movie.popular', isJson: true });
  } catch (error) {
    logger.error('failed to get popular movies from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get popular movies from cache' });
  }
  return popularMovies;
};

const getUpcoming = async () => {
  let upcomingMovies;
  try {
    upcomingMovies = await cache.get({ key: 'movie.upcoming', isJson: true });
  } catch (error) {
    logger.error('failed to get upcoming movies from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get upcoming movies from cache' });
  }
  return upcomingMovies;
};

const getMovieDetails = async ({ movie }) => {
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

const fetchAndSaveCollections = async () => {
  const TheMovieDBAPIClient = TheMovieDbApiClient.getInstance();
  const movieCollections = await TheMovieDBAPIClient.getCollections({
    mediaType: 'movie',
  });
  await Promise.each(movieCollections, async (collection) => {
    await cache.set({
      key: `movie.${collection.type}`,
      value: collection.data,
      ttlPriority: collection.ttl,
    });

    logger.info('new movie collection saved in redis', { type: collection.type });
  });
};

module.exports = {
  getMostRated,
  getPopular,
  getUpcoming,
  getMovieDetails,
  fetchAndSaveCollections,
};

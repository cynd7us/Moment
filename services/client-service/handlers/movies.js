const { moviesRepository } = require('../repositories');
const logger = require('../lib/logger');

const getMostRatedMovies = async () => {
  logger.info('get most rated movies requested');
  const mostRatedMovies = await moviesRepository.getMostRated();
  return mostRatedMovies;
};

const getPopularMovies = async () => {
  logger.info('get popular movies requested');
  const popularMovies = await moviesRepository.getPopular();
  return popularMovies;
};

const getUpcomingMovies = async () => {
  logger.info('get upcoming movies requested');
  const upcomingMovies = await moviesRepository.getUpcoming();
  return upcomingMovies;
};

const getMovieDetails = async ({ params: { movie } }) => {
  logger.info('get movie details requested');
  const movieDetails = await moviesRepository.getMovieDetails({ movie });
  return movieDetails;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
};

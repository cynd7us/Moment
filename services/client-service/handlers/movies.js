const { TheMovieDbApiClient } = require('../../../infra/api-clients');

const getMostRatedMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getMostRated();
  return movies;
};

const getPopularMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getPopular();
  return movies;
};

const getUpcomingMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getUpcoming();
  return movies;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
};

const { TheMovieDbApiClient } = require('../../../infra/api-clients');

const getMostRatedMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getMostRated({ mediaType: 'movie' });
  return movies;
};

const getPopularMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getPopular({ mediaType: 'movie' });
  return movies;
};

const getUpcomingMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getUpcoming({ mediaType: 'movie' });
  return movies;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
};

const { TheMovieDbApiClient } = require('../../../infra/api-clients');

const getMostRatedTvShows = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getMostRated({ mediaType: 'tv' });
  return movies;
};

const getPopularTvShows = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getPopular({ mediaType: 'tv' });
  return movies;
};

const getLatestTvShows = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getLatest();
  return movies;
};

module.exports = {
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
};

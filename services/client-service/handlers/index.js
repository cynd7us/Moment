const { getMostRatedTvShows, getPopularTvShows, getLatestTvShows } = require('./tv-shows');
const { getMostRatedMovies, getPopularMovies, getUpcomingMovies } = require('./movies');
const { getMostRatedBooks, getPopularBooks, getUpcomingBooks } = require('./books');

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
};

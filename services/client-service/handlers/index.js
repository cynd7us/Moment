const {
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getTvShowDetails,
} = require('./tv-shows');
const {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
} = require('./movies');
const { getMostRatedBooks, getPopularBooks, getUpcomingBooks, getBookDetails } = require('./books');

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getTvShowDetails,
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
  getBookDetails,
};

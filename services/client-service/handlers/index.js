const {
  getMostRatedTvShows,
  getPopularTvShows,
  getUpcomingTvShows,
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
  getUpcomingTvShows,
  getTvShowDetails,
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
  getBookDetails,
};

const { getMostRatedTvShows, getPopularTvShows, getLatestTvShows } = require('./tv-shows');
const { getMostRatedMovies, getPopularMovies, getUpcomingMovies } = require('./movies');
const { getMostRatedBooks, getPopularBooks, getUpcomingBooks } = require('./books');

const { getMostRatedGames } = require('./games');

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getMostRatedGames,
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
};

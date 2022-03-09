const { getMostRatedTvShows, getPopularTvShows, getLatestTvShows } = require('./tv-shows');
const { getMostRatedMovies, getPopularMovies, getUpcomingMovies } = require('./movies');

const { getMostRatedGames } = require('./games');

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getMostRatedGames,
};

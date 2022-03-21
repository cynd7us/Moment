const { tvShowsRepository } = require('../repositories');
const logger = require('../lib/logger');

const getMostRatedTvShows = async () => {
  logger.info('get most rated tv shows requested');
  const mostRatedTvShows = await tvShowsRepository.getMostRated();
  return mostRatedTvShows;
};

const getPopularTvShows = async () => {
  logger.info('get popular tv shows requested');
  const popularTvShows = await tvShowsRepository.getPopular();
  return popularTvShows;
};

const getUpcomingTvShows = async () => {
  logger.info('get latest tv shows requested');
  const upcomingTvShows = await tvShowsRepository.getUpcoming();
  return upcomingTvShows;
};

const getTvShowDetails = async ({ params: { tvShow } }) => {
  logger.info('get tv show details requested');
  const tvShowDetails = await tvShowsRepository.getTvShowDetails({ tvShow });
  return tvShowDetails;
};

module.exports = {
  getMostRatedTvShows,
  getPopularTvShows,
  getUpcomingTvShows,
  getTvShowDetails,
};

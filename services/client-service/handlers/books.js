const cache = require('../lib/cache');
const logger = require('../lib/logger');

const getMostRatedBooks = async () => {
  logger.info('get most rated books requested');
  const mostRatedBooks = await cache.get({ key: 'books.mostRated', isJson: true });
  return mostRatedBooks;
};

const getPopularBooks = async () => {
  logger.info('get popular books requested');
  const popularBooks = await cache.get({ key: 'books.popular', isJson: true });
  return popularBooks;
};

const getUpcomingBooks = async () => {
  logger.info('get upcoming books requested');
  const upcomingBooks = await cache.get({ key: 'books.upcoming', isJson: true });
  return upcomingBooks;
};

module.exports = {
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
};

const { booksRepository } = require('../repositories');
const logger = require('../lib/logger');

const getMostRatedBooks = async () => {
  logger.info('get most rated books requested');
  const mostRatedBooks = await booksRepository.getMostRated();
  return mostRatedBooks;
};

const getPopularBooks = async () => {
  logger.info('get popular books requested');
  const popularBooks = await booksRepository.getPopular();
  return popularBooks;
};

const getUpcomingBooks = async () => {
  logger.info('get upcoming books requested');
  const upcomingBooks = await booksRepository.getUpcoming();
  return upcomingBooks;
};

const getBookDetails = async ({ params: { book } }) => {
  logger.info('get book details requested');
  const bookDetails = await booksRepository.getBookDetails({ book });
  return bookDetails;
};

module.exports = {
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
  getBookDetails,
};

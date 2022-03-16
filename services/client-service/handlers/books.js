const { GoogleBooksApiClient } = require('@moment/api-clients');
const { EntityNotFoundError } = require('@moment/http-errors');

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

const getBookDetails = async ({ params: { book } }) => {
  logger.info('get book details requested', book);
  const GoogleBooksAPIClient = GoogleBooksApiClient.getInstance();
  let bookDetails;
  try {
    bookDetails = await GoogleBooksAPIClient.search(book);
  } catch (error) {
    logger.error('failed to find details on book', error, book);
    throw new EntityNotFoundError({ displayMessage: 'failed to find book details' });
  }

  return bookDetails;
};

module.exports = {
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
  getBookDetails,
};

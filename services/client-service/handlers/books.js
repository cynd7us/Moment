const { GoogleBooksApiClient } = require('@moment/api-clients');
const { EntityNotFoundError, ApplicationError } = require('@moment/http-errors');

const cache = require('../lib/cache');
const logger = require('../lib/logger');

const getMostRatedBooks = async () => {
  logger.info('get most rated books requested');
  let mostRatedBooks;
  try {
    mostRatedBooks = await cache.get({ key: 'books.mostRated', isJson: true });
  } catch (error) {
    logger.error('failed to get most rated books from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get most rated books from cache' });
  }
  return mostRatedBooks;
};

const getPopularBooks = async () => {
  logger.info('get popular books requested');
  let popularBooks;
  try {
    popularBooks = await cache.get({ key: 'books.popular', isJson: true });
  } catch (error) {
    logger.error('failed to get popular books from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get popular books from cache' });
  }
  return popularBooks;
};

const getUpcomingBooks = async () => {
  logger.info('get upcoming books requested');
  let upcomingBooks;
  try {
    upcomingBooks = await cache.get({ key: 'books.upcoming', isJson: true });
  } catch (error) {
    logger.error('failed to get upcoming books from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get upcoming books from cache' });
  }

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

const { ApplicationError, EntityNotFoundError } = require('@moment/http-errors');
const { GoogleBooksApiClient } = require('@moment/api-clients');
const Promise = require('bluebird');
const logger = require('../lib/logger');
const cache = require('../lib/cache');

const getMostRated = async () => {
  let mostRatedBooks;
  try {
    mostRatedBooks = await cache.get({ key: 'books.mostRated', isJson: true });
  } catch (error) {
    logger.error('failed to get most rated books from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get most rated books from cache' });
  }
  return mostRatedBooks;
};

const getPopular = async () => {
  let popularBooks;
  try {
    popularBooks = await cache.get({ key: 'books.popular', isJson: true });
  } catch (error) {
    logger.error('failed to get popular books from cache', error);
    throw new ApplicationError({ displayMessage: 'failed to get popular books from cache' });
  }
  return popularBooks;
};

const getUpcoming = async () => {
  let upcomingBooks;
  try {
    upcomingBooks = await cache.get({ key: 'books.upcoming', isJson: true });
  } catch (error) {
    logger.error('failed to get upcoming books from cache', error);
    throw new ApplicationError({
      displayMessage: 'failed to get upcoming books from cache',
    });
  }

  return upcomingBooks;
};

const getBookDetails = async ({ book }) => {
  const GoogleBooksAPIClient = GoogleBooksApiClient.getInstance();
  let bookDetails;
  try {
    bookDetails = await GoogleBooksAPIClient.search(book);
  } catch (error) {
    logger.error('failed to find details on book');
    throw new EntityNotFoundError({
      displayMessage: { data: 'some data', error: 'some error ' },
      displayDetails: 'this is the reasoning',
    });
  }

  return bookDetails;
};

const fetchAndSaveCollections = async () => {
  const GoogleBooksAPIClient = GoogleBooksApiClient.getInstance();
  const booksCollections = await GoogleBooksAPIClient.getCollections();
  await Promise.each(booksCollections, async (collection) => {
    await cache.set({
      key: `books.${collection.type}`,
      value: collection.data,
      ttlPriority: collection.ttl,
    });

    logger.info('new book collection saved in redis', { type: collection.type });
  });
};

module.exports = {
  getMostRated,
  getPopular,
  getUpcoming,
  getBookDetails,
  fetchAndSaveCollections,
};

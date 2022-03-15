const cache = require('../lib/cache');

const getMostRatedBooks = async () => {
  const mostRatedBooks = await cache.get({ key: 'books.mostRated', isJson: true });
  return mostRatedBooks;
};

const getPopularBooks = async () => {
  const popularBooks = await cache.get({ key: 'books.popular', isJson: true });
  return popularBooks;
};

const getUpcomingBooks = async () => {
  const upcomingBooks = await cache.get({ key: 'books.upcoming', isJson: true });
  return upcomingBooks;
};

module.exports = {
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
};

const axios = require('axios');
const Promise = require('bluebird');
const Logger = require('@moment/logger');

Logger.initDefaultLogger({
  serviceName: 'GoogleBooksApiClient',
  prettyConsole: true,
});

const logger = Logger.defaultLogger;

class GoogleBooksApiClient {
  constructor() {
    this.baseUrl = `https://www.googleapis.com/books/v1`;
  }

  async search(keyword) {
    let response;
    try {
      response = await axios.get(`${this.baseUrl}/volumes?q=${keyword}`);
      logger.info('request sent to Google books API');
    } catch (error) {
      logger.error(`Failed to query book: ${keyword}`, error);
    }

    if (!response.data.items) {
      throw new Error(`Failed to query book, no items returned`);
    }

    logger.info('Google books API successfuly returned book details');
    return response.data.items[0].volumeInfo;
  }

  async getMostRated() {
    const mostRatedBooks = [
      'To Kill a Mockingbird',
      'The Hobbit, or There and Back Again',
      '1984',
      '	Pride and Prejudice',
      'Animal Farm',
      'The Great Gatsby',
      'The Diary of a Young Girl',
      '	Lord of the Flies',
      'The Catcher in the Rye',
      'The Kite Runner',
    ];
    const books = [];
    await Promise.each(mostRatedBooks, async (book) => {
      let volumeItem;
      try {
        volumeItem = await this.search(book);
      } catch (error) {
        // no items returned
        logger.error('No items returned from Google books API', error, book);
      }

      books.push(volumeItem);
    });

    logger.info('Most rated books collection was successfuly fetched');
    return books;
  }

  async getPopular() {
    const popularBooks = [
      'The Little Prince',
      'The Book Thief',
      'Jane Eyre',
      'Lord of the Flies',
      'Romeo and Juliet',
      'The Kite Runner',
      '	The Giving Tree',
      'Little Women',
    ];
    const books = [];
    await Promise.each(popularBooks, async (book) => {
      let volumeItem;
      try {
        volumeItem = await this.search(book);
      } catch (error) {
        // no items returned
        logger.error('No items returned from Google books API', error, book);
      }

      books.push(volumeItem);
    });

    logger.info('Popular books collection was successfuly fetched');
    return books;
  }

  async getUpcoming() {
    const upcomingBooks = [
      'The Maid',
      'Reminders of Him',
      'A Flicker in the Dark',
      'Her Last Goodbye',
      '	Olga Dies Dreaming',
      'The Violin Conspiracy',
      '	A Ballad of Love and Glory',
      'The Last House on the Street',
      'How High We Go in the Dark',
      'Young Mungo',
      'Wahala',
      'In Search of a Prince',
      'Reckless Girls',
    ];
    const books = [];
    await Promise.each(upcomingBooks, async (book) => {
      let volumeItem;
      try {
        volumeItem = await this.search(book);
      } catch (error) {
        // no items returned
        logger.error('No items returned from Google books API', error, book);
      }

      books.push(volumeItem);
    });

    logger.info('Upcoming books collection was successfuly fetched');
    return books;
  }

  async getCollections() {
    const mostRated = await this.getMostRated();
    const popular = await this.getPopular();
    const upcoming = await this.getUpcoming();

    return [
      {
        type: 'mostRated',
        data: mostRated,
        ttl: 'high',
      },
      {
        type: 'popular',
        data: popular,
        ttl: 'medium',
      },
      {
        type: 'upcoming',
        data: upcoming,
        ttl: 'low',
      },
    ];
  }

  static getInstance() {
    if (!this.instance) {
      this.initDefaultInstance();
    }

    return this.instance;
  }

  static initDefaultInstance() {
    this.instance = new GoogleBooksApiClient();
  }
}

module.exports = GoogleBooksApiClient;

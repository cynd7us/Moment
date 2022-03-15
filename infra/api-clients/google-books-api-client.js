const axios = require('axios');
const Promise = require('bluebird');
const logger = require('../logger').defaultLogger;

class GoogleBooksApiClient {
  constructor() {
    this.baseUrl = `https://www.googleapis.com/books/v1`;
  }

  async search(keyword) {
    let response;
    try {
      response = await axios.get(`${this.baseUrl}/volumes?q=${keyword}`);
    } catch (error) {
      logger.error(`Failed to query book: ${keyword}`, error);
    }

    if (!response.data.items) {
      throw new Error(`Failed to query book, no items returned`);
    }

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
      const bookDetails = await this.search(book);
      books.push(bookDetails);
    });

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
      const bookDetails = await this.search(book);
      books.push(bookDetails);
    });

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
      const bookDetails = await this.search(book);
      books.push(bookDetails);
    });

    return books;
  }

  async getCollections() {
    const mostRated = await this.getMostRated();
    const popular = await this.getPopular();
    const upcoming = await this.getUpcoming();

    return {
      mostRated: {
        ttl: 'high',
        data: mostRated,
      },
      popular: {
        ttl: 'medium',
        data: popular,
      },
      upcoming: {
        ttl: 'low',
        data: upcoming,
      },
    };
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

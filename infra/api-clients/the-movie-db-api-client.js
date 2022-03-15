const axios = require('axios');
const logger = require('../logger').defaultLogger;

class TheMovieDbApiClient {
  constructor(options) {
    this.baseUrl = `https://api.themoviedb.org/3`;
    this.authorizationHeaders = {
      authorization: `Bearer ${options.accessToken}`,
    };

    if (!options.accessToken) {
      logger.error('Please export appropirate access token to themoviedb to run this app.');
      process.exit(1);
    }
  }

  async getMostRated({ mediaType }) {
    const url = `${this.baseUrl}/${mediaType}/top_rated?language=en&page=1`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
    } catch (error) {
      logger.error(`Failed to query most rated ${mediaType}`, error);
    }

    const {
      data: { results: mostRated },
    } = response;
    return mostRated;
  }

  async getPopular({ mediaType }) {
    const url = `${this.baseUrl}/${mediaType}/popular?language=en&page=1`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
    } catch (error) {
      logger.error(`Failed to query popular ${mediaType}`, error);
    }

    const {
      data: { results: popular },
    } = response;
    return popular;
  }

  async getUpcoming() {
    // upcoming doesn't exist for tv
    const url = `${this.baseUrl}/movie/upcoming?language=en&page=1`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
    } catch (error) {
      logger.error(`Failed to query upcoming movies`, error);
    }

    const {
      data: { results: upcoming },
    } = response;
    return upcoming;
  }

  async getLatest() {
    const url = `${this.baseUrl}/discover/tv?primary_release_year=2022&sort_by=vote_average.desc`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
    } catch (error) {
      logger.error(`Failed to query latest tv shows`, error);
    }

    const {
      data: { results: latest },
    } = response;
    return latest;
  }

  async getCollections({ mediaType }) {
    const mostRated = await this.getMostRated({ mediaType });
    const popular = await this.getPopular({ mediaType });
    let upcoming;
    if (mediaType === 'movie') {
      upcoming = await this.getUpcoming();
    } else {
      upcoming = await this.getLatest();
    }

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
      this.initDefaultInstance({ accessToken: process.env.THE_MOVIE_DB_ACCESS_TOKEN });
    }

    return this.instance;
  }

  static initDefaultInstance(options) {
    this.instance = new TheMovieDbApiClient(options);
  }
}

module.exports = TheMovieDbApiClient;

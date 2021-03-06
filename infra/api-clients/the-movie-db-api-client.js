const axios = require('axios');
const Logger = require('@moment/logger');

Logger.initDefaultLogger({
  serviceName: 'TheMovieDbApiClient',
  prettyConsole: true,
});

const logger = Logger.defaultLogger;

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

  async search({ mediaType, keyword }) {
    const url = `${this.baseUrl}/search/${mediaType}?query=${keyword}`;
    logger.info(url);
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
      logger.info('request sent to TheMovieDB API', { url });
    } catch (error) {
      logger.error('failed to find item in TheMovieDB', { error, mediaType: keyword });
      throw new Error('failed to find item in TheMovieDB');
    }

    const { id: itemId } = response.data.results[0];
    let itemDetailsResponse;
    try {
      const getItemDetailsUrl = `${this.baseUrl}/${mediaType}/${itemId}`;
      itemDetailsResponse = await axios.get(getItemDetailsUrl, {
        headers: this.authorizationHeaders,
      });
      logger.info('request sent to TheMovieDB API', { url: getItemDetailsUrl });
    } catch (error) {
      logger.error('failed to get item details', { error });
      throw new Error('failed to find item details');
    }

    return itemDetailsResponse.data;
  }

  async getMostRated({ mediaType }) {
    const url = `${this.baseUrl}/${mediaType}/top_rated?language=en&page=1`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
      logger.info('request sent to TheMovieDB API', { url });
    } catch (error) {
      logger.error(`failed to query most rated ${mediaType}`, { error });
    }

    const {
      data: { results: mostRated },
    } = response;

    logger.info(`Most rated ${mediaType} collection was successfuly fetched`);
    return mostRated;
  }

  async getPopular({ mediaType }) {
    const url = `${this.baseUrl}/${mediaType}/popular?language=en&page=1`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
      logger.info('request sent to TheMovieDB API', { url });
    } catch (error) {
      logger.error(`Failed to query popular ${mediaType}`, { error });
    }

    const {
      data: { results: popular },
    } = response;

    logger.info(`Popular ${mediaType} collection was successfuly fetched`);
    return popular;
  }

  async getUpcoming() {
    // upcoming doesn't exist for tv
    const url = `${this.baseUrl}/movie/upcoming?language=en&page=1`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
      logger.info('request sent to TheMovieDB API', { url });
    } catch (error) {
      logger.error(`Failed to query upcoming movies`, { error });
    }

    const {
      data: { results: upcoming },
    } = response;

    logger.info('Upcoming movies collection was successfuly fetched');
    return upcoming;
  }

  async getLatest() {
    const url = `${this.baseUrl}/discover/tv?primary_release_year=2022&sort_by=vote_average.desc`;
    let response;
    try {
      response = await axios.get(url, { headers: this.authorizationHeaders });
      logger.info('request sent to TheMovieDB API', { url });
    } catch (error) {
      logger.error(`Failed to query latest tv shows`, { error });
    }

    const {
      data: { results: latest },
    } = response;

    logger.info('Latest tv shows collection was successfuly fetched');
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
      this.initDefaultInstance({ accessToken: process.env.THE_MOVIE_DB_ACCESS_TOKEN });
    }

    return this.instance;
  }

  static initDefaultInstance(options) {
    this.instance = new TheMovieDbApiClient(options);
  }
}

module.exports = TheMovieDbApiClient;

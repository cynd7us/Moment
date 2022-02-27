const axios = require('axios');

class TheMovieDbApiClient {
  constructor(options) {
    this.baseUrl = `https://api.themoviedb.org/3`;
    this.authorizationHeaders = {
      authorization: `Bearer ${options.accessToken}`,
    };
  }

  async getMostRated() {
    const url = `${this.baseUrl}/movie/top_rated?language=en&page=1`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: mostRated },
    } = response;
    return mostRated;
  }

  async getPopular() {
    const url = `${this.baseUrl}/movie/popular?language=en&page=1`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: popular },
    } = response;
    return popular;
  }

  async getUpcoming() {
    const url = `${this.baseUrl}/movie/upcoming?language=en&page=1`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: upcoming },
    } = response;
    return upcoming;
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

const axios = require('axios');

class TheMovieDbApiClient {
  constructor(options) {
    this.baseUrl = `https://api.themoviedb.org/3`;
    this.authorizationHeaders = {
      authorization: `Bearer ${options.accessToken}`,
    };
  }

  async getMostRated({ mediaType }) {
    const url = `${this.baseUrl}/${mediaType}/top_rated?language=en&page=1`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: mostRated },
    } = response;
    return mostRated;
  }

  async getPopular({ mediaType }) {
    const url = `${this.baseUrl}/${mediaType}/popular?language=en&page=1`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: popular },
    } = response;
    return popular;
  }

  async getUpcoming() {
    // upcoming doesn't exist for tv
    const url = `${this.baseUrl}/movie/upcoming?language=en&page=1`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: upcoming },
    } = response;
    return upcoming;
  }

  async getLatest() {
    const url = `${this.baseUrl}/discover/tv?primary_release_year=2022&sort_by=vote_average.desc`;
    const response = await axios.get(url, { headers: this.authorizationHeaders });
    const {
      data: { results: latest },
    } = response;
    console.log(response.data);
    return latest;
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

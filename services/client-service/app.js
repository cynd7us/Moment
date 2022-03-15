const express = require('express');
const logger = require('./lib/logger');

const app = express();

const healthCheckRoute = '/health_check';
const {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMostRatedTvShows,
  getPopularTvShows,
  getLatestTvShows,
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
} = require('./handlers');
const { respondsWithJson, genericErrorHandler } = require('../../infra/middleware');

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const backendVersion = process.env.BACKEND_VERSION || 'unknown';

module.exports = () => {
  app.get('/', (req, res) => {
    res.send('client-service API');
  });
  // app.get(healthCheckRoute, healthCheck);
  app.get('/backend-version', (req, res) => res.json({ backendVersion }));

  app.get('/movies/most-rated', respondsWithJson(getMostRatedMovies));
  app.get('/movies/popular', respondsWithJson(getPopularMovies));
  app.get('/movies/upcoming', respondsWithJson(getUpcomingMovies));

  app.get('/tv-shows/most-rated', respondsWithJson(getMostRatedTvShows));
  app.get('/tv-shows/popular', respondsWithJson(getPopularTvShows));
  app.get('/tv-shows/latest', respondsWithJson(getLatestTvShows));

  app.get('/books/most-rated', respondsWithJson(getMostRatedBooks));
  app.get('/books/popular', respondsWithJson(getPopularBooks));
  app.get('/books/upcoming', respondsWithJson(getUpcomingBooks));

  app.use(genericErrorHandler({ logger }));

  return app;
};

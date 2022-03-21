const express = require('express');
const { respondsWithJson, genericErrorHandler } = require('@moment/middleware');
const logger = require('./lib/logger');

const app = express();

const healthCheckRoute = '/health_check';
const {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
  getMovieDetails,
  getMostRatedTvShows,
  getPopularTvShows,
  getUpcomingTvShows,
  getTvShowDetails,
  getMostRatedBooks,
  getPopularBooks,
  getUpcomingBooks,
  getBookDetails,
} = require('./handlers');

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const backendVersion = process.env.BACKEND_VERSION || 'unknown';

module.exports = () => {
  app.get('/', (req, res) => {
    res.send('client-service API');
  });

  app.get(healthCheckRoute, (req, res) => {
    res.send('healthy');
  });
  app.get('/backend-version', (req, res) => res.json({ backendVersion }));

  app.get('/movies/most-rated', respondsWithJson(getMostRatedMovies));
  app.get('/movies/popular', respondsWithJson(getPopularMovies));
  app.get('/movies/upcoming', respondsWithJson(getUpcomingMovies));
  app.get('/movies/:movie', respondsWithJson(getMovieDetails));

  app.get('/tv-shows/most-rated', respondsWithJson(getMostRatedTvShows));
  app.get('/tv-shows/popular', respondsWithJson(getPopularTvShows));
  app.get('/tv-shows/upcoming', respondsWithJson(getUpcomingTvShows));
  app.get('/tv-shows/:tvShow', respondsWithJson(getTvShowDetails));

  app.get('/books/most-rated', respondsWithJson(getMostRatedBooks));
  app.get('/books/popular', respondsWithJson(getPopularBooks));
  app.get('/books/upcoming', respondsWithJson(getUpcomingBooks));
  app.get('/books/:book', respondsWithJson(getBookDetails));

  app.use(genericErrorHandler({ logger }));

  return app;
};

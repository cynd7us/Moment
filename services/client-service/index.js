const port = process.env.PORT || 5868;
let logger = console;
let cache;

const loadData = async () => {
  // eslint-disable-next-line global-require
  const { TheMovieDbApiClient } = require('../../infra/api-clients');
  // load movies collections to redis
  const TheMovieDBApiClient = TheMovieDbApiClient.getInstance();
  const mostRatedMovies = await TheMovieDBApiClient.getMostRated({ mediaType: 'movie' });
  const popularMovies = await TheMovieDBApiClient.getPopular({ mediaType: 'movie' });
  const upcomingMovies = await TheMovieDBApiClient.getUpcoming({ mediaType: 'movie' });
  await cache.set({ key: 'movies.most-rated', value: mostRatedMovies, ttlPriority: 'high' });
  await cache.set({ key: 'movies.popular', value: popularMovies, ttlPriority: 'high' });
  await cache.set({ key: 'movies.upcoming', value: upcomingMovies, ttlPriority: 'low' });

  // load tvshows collections to redis
  const mostRatedTvShows = await TheMovieDBApiClient.getMostRated({ mediaType: 'tv' });
  const popularTvShows = await TheMovieDBApiClient.getPopular({ mediaType: 'tv' });
  const latestTvShows = await TheMovieDBApiClient.getLatest();
  await cache.set({ key: 'tv.most-rated', value: mostRatedTvShows, ttlPriority: 'high' });
  await cache.set({ key: 'tv.popular', value: popularTvShows, ttlPriority: 'medium' });
  await cache.set({ key: 'tv.latest', value: latestTvShows, ttlPriority: 'low' });
};

const setUpEnv = async () => {
  // eslint-disable-next-line global-require
  logger = require('./lib/logger');
  // eslint-disable-next-line global-require
  cache = require('./lib/cache');
  // eslint-disable-next-line global-require
  // TODO: initialize critical data here
  await loadData();
};

module.exports = async () => {
  await setUpEnv();
  try {
    // eslint-disable-next-line global-require
    const initApp = require('./app');
    const app = initApp();
    app.listen(port, () => {
      logger.info(`client-service now listening on port ${port}`);
    });
  } catch (error) {
    logger.error('Failed to start & listen server', { error });
  }
};

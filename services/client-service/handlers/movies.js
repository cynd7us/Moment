const { TheMovieDbApiClient } = require('../../../infra/api-clients');
const cache = require('../../../infra/cache');

const getMostRatedMovies = async () => {
  const myValue = await cache.set({
    key: 'russia',
    value: { key: 'this is the value of the key' },
    ttl_priority: 'low',
  });
  console.log(myValue);
  const myGetValue = await cache.get({ key: 'russia', isJson: true });
  console.log(myGetValue);
  /*
    await cache.set({ key: 'myKey', value: 'this is a test', ttl_priority: 'medium'});
    const MoviesApiClient = TheMovieDbApiClient.getInstance();
    const movies = await MoviesApiClient.getMostRated();
    return movies;
    */
};

const getPopularMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getPopular();
  return movies;
};

const getUpcomingMovies = async () => {
  const MoviesApiClient = TheMovieDbApiClient.getInstance();
  const movies = await MoviesApiClient.getUpcoming();
  return movies;
};

module.exports = {
  getMostRatedMovies,
  getPopularMovies,
  getUpcomingMovies,
};

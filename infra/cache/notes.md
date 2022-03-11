## Caching layer 
- To reduce the amount of requests we send to 3rd parties API's such as ignb and themoviedb
- when the app is initalized we'll request the critical information for the app to be
- usable:
- most rated, popular and upcoming of each collection
- after the app has recieved the critical information it will store this data inside redis 
- so when future requests to /<media-type>/most-rated will be fired the app will use the 
- cached data instead of sending a new request to the 3rd parties API's we use
- This will help us save I/O and reduce the rate limit to the 3rd parties API's

## Usage
// under client-service/lib/cache.js
const cache = require('../../infra/cache');

module.exports = new Cache({ options }); // this line will initalize the critical information cache

// on handlers
// for example: get most rated movies handler
const isCollectionInCache = cache.get('most-rated-movies') != null;
if (isCollectionInCache) {
    return cache.get('most-rated-movies')
} else {
    // critical section, we can't continue without the data
}
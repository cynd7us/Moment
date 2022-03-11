const Redis = require('ioredis');
const _ = require('lodash');

class Cache {
  constructor() {
    this.TTL = {
      low: 60 * 60 * 12, // 12 hour
      medium: 60 * 60 * 48, // 48 hour
      high: 60 * 60 * 168, // 168 hours -> 1 week
    };
    this.redis = new Redis(process.env.REDIS);
  }

  async get({ key, isJson = true }) {
    const value = await this.redis.get(key);
    if (isJson) return JSON.parse(value);
    return value;
  }

  async set({ key, value, ttlPriority }) {
    const normalizedValue = _.isString(value) ? value : JSON.stringify(value);
    try {
      await this.redis.set(key, normalizedValue, 'ex', this.TTL[ttlPriority]);
    } catch (error) {
      console.log(error);
    }
  }

  async getWithPrefix({ prefix }) {
    let keys;
    try {
      keys = await this.redis.keys(prefix);
    } catch (error) {
      console.error(error);
    }
    return keys;
  }

  async del({ key }) {
    this.redis.del(key);
  }

  async ping() {
    this.redis.ping();
  }
}

module.exports = Cache;

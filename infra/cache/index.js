const Redis = require('ioredis');
const _ = require('lodash');

let redis;
const TTL = {
  low: 60 * 60 * 12, // 12 hour
  medium: 60 * 60 * 48, // 48 hour
  high: 60 * 60 * 168, // 168 hours -> 1 week
};

const set = async ({ key, value, ttlPriority }) => {
  const normalizedValue = _.isString(value) ? value : JSON.stringify(value);
  redis.set(key, normalizedValue, 'ex', TTL[ttlPriority]);
};

const get = async ({ key, isJson = true }) => {
  const value = await redis.get(key);

  if (isJson) return JSON.parse(value);

  return value;
};

const del = async ({ key }) => redis.del(key);

const init = () => {
  redis = new Redis(process.env.REDIS);
  process.once('beforeExit', () => {
    redis.disconnect();
  });
};

module.exports = {
  get,
  set,
  del,
  init,
  ping: () => redis && redis.ping(),
};

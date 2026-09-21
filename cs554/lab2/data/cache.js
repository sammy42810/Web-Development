import {getRedis} from '../config/redisConnection.js';
import {publicEndpoint} from './omdb.js';
import {cacheUnavailable} from '../errors.js';

export const HISTORY_KEY = 'recentlyViewedMovies';
// movie:{id}, series:{id}, episode:{id}
export const resourceKey = (type, id) => `${type}:${id}`;

// Constructs a fresh wrapper on every request. fetchedAt is always the current
// time, and cache.hit is true only when the resource was already present in the cache.
export const buildWrapper = ({id, type, data, hit}) => ({
  source: 'omdb',
  endpoint: publicEndpoint(id),
  cache: {
    hit,
    key: resourceKey(type, id)
  },
  fetchedAt: new Date().toISOString(),
  data
});

// Reads and parses a cached normalized object, or null when the key is absent.
export const readResource = async (type, id) => {
  const client = getRedis();
  let raw;
  try {
    raw = await client.get(resourceKey(type, id));
  } catch {
    throw cacheUnavailable();
  }
  if (raw === null || raw === undefined) return null;
  return JSON.parse(raw);
};

// Movie cache miss: store the movie and record a history view in one transaction.
export const storeMovieOnMiss = async (id, data) => {
  const client = getRedis();
  const entry = `${id}:${Date.now()}`;
  try {
    await client
      .multi()
      .set(resourceKey('movie', id), JSON.stringify(data))
      .lPush(HISTORY_KEY, entry)
      .lTrim(HISTORY_KEY, 0, 19)
      .exec();
  } catch {
    throw cacheUnavailable();
  }
};

// Movie cache hit
export const recordMovieView = async (id) => {
  const client = getRedis();
  const entry = `${id}:${Date.now()}`;
  try {
    await client
      .multi()
      .lPush(HISTORY_KEY, entry)
      .lTrim(HISTORY_KEY, 0, 19)
      .exec();
  } catch {
    throw cacheUnavailable();
  }
};

// Store a resource only
export const storeResource = async (type, id, data) => {
  const client = getRedis();
  try {
    await client.set(resourceKey(type, id), JSON.stringify(data));
  } catch {
    throw cacheUnavailable();
  }
};

// Returns the raw history list newest-first 
export const readHistoryList = async () => {
  const client = getRedis();
  try {
    return await client.lRange(HISTORY_KEY, 0, -1);
  } catch {
    throw cacheUnavailable();
  }
};

// extra credit
const STATS_TYPES = ['movie', 'series', 'episode'];
// stats:movie:hits, stats:series:misses, etc.
export const statsKey = (type, kind) => `stats:${type}:${kind}`;
// Atomically increments a hit/miss counter (INCR creates the key at 0 first).
export const incrementStat = async (type, kind) => {
  const client = getRedis();
  try {
    await client.incr(statsKey(type, kind));
  } catch {
    throw cacheUnavailable();
  }
};

export const readStats = async () => {
  const client = getRedis();
  const keys = STATS_TYPES.flatMap((type) => [
    statsKey(type, 'hits'),
    statsKey(type, 'misses')
  ]);

  let values;
  try {
    values = await client.mGet(keys);
  } catch {
    throw cacheUnavailable();
  }

  const toNumber = (raw) => {
    if (raw === null || raw === undefined) return 0;
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  return {
    movies: {hits: toNumber(values[0]), misses: toNumber(values[1])},
    series: {hits: toNumber(values[2]), misses: toNumber(values[3])},
    episodes: {hits: toNumber(values[4]), misses: toNumber(values[5])}
  };
};

import {isValidImdbId, normalizers} from './helpers.js';
import {fetchTitle} from './data/omdb.js';
import {
  readResource,
  storeResource,
  storeMovieOnMiss,
  recordMovieView,
  buildWrapper,
  incrementStat
} from './data/cache.js';
import {invalidId} from './errors.js';

export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export const cacheMiddleware = (type) =>
  asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    if (!isValidImdbId(id)) throw invalidId();

    const data = await readResource(type, id);
    if (data === null) {
      await incrementStat(type, 'misses');
      return next(); // cache miss -> route handler
    }

    await incrementStat(type, 'hits');
    if (type === 'movie') {
      await recordMovieView(id);
    }
    const wrapper = buildWrapper({id, type, data, hit: true});
    return res.status(200).json(wrapper);
  });

export const detailHandler = (type) =>
  asyncHandler(async (req, res) => {
    const {id} = req.params; // already validated by cacheMiddleware
    const omdb = await fetchTitle(id);
    const data = normalizers[type](omdb, id);

    if (type === 'movie') {
      await storeMovieOnMiss(id, data);
    } else {
      await storeResource(type, id, data);
    }

    const wrapper = buildWrapper({id, type, data, hit: false});
    return res.status(200).json(wrapper);
  });

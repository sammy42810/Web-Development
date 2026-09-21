import {readHistoryList, readResource, storeResource, buildWrapper} from './cache.js';
import {fetchTitle} from './omdb.js';
import {normalizeMovie, isValidImdbId} from '../helpers.js';
import {HttpError, invalidHistory, historyMovieUnavailable} from '../errors.js';

// Parses a stored history entry of the form "{id}:{unixTimestampMs}".
const parseEntry = (entry) => {
  if (typeof entry !== 'string') throw invalidHistory();
  const parts = entry.split(':');
  if (parts.length !== 2) throw invalidHistory();

  const [id, timestamp] = parts;
  if (!isValidImdbId(id)) throw invalidHistory();
  if (!/^[0-9]+$/.test(timestamp)) throw invalidHistory();

  const ms = Number(timestamp);
  if (!Number.isSafeInteger(ms) || ms < 0) throw invalidHistory();

  const date = new Date(ms);
  if (Number.isNaN(date.getTime())) throw invalidHistory();

  return {id, viewedAt: date.toISOString()};
};

// Builds the history response, fetching and normalizing each movie in the history list.
export const getHistory = async () => {
  const rawEntries = await readHistoryList();
  if (!rawEntries || rawEntries.length === 0) return [];

  const entries = rawEntries.map(parseEntry);
  const result = [];
  for (const {id, viewedAt} of entries) {
    let data = await readResource('movie', id);
     let hit = true;

    if (data === null) {
      hit = false;
      data = await restoreMovie(id);
      await storeResource('movie', id, data); // store movie only, no history
    }

    const movie = buildWrapper({id, type: 'movie', data, hit});
    result.push({viewedAt, id, movie});
  }

  return result;
};

// Fetches and normalizes a movie for history restoration, translating a
// missing title or wrong resource type into "History movie unavailable" (502).
const restoreMovie = async (id) => {
  let omdb;
  try {
    omdb = await fetchTitle(id);
  } catch (err) {
    if (err instanceof HttpError && err.status === 404) throw historyMovieUnavailable();
    throw err;
  }

  try {
    return normalizeMovie(omdb, id);
  } catch (err) {
    if (err instanceof HttpError && err.status === 404) throw historyMovieUnavailable();
    throw err;
  }
};

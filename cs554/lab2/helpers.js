import {upstreamError, notFound} from './errors.js';
const IMDB_ID_PATTERN = /^tt[0-9]{7,10}$/;

// An accepted IMDb ID is the exact lowercase prefix "tt" plus 7-10 digits.
export const isValidImdbId = (id) =>
  typeof id === 'string' && IMDB_ID_PATTERN.test(id);

/*
 * Reads an optional upstream string. Returns {available:false} when the field
 * is missing, null, empty after trimming, or the literal "N/A". Returns
 * {available:true, value} with the trimmed string otherwise. A present,
 * non-null value that is not a string is malformed upstream data.
 */
const readOptionalString = (raw) => {
  if (raw === undefined || raw === null) return {available: false};
  if (typeof raw !== 'string') throw upstreamError();
  const trimmed = raw.trim();
  if (trimmed === '' || trimmed === 'N/A') return {available: false};
  return {available: true, value: trimmed};
};

// Trimmed text with a null fallback (Year, Rated, Plot).
const normalizeTextField = (raw) => {
  const field = readOptionalString(raw);
  return field.available ? field.value : null;
};

// Comma-separated list -> trimmed, de-duplicated, default-sorted array.
const normalizeList = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return [];
  const items = field.value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '' && item !== 'N/A');

  const seen = new Set();
  const unique = [];
  for (const item of items) {
    if (!seen.has(item)) {
      seen.add(item);
      unique.push(item);
    }
  }
  unique.sort();
  return unique;
};

// "136 min" -> 136. Requires digits, exactly one space, then "min".
const normalizeRuntime = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  const match = /^([0-9]+) min$/.exec(field.value);
  if (!match) throw upstreamError();
  const value = Number(match[1]);
  if (!Number.isSafeInteger(value) || value < 0) throw upstreamError();
  return value;
};

// Nonnegative integer (season, episodeNumber). Digits only.
const normalizeNonNegInt = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  if (!/^[0-9]+$/.test(field.value)) throw upstreamError();
  const value = Number(field.value);
  if (!Number.isSafeInteger(value) || value < 0) throw upstreamError();
  return value;
};

// Positive integer (totalSeasons). "0" is malformed for this field.
const normalizePositiveInt = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  if (!/^[0-9]+$/.test(field.value)) throw upstreamError();
  const value = Number(field.value);
  if (!Number.isSafeInteger(value) || value <= 0) throw upstreamError();
  return value;
};

// Decimal rating from 0 through 10.
const normalizeRating = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  if (!/^[0-9]+(\.[0-9]+)?$/.test(field.value)) throw upstreamError();
  const value = Number(field.value);
  if (!Number.isFinite(value) || value < 0 || value > 10) throw upstreamError();
  return value;
};

// "$177,559,005" -> 177559005. Optional "$", digits, optional thousands commas.
const normalizeBoxOffice = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  let value = field.value;
  if (value.startsWith('$')) value = value.slice(1);
  const grouped = /^[0-9]{1,3}(,[0-9]{3})*$/;
  const ungrouped = /^[0-9]+$/;
  if (!grouped.test(value) && !ungrouped.test(value)) throw upstreamError();
  const amount = Number(value.replace(/,/g, ''));
  if (!Number.isSafeInteger(amount) || amount < 0) throw upstreamError();
  return amount;
};

// Absolute http/https poster URL, or null when unavailable.
const normalizePoster = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  if (!/^https?:\/\//i.test(field.value)) throw upstreamError();
  return field.value;
};

// Parent series id on an episode. Must satisfy the IMDb ID rules when present.
const normalizeSeriesId = (raw) => {
  const field = readOptionalString(raw);
  if (!field.available) return null;
  if (!isValidImdbId(field.value)) throw upstreamError();
  return field.value;
};

const RECOGNIZED_TYPES = ['movie', 'series', 'episode'];

/*
 * Verifies the required identity fields (imdbID, Title, Type). A recognized
 * type that differs from the requested route means "wrong resource" -> 404.
 * An unrecognized type, a mismatched id, or a missing/blank title is malformed
 * upstream data -> 502.
 */
const normalizeIdentity = (omdb, requestedType, requestedId) => {
  if (typeof omdb.imdbID !== 'string' || omdb.imdbID !== requestedId) {
    throw upstreamError();
  }

  if (typeof omdb.Title !== 'string') throw upstreamError();
  const title = omdb.Title.trim();
  if (title === '' || title === 'N/A') throw upstreamError();

  if (typeof omdb.Type !== 'string' || !RECOGNIZED_TYPES.includes(omdb.Type)) {
    throw upstreamError();
  }
  if (omdb.Type !== requestedType) throw notFound();

  return {id: omdb.imdbID, title, type: omdb.Type};
};

export const normalizeMovie = (omdb, requestedId) => {
  const {id, title, type} = normalizeIdentity(omdb, 'movie', requestedId);
  return {
    id,
    title,
    type,
    year: normalizeTextField(omdb.Year),
    rated: normalizeTextField(omdb.Rated),
    runtimeMinutes: normalizeRuntime(omdb.Runtime),
    genres: normalizeList(omdb.Genre),
    directors: normalizeList(omdb.Director),
    plot: normalizeTextField(omdb.Plot),
    posterUrl: normalizePoster(omdb.Poster),
    imdbRating: normalizeRating(omdb.imdbRating),
    boxOffice: normalizeBoxOffice(omdb.BoxOffice)
  };
};

export const normalizeSeries = (omdb, requestedId) => {
  const {id, title, type} = normalizeIdentity(omdb, 'series', requestedId);
  return {
    id,
    title,
    type,
    year: normalizeTextField(omdb.Year),
    rated: normalizeTextField(omdb.Rated),
    runtimeMinutes: normalizeRuntime(omdb.Runtime),
    genres: normalizeList(omdb.Genre),
    actors: normalizeList(omdb.Actors),
    plot: normalizeTextField(omdb.Plot),
    posterUrl: normalizePoster(omdb.Poster),
    imdbRating: normalizeRating(omdb.imdbRating),
    totalSeasons: normalizePositiveInt(omdb.totalSeasons)
  };
};

export const normalizeEpisode = (omdb, requestedId) => {
  const {id, title, type} = normalizeIdentity(omdb, 'episode', requestedId);
  return {
    id,
    title,
    type,
    year: normalizeTextField(omdb.Year),
    rated: normalizeTextField(omdb.Rated),
    runtimeMinutes: normalizeRuntime(omdb.Runtime),
    genres: normalizeList(omdb.Genre),
    directors: normalizeList(omdb.Director),
    plot: normalizeTextField(omdb.Plot),
    posterUrl: normalizePoster(omdb.Poster),
    imdbRating: normalizeRating(omdb.imdbRating),
    seriesId: normalizeSeriesId(omdb.seriesID),
    season: normalizeNonNegInt(omdb.Season),
    episodeNumber: normalizeNonNegInt(omdb.Episode)
  };
};

// Maps a resource type to its normalizer, used by the generic detail flow.
export const normalizers = {
  movie: normalizeMovie,
  series: normalizeSeries,
  episode: normalizeEpisode
};

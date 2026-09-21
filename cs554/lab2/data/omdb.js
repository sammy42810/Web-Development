import {settings} from '../config/settings.js';
import {omdbUnavailable, upstreamError, notFound} from '../errors.js';

/*
 * It performs the upstream request and translates the HTTP
 * status and JSON body into either a usable OMDb object (Response === "True")
 * or one of the assignment's typed errors.
 */

const OMDB_BASE = 'https://www.omdbapi.com/';

// The public endpoint string for the wrapper: never includes the api key.
export const publicEndpoint = (id) => `${OMDB_BASE}?i=${id}&plot=full`;

export const fetchTitle = async (id) => {
  const url = `${OMDB_BASE}?i=${encodeURIComponent(id)}&plot=full&apikey=${encodeURIComponent(
    settings.omdbApiKey
  )}`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw upstreamError();
  }

  if (response.status === 401 || response.status === 403 || response.status === 429) {
    throw omdbUnavailable();
  }
  if (!response.ok) {
    throw upstreamError();
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw upstreamError();
  }

  if (!body || typeof body !== 'object') throw upstreamError();

  if (body.Response === 'True') {
    return body;
  }

  if (body.Response === 'False') {
    if (typeof body.Error !== 'string' || body.Error.trim() === '') {
      throw upstreamError();
    }
    const message = body.Error.trim().toLowerCase();
    if (message.includes('api key') || message.includes('limit')) {
      throw omdbUnavailable();
    }
    if (message.includes('not found') || message === 'incorrect imdb id.') {
      throw notFound();
    }
    throw upstreamError();
  }
  throw upstreamError();
};

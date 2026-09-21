export class HttpError extends Error {
  constructor(status, body) {
    super(body && body.error ? body.error : 'Error');
    this.status = status;
    this.body = body;
  }
}

// Factory helpers for each of the standard responses defined by the assignment.\
export const invalidId = () => new HttpError(400, {error: 'Invalid id'});
export const notFound = () => new HttpError(404, {error: 'Not found'});
export const omdbUnavailable = () => new HttpError(503, {error: 'OMDb unavailable'});
export const upstreamError = () => new HttpError(502, {error: 'Upstream API error'});
export const cacheUnavailable = () => new HttpError(503, {error: 'Cache unavailable'});
export const internalError = () => new HttpError(500, {error: 'Internal server error'});
export const routeNotFound = () => new HttpError(404, {error: 'Route not found'});
export const invalidHistory = () => new HttpError(500, {error: 'Invalid history data'});
export const historyMovieUnavailable = () =>
  new HttpError(502, {error: 'History movie unavailable'});

// Keeps a running tally of how many times each URL has been requested.
const requestCounts = {};

/*
 * Middleware #3 (application-wide): logs every request's HTTP verb, URL path,
 * and request body. Passwords are never logged. GET requests (and any request
 * with no body) log an empty object.
 */
export const requestLogger = (req, res, next) => {
  const body = req.body && typeof req.body === 'object' ? {...req.body} : {};
  if ('password' in body) delete body.password;

  console.log(`[${req.method}] ${req.originalUrl} body: ${JSON.stringify(body)}`);
  next();
};

/*
 * Middleware #4 (application-wide): tracks and logs how many times a given URL
 * has been requested, updating the count on every request.
 */
export const requestCounter = (req, res, next) => {
  const key = `${req.method} ${req.path}`;
  requestCounts[key] = (requestCounts[key] || 0) + 1;
  console.log(`"${key}" has been requested ${requestCounts[key]} time(s)`);
  next();
};

/*
 * Middleware #1 / #2: ensures a user is logged in before an action.
 * Applied to the POST/PUT/PATCH /recipes routes and to the POST/DELETE
 * comment routes. GET /recipes stays public (this is not applied to it).
 */
export const requireLogin = (req, res, next) => {
  if (!req.session || !req.session.user) {
    return res.status(403).json({error: 'You must be logged in to perform this action'});
  }
  next();
};

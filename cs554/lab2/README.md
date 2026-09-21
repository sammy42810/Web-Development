# CS554 Lab 2 — OMDb Express Server with Redis Caching

An Express server that looks up movies, series, and episodes from the
[OMDb API](https://www.omdbapi.com/) and caches normalized results in Redis.
Data is cached only after it is first accessed, and cached resources and view
history never expire.

## Requirements

- Node.js 18+
- A running Redis server

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configuration is read from the included `.env` file:

   ```text
   OMDB_API_KEY=cs554
   REDIS_URL=redis://localhost:6379
   ```

   - `OMDB_API_KEY` is **required**. If it is missing or empty after trimming,
     the server prints a startup error and does not start listening.
   - `REDIS_URL` is optional and defaults to `redis://localhost:6379` when it is
     missing or empty.

   The `.env` file is loaded automatically via `dotenv`, so no manual environment
   setup is needed.

## Redis connection requirements

- Start Redis before starting the server. The application establishes its
  Redis connection during startup, before it begins accepting HTTP requests.
- If the initial Redis connection fails, the server prints a clear startup error
  and exits without listening.
- The application never flushes or clears Redis on startup, so cached data and
  view history persist across server restarts while Redis keeps running.
- Redis failures that occur while handling a request return
  `503 { "error": "Cache unavailable" }`.

## Running

```bash
npm start
```

The server listens on **http://localhost:3000**.

## Routes

| Method | Route                 | Description                                  |
| ------ | --------------------- | -------------------------------------------- |
| GET    | `/api/movies/history` | Last 20 movie views, most recent first       |
| GET    | `/api/movies/:id`     | Movie detail (cached, adds a history entry)  |
| GET    | `/api/series/:id`     | Series detail (cached)                       |
| GET    | `/api/episodes/:id`   | Episode detail (cached)                      |
| GET    | `/api/cache/stats`    | Cache hit/miss statistics (**extra credit**) |

Any other route or non-GET method returns `404 { "error": "Route not found" }`.

## Redis keys

| Purpose               | Key                                         |
| --------------------- | ------------------------------------------- |
| Movie detail          | `movie:{id}`                                |
| Series detail         | `series:{id}`                               |
| Episode detail        | `episode:{id}`                              |
| Movie viewing history | `recentlyViewedMovies`                      |
| Cache stats (EC)      | `stats:{type}:hits` / `stats:{type}:misses` |

## Extra credit

Completed. Cache performance statistics are tracked in Redis using atomic
`INCR` operations on the keys `stats:{type}:hits` and `stats:{type}:misses`.
Exactly one hit or miss is counted after each valid detail request's Redis
lookup (a miss is counted even if the subsequent OMDb request fails or returns
the wrong resource type). Invalid ids, failed Redis lookups, and the history and
stats routes do not increment counters. Missing counters read back as `0`, and
counters persist across server restarts. See `GET /api/cache/stats`.

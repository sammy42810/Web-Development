import 'dotenv/config';

const rawApiKey = process.env.OMDB_API_KEY;
const apiKey = typeof rawApiKey === 'string' ? rawApiKey.trim() : '';

if (!apiKey) {
  throw new Error(
    'OMDB_API_KEY is missing or empty. Create a .env file with OMDB_API_KEY set before starting the server.'
  );
}

const rawRedisUrl = process.env.REDIS_URL;
const redisUrl =
  typeof rawRedisUrl === 'string' && rawRedisUrl.trim()
    ? rawRedisUrl.trim()
    : 'redis://localhost:6379';

export const settings = {
  omdbApiKey: apiKey,
  redisUrl,
  port: 3000
};

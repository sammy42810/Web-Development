import {createClient} from 'redis';
import {settings} from './settings.js';

const client = createClient({
  url: settings.redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries >= 5) return new Error('Redis reconnection attempts exhausted');
      return Math.min(retries * 100, 1000);
    }
  }
});

// Prevent an unhandled 'error' event from crashing the process while running.
client.on('error', (err) => {
  const detail = err && (err.message || err.code) ? err.message || err.code : err;
  console.error('Redis client error:', detail);
});

export const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
  }
  return client;
};

export const getRedis = () => client;

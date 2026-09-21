import express from 'express';
import {settings} from './config/settings.js';
import {connectRedis} from './config/redisConnection.js';
import configRoutes from './routes/index.js';

const startServer = async () => {
  try {
    await connectRedis();
    console.log(`Connected to Redis at ${settings.redisUrl}`);
  } catch (err) {
    console.error('Startup error: could not connect to Redis.');
    console.error(err.message);
    process.exit(1);
  }

  const app = express();
  app.use(express.json());

  configRoutes(app);

  app.listen(settings.port, () => {
    console.log("We've now got a server!");
    console.log(`Your routes will be running on http://localhost:${settings.port}`);
  });
};

startServer();

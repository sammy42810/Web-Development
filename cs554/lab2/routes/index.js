import moviesRoutes from './movies.js';
import seriesRoutes from './series.js';
import episodesRoutes from './episodes.js';
import {HttpError} from '../errors.js';

const configRoutes = (app) => {
  app.use('/api/movies', moviesRoutes);
  app.use('/api/series', seriesRoutes);
  app.use('/api/episodes', episodesRoutes);

  app.use((req, res) => {
    res.status(404).json({error: 'Route not found'});
  });

  app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
      return res.status(err.status).json(err.body);
    }
    console.error('Unexpected error:', err);
    return res.status(500).json({error: 'Internal server error'});
  });
};

export default configRoutes;
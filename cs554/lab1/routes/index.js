import recipeRoutes from './recipes.js';
import userRoutes from './users.js';

const constructorMethod = (app) => {
  app.use('/recipes', recipeRoutes);
  // Handles /signup, /login, and /logout.
  app.use('/', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route not found'});
  });
};

export default constructorMethod;

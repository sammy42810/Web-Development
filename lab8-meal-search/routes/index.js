import mealsRoutes from './meals.js';

const constructorMethod = (app) => {
  app.use('/', mealsRoutes);

  app.use('*', (req, res) => {
    res.status(404).render('error', {
      title: 'Not Found',
      message: 'The page you are looking for does not exist.'
    });
  });
};

export default constructorMethod;

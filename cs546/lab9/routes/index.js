//Here you will require route files and export them as used in previous labs.
import passwordAnalyzerRoutes from './passwordanalyzer.js';

const constructorMethod = (app) => {
  app.use('/', passwordAnalyzerRoutes);

  app.use('*', (req, res) => {
    res.status(404).send('Not found');
  });
};

export default constructorMethod;

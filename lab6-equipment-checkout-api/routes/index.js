import equipmentRoutes from './equipment.js';
import checkoutsRoutes from './checkouts.js';

const constructorMethod = (app) => {
  app.use('/equipment', equipmentRoutes);
  app.use('/checkouts', checkoutsRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

export default constructorMethod;

import express from 'express';
import usersRouter from '../routes/users-route';
import recipesRouter from '../routes/recipes-route';

const route = express.Router();

route.use((req, res, next) => {
  next();
});

route.use('/users/', usersRouter);
route.use('/recipes/', recipesRouter);
route.use('/', (req, res) => {
  res.status(404).send({
    status: 'fail',
    message: 'Route was not found'
  });
});


export default route;

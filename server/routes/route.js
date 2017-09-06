import express from 'express';
import usersRouter from '../routes/users-route';
import recipesRouter from '../routes/recipes-route';

const route = express.Router();

route.use((req, res, next) => {
  next();
});

route.use('/users/', usersRouter);
route.use('/recipes/', recipesRouter);

export default route;

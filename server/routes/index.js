import express from 'express';
import usersRouter from '../routes/users-route';
import recipesRouter from '../routes/recipes-route';
import { sendFail } from '../utils/responder';

const route = express.Router();

route.use((req, res, next) => {
  next();
});
route.use('/users/', usersRouter);
route.use('/recipes/', recipesRouter);
route.use('/', (req, res) => {
  sendFail(res, 404, 'Route was not found');
});

export default route;

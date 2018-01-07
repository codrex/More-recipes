import express from 'express';
import usersRoute from '../routes/usersRoute';
import recipesRoute from '../routes/recipesRoute';
import docRoute from '../routes/docRoute';
import { sendFail } from '../utils/responder';

const route = express.Router();

route.use((req, res, next) => {
  next();
});

route.use('/doc', docRoute);
route.use('/users/', usersRoute);
route.use('/recipes/', recipesRoute);
route.use('/', (req, res) => {
  sendFail(res, 404, 'Route was not found');
});

export default route;

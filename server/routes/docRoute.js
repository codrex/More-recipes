import express from 'express';
import path from 'path';

const docRoute = express.Router();

docRoute.use((req, res, next) => {
  next();
});
docRoute.use('/', express.static(path.resolve(__dirname, '..', 'doc')));

export default docRoute;

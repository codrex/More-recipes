import express from 'express';
import { verifyToken } from '../auth/auth';

const recipesRoute = express.Router();

console.log('in user router');

recipesRoute.use(verifyToken, (req, res, next) => {
  next();
});


recipesRoute.route('/recipe')
  .post();

// recipesRoute.route('/recipes')
//   .get();


// recipesRoute.route(':id/recipe')
//   .get()
//   .put()
//   .delete();


export default recipesRoute;

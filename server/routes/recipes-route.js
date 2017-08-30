import express from 'express';
import { verifyToken } from '../auth/auth';
import { validateRecipe, create,
        fetchRecipe, idValidation,
        deleteRecipe, checkOwnship } from '../controller/recipe';

const recipesRoute = express.Router();

console.log('in recipe router');

recipesRoute.use(verifyToken, (req, res, next) => {
  next();
});

recipesRoute.route('/recipe')
  .post(validateRecipe, create, fetchRecipe);

// recipesRoute.route('/recipes')
//   .get();


recipesRoute.route('/:id/recipe')
  .delete(idValidation, checkOwnship, deleteRecipe);


export default recipesRoute;

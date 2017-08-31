import express from 'express';
import { verifyToken } from '../auth/auth';
import { validateRecipe, create,
        fetchRecipe, idValidation,
        deleteRecipe, checkOwnship,
        validateUpdate, fetchForUpdate, updateRecipe } from '../controller/recipe';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, (req, res, next) => {
  next();
});

recipesRoute.route('/recipe')
  .post(validateRecipe, create, fetchRecipe);

// recipesRoute.route('/recipes')
//   .get();

recipesRoute.route('/:id')
  .put(idValidation, checkOwnship,
       fetchForUpdate, validateUpdate, updateRecipe, fetchRecipe)
  .delete(idValidation, checkOwnship, deleteRecipe);

export default recipesRoute;
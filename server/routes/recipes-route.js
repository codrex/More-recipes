import express from 'express';
import { verifyToken } from '../auth/auth';
import { reviewValidation, createReview } from '../controller/review';
import { validateRecipe, create,
        fetchRecipe, idValidation,
        deleteRecipe, checkOwnship,
        validateUpdate, fetchForUpdate,
         updateRecipe, fetchAllRecipe,
         fetchRecipeByQuery, setReview, fetchReview } from '../controller/recipe';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, (req, res, next) => {
  next();
});

recipesRoute.route('/recipe')
  .post(validateRecipe, create, fetchRecipe);

recipesRoute.route('/')
  .get(fetchRecipeByQuery, fetchAllRecipe);

recipesRoute.route('/:id')
  .put(idValidation, checkOwnship,
       fetchForUpdate, validateUpdate, updateRecipe, fetchRecipe)
  .delete(idValidation, checkOwnship, deleteRecipe);

recipesRoute.route('/:id/reviews')
  .post(idValidation, reviewValidation, createReview, setReview, fetchReview);

export default recipesRoute;

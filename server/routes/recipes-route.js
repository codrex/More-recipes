import express from 'express';
import { verifyToken } from '../auth/auth';
import { reviewValidation, createReview } from '../controller/review';
import { validateRecipe, create,
        fetchRecipe, idValidation,
        deleteRecipe, checkOwnship,
        validateUpdate, fetchForUpdate,
         updateRecipe, fetchAllRecipe,
         fetchRecipeByQuery, setReview,
         fetchReview, updateVotes,
         fetchVotes, fetchRecipeByUpVote,
         isRecipe, parse } from '../controller/recipe';
import { createVote, countVote, voteValidation } from '../controller/vote';
import { isIdValidUser } from '../controller/user';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, isIdValidUser, (req, res, next) => {
  next();
});

recipesRoute.route('/recipe')
  .post(parse, validateRecipe, create, fetchRecipe);

recipesRoute.route('/')
  .get(fetchRecipeByQuery, fetchRecipeByUpVote, fetchAllRecipe);

recipesRoute.route('/:id')
  .put(parse, idValidation, checkOwnship,
       fetchForUpdate, validateUpdate, updateRecipe, fetchRecipe)
  .delete(idValidation, checkOwnship, deleteRecipe);

recipesRoute.route('/:id/reviews')
  .post(idValidation, reviewValidation, createReview, setReview, fetchReview);

recipesRoute.route('/:id/vote')
  .put(voteValidation, isRecipe, createVote, countVote, updateVotes, fetchVotes);


export default recipesRoute;

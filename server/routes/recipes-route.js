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
// add recipe route
recipesRoute.route('/recipe')
  .post(parse, validateRecipe, create, fetchRecipe);

// get recipe route
recipesRoute.route('/')
  .get(fetchRecipeByQuery, fetchRecipeByUpVote, fetchAllRecipe);

// Update and delete recipe route
recipesRoute.route('/:id')
  .put(parse, idValidation, checkOwnship,
       fetchForUpdate, validateUpdate, updateRecipe, fetchRecipe)
  .delete(idValidation, checkOwnship, deleteRecipe);

// route to post reviews on a recipe
recipesRoute.route('/:id/reviews')
  .post(idValidation, reviewValidation, createReview, setReview, fetchReview);

//  route to upvote or down vote a recipe
recipesRoute.route('/:id/vote')
  .put(voteValidation, isRecipe, createVote, countVote, updateVotes, fetchVotes);


export default recipesRoute;

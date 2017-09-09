import express from 'express';
import { verifyToken } from '../auth/auth';
import { reviewValidation, createReview } from '../controller/review';
import { validateRecipe, create,
        fetchRecipe, idValidation,
        deleteRecipe, checkOwnship,
        validateUpdate, fetchForUpdate,
         fetchAllRecipe, fetchAllBySearch,
         setReview, fetchReview,
         fetchVotes, fetchRecipeByUpVote,
         isRecipe, update } from '../controller/recipe';
import { VoteHandler, countVote, voteValidation } from '../controller/vote';
import { isIdValidUser } from '../controller/user';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, isIdValidUser, (req, res, next) => {
  next();
});
// add recipe route
recipesRoute.route('/recipe')
  .post(validateRecipe, create, fetchRecipe);

// get recipes route
recipesRoute.route('/')
  .get(fetchAllBySearch, fetchRecipeByUpVote, fetchAllRecipe);

// Update and delete recipe route
recipesRoute.route('/:id')
  .put(idValidation, checkOwnship,
       fetchForUpdate, validateUpdate, update, fetchRecipe)
  .delete(idValidation, checkOwnship, deleteRecipe)
  .get(idValidation, fetchRecipe);

// route to post reviews on a recipe
recipesRoute.route('/:id/reviews')
  .post(idValidation, reviewValidation, createReview, setReview, fetchReview);

//  route to upvote or down vote a recipe
recipesRoute.route('/:id/vote')
  .put(voteValidation, isRecipe, VoteHandler, countVote, update, fetchVotes);


export default recipesRoute;

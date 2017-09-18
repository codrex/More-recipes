import express from 'express';
import { verifyToken } from '../auth/auth';
import { reviewValidation, createReview } from '../controller/review';
import { validateRecipe, create,
        fetchRecipe, idValidation,
        deleteRecipe, checkOwnship,
        validateUpdate, fetchForUpdate,
         fetchAllRecipe, fetchAllBySearch,
         setReview, fetchReview,
         fetchVotes, fetchRecipeByUpVote, update, checkRecipe } from '../controller/recipe';
import { VoteHandler, countVote, voteValidation } from '../controller/vote';
import { isIdValidUser } from '../controller/user';
import addAsViewer from '../controller/viewer';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, isIdValidUser, (req, res, next) => {
  next();
});

// get recipes route
recipesRoute.route('/')
  .get(fetchAllBySearch, fetchRecipeByUpVote, fetchAllRecipe)
  .post(validateRecipe, create, fetchRecipe);

// Update and delete recipe route
recipesRoute.route('/:id')
  .put(idValidation, checkOwnship,
       fetchForUpdate, validateUpdate, update, fetchRecipe)
  .delete(idValidation, checkOwnship, deleteRecipe)
  .get(idValidation, addAsViewer, fetchRecipe);

// route to post reviews on a recipe
recipesRoute.route('/:id/reviews')
  .post(idValidation, reviewValidation, createReview, setReview, fetchReview);

//  route to upvote or down vote a recipe
recipesRoute.route('/:id/vote')
  .put(voteValidation, checkRecipe, VoteHandler, countVote, update, fetchVotes);


export default recipesRoute;

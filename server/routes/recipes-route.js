import express from 'express';
import { verifyToken } from '../authentication/authenticator';
import { reviewValidation, createReview } from '../controller/review';
import { validateRecipe, create,
        fetchRecipe, recipeIdValidation,
        deleteRecipe, checkOwnship,
        validateUpdate, fetchForUpdate,
         fetchAllRecipe, fetchAllBySearch,
         setReview, fetchReview,
         fetchVotes, fetchRecipeByUpVote,
         update, checkRecipe } from '../controller/recipe';
import { VoteHandler, countVote, voteValidation } from '../controller/vote';
import { isIdValidUser, setRecipe } from '../controller/user';
import addAsViewer from '../controller/viewer';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, isIdValidUser, (req, res, next) => {
  next();
});

// create recipe and get recipes route
recipesRoute.route('/')
  .get(fetchAllBySearch, fetchRecipeByUpVote, fetchAllRecipe)
  .post(validateRecipe, create, setRecipe, fetchRecipe);

// Update and delete recipe route
recipesRoute.route('/:id')
  .put(recipeIdValidation, checkOwnship,
       fetchForUpdate, validateUpdate, update, fetchRecipe)
  .delete(recipeIdValidation, checkOwnship, deleteRecipe)
  .get(recipeIdValidation, addAsViewer, fetchRecipe);

// route to post reviews on a recipe
recipesRoute.route('/:id/reviews')
  .post(recipeIdValidation, reviewValidation, createReview, setReview, fetchReview);

//  route to upvote or down vote a recipe
recipesRoute.route('/:id/vote')
  .put(voteValidation, checkRecipe, VoteHandler, countVote, update, fetchVotes);


export default recipesRoute;

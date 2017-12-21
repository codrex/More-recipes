import express from 'express';
import { verifyToken } from '../authentication/authenticator';
import { createReview } from '../controller/review';
import reviewValidation from '../middleware/validation/review';
import {
  create,
  fetchRecipe,
  deleteRecipe,
  checkOwnship,
  fetchForUpdate,
  fetchAllRecipe,
  fetchAllBySearch,
  setReview,
  fetchReview,
  fetchVotes,
  fetchRecipeByUpVote,
  update,
  checkRecipe
} from '../controller/recipe';
import {
  validateRecipe,
  validateUpdate,
  recipeIdValidation
} from '../middleware/validation/recipe';
import { VoteHandler, countVote } from '../controller/vote';
import voteValidation from '../middleware/validation/votes';
import { isIdValidUser, setRecipe } from '../controller/user';
import addAsViewer from '../controller/viewer';

const recipesRoute = express.Router();

recipesRoute.use(verifyToken, isIdValidUser, (req, res, next) => {
  next();
});

// create recipe and get recipes route
recipesRoute.route('/')
  .get(
    fetchAllBySearch,
    fetchRecipeByUpVote,
    fetchAllRecipe
  )
  .post(
    validateRecipe,
    create,
    setRecipe,
    fetchRecipe
  );

// Update and delete recipe route
recipesRoute.route('/:id')
  .put(
    recipeIdValidation,
    checkOwnship,
    fetchForUpdate,
    validateUpdate,
    update,
    fetchRecipe
  ).delete(
    recipeIdValidation,
    checkOwnship,
    deleteRecipe)
  .get(
    recipeIdValidation,
    addAsViewer,
    fetchRecipe
  );

// route to post reviews on a recipe
recipesRoute.route('/:id/reviews')
  .post(
    recipeIdValidation,
    reviewValidation,
    createReview,
    setReview, fetchReview)
  .get(recipeIdValidation, fetchReview);

//  route to upvote or down vote a recipe
recipesRoute.route('/:id/vote')
  .put(
    voteValidation,
    checkRecipe,
    VoteHandler,
    countVote,
    update,
    fetchVotes
  );


export default recipesRoute;

import express from 'express';
import { verifyToken } from '../authentication/authenticator';
import { createReview, fetchReviews } from '../controller/review';
import reviewValidation from '../middleware/validation/review';
import { VoteHandler, countVote } from '../controller/vote';
import voteValidation from '../middleware/validation/votes';
import { isValidUser, addCreatedRecipe } from '../controller/user';
import addViewer from '../controller/viewer';
import {
  notifyFavouriteUsers,
  notifyOwner
} from '../middleware/notifications/notifications';
import {
  validateRecipe,
  validateUpdate,
  recipeIdValidation
} from '../middleware/validation/recipe';
import {
  create,
  fetchRecipe,
  remove,
  isOwner,
  beforeUpdate,
  fetchRecipes,
  recipesSearch,
  setReviewAssociation,
  fetchVotes,
  fetchRecipeByUpVote,
  update,
  isRecipe
} from '../controller/recipe';


const recipesRoute = express.Router();

recipesRoute.use(verifyToken, isValidUser, (req, res, next) => {
  next();
});
recipesRoute.route('/')
  .get(
    recipesSearch,
    fetchRecipeByUpVote,
    fetchRecipes
  )
  .post(
    validateRecipe,
    create,
    addCreatedRecipe,
  );

recipesRoute.route('/:id')
  .put(
    recipeIdValidation,
    isOwner,
    beforeUpdate,
    validateUpdate,
    update,
    fetchRecipe,
    notifyFavouriteUsers
  ).delete(
    recipeIdValidation,
    isOwner,
    remove)
  .get(
    recipeIdValidation,
    addViewer,
    fetchRecipe
  );

recipesRoute.route('/:id/reviews')
  .post(
    recipeIdValidation,
    reviewValidation,
    isRecipe,
    createReview,
    setReviewAssociation,
    fetchReviews,
    notifyOwner
  )
  .get(recipeIdValidation, isRecipe, fetchReviews);

recipesRoute.route('/:id/vote')
  .put(
    voteValidation,
    isRecipe,
    VoteHandler,
    countVote,
    update,
    fetchVotes
  );


export default recipesRoute;

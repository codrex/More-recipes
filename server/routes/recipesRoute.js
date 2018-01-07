import express from 'express';
import { verifyToken } from '../middleware/authentication';
import { createReview, fetchReviews } from '../controller/review';
import reviewValidation from '../middleware/validation/review';
import { VoteHandler, countVote } from '../controller/vote';
import voteValidation from '../middleware/validation/votes';
import { isUserValid, addCreatedRecipe } from '../controller/user';
import addViewer from '../controller/viewer';
import {
  notifyFavouriteUsers,
  notifyOwner
} from '../middleware/notifications';
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

recipesRoute.use(verifyToken, isUserValid, (req, res, next) => {
  next();
});

/**
 * @description create recipe and fetch recipes route :POST/GET
 */
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

/**
 * @description Recipe fetch, delete and update routes : PUT/DELETE/GET
 */
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

/**
 * @description Recipe reviews routes: POST/GET
 */
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

/**
 * @description vote route: PUT
 */
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

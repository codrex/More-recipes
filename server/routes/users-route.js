import express from 'express';
import { fetchVotes } from '../controller/vote';
import { verifyToken } from '../authentication/authenticator';
import {
  recipeIdValidation,
  recipeIdsValidation
} from '../middleware/validation/recipe';
import {
  isRecipe,
  setFavouriteAssociation
} from '../controller/recipe';
import {
  validateSignupData,
  validateLoginData,
  validateUpdate,
  validateUserId,
} from '../middleware/validation/user';
import {
  create,
  fetchUser,
  login,
  addAccessToken,
  addFavouriteRecipe,
  beforeUpdate,
  update,
  compareIds,
  isValidUser,
  fetchFavouriteRecipes,
  fetchCreatedRecipes,
} from '../controller/user';

const usersRoute = express.Router();

usersRoute.use((req, res, next) => {
  next();
});
usersRoute.route('/signup')
  .post(
    validateSignupData,
    create,
    addAccessToken
  );

usersRoute.route('/signin')
  .post(
    validateLoginData,
    login,
    addAccessToken
  );

usersRoute.use(verifyToken, isValidUser);
usersRoute.route('/votes')
  .get(
    recipeIdsValidation,
    fetchVotes
  );

usersRoute.route('/:id')
  .get(
    validateUserId,
    fetchUser
  )
  .put(
    recipeIdValidation,
    compareIds,
    beforeUpdate,
    validateUpdate,
    update,
    fetchUser
  );
usersRoute.route('/:id/recipes/favourite')
  .get(
    recipeIdValidation,
    compareIds,
    fetchFavouriteRecipes
  );

usersRoute.route('/:id/recipes/created')
  .get(
    recipeIdValidation,
    compareIds,
    fetchCreatedRecipes
  );
usersRoute.route('/recipe')
  .post(
    recipeIdValidation,
    isRecipe,
    setFavouriteAssociation,
    addFavouriteRecipe,
  );

export default usersRoute;

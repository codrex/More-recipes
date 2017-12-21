import express from 'express';
import {
  create,
  fetchUser,
  loginUser,
  sendDataWithToken,
  setFavRecipe,
  fetchForUpdate,
  update,
  compareIds,
  isIdValidUser,
  fetchFavouriteRecipes,
  fetchCreatedRecipes,
} from '../controller/user';
import { fetchVotes } from '../controller/vote';
import {
  recipeIdValidation,
  recipeIdsValidation
} from '../middleware/validation/recipe';
import {
  validateSignupData,
  validateLoginData,
  validateUpdate,
  validateUserId,
} from '../middleware/validation/user';
import { checkRecipe } from '../controller/recipe';

import { verifyToken } from '../authentication/authenticator';

const usersRoute = express.Router();

usersRoute.use((req, res, next) => {
  next();
});

usersRoute.route('/signup')
  .post(
    validateSignupData,
    create,
    sendDataWithToken
  );

usersRoute.route('/signin')
  .post(
    validateLoginData,
    loginUser,
    sendDataWithToken
  );

usersRoute.use(verifyToken, isIdValidUser);

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
    fetchForUpdate,
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
    checkRecipe,
    setFavRecipe
  );

export default usersRoute;

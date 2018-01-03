import express from 'express';
import { fetchVotes } from '../controller/vote';
import { verifyToken } from '../middleware/authentication';
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
  isUserValid,
  fetchFavouriteRecipes,
  fetchCreatedRecipes,
} from '../controller/user';

const usersRoute = express.Router();

usersRoute.use((req, res, next) => {
  next();
});

/**
 * @description signup route : POST
 */
usersRoute.route('/signup')
  .post(
    validateSignupData,
    create,
    addAccessToken
  );

/**
 * @description signin route : POST
 */
usersRoute.route('/signin')
  .post(
    validateLoginData,
    login,
    addAccessToken
  );

/**
 * @description route protector
 */
usersRoute.use(verifyToken, isUserValid);

/**
 * @description get users vote route : GET
 */
usersRoute.route('/votes')
  .get(
    recipeIdsValidation,
    fetchVotes
  );

/**
 * @description get and update user record routes : PUT/GET
 */
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

/**
 * @description get user's favourite recipes route : GET
 */
usersRoute.route('/:id/recipes/favourite')
  .get(
    recipeIdValidation,
    compareIds,
    fetchFavouriteRecipes
  );

/**
 * @description get user's created recipe route  : POST
 */
usersRoute.route('/:id/recipes/created')
  .get(
    recipeIdValidation,
    compareIds,
    fetchCreatedRecipes
  );

/**
 * @description add favourite recipe route : POST
 */
usersRoute.route('/recipe')
  .post(
    recipeIdValidation,
    isRecipe,
    setFavouriteAssociation,
    addFavouriteRecipe,
  );

export default usersRoute;

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
 * @description get user record routes : GET
 */
usersRoute.route('/:id')
  .get(
    validateUserId,
    fetchUser
  );

/**
 * @description update user record routes : PUT
 */
usersRoute.route('/update')
  .put(
    beforeUpdate,
    validateUpdate,
    update,
    fetchUser
  );

/**
 * @description get user's favourite recipes route : GET
 */
usersRoute.route('/recipes/favourite')
  .get(
    fetchFavouriteRecipes
  );

/**
 * @description get user's created recipe route  : POST
 */
usersRoute.route('/recipes/created')
  .get(
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

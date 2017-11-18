import express from 'express';
import { validateSignupData,
        create, fetchUser,
         validateLoginData, loginUser,
         sendDataWithToken, setFavRecipe,
        fetchRecipes, validateUpdate,
        fetchForUpdate, update,
        validateUserId, compareIds, isIdValidUser } from '../controller/user';
import { recipeIdValidation, checkRecipe } from '../controller/recipe';
import { verifyToken } from '../authentication/authenticator';

const usersRoute = express.Router();

usersRoute.use((req, res, next) => {
  next();
});

usersRoute.route('/signup')
  .post(validateSignupData,
            create,
            sendDataWithToken);

usersRoute.route('/signin')
  .post(validateLoginData, loginUser, sendDataWithToken);

usersRoute.use(verifyToken, isIdValidUser);

usersRoute.route('/:id')
  .get(validateUserId, fetchUser)
  .put(recipeIdValidation, compareIds, fetchForUpdate, validateUpdate, update, fetchUser);

usersRoute.route('/:id/recipes')
  .get(recipeIdValidation, compareIds, fetchRecipes);

usersRoute.route('/:id/recipe')
.post(recipeIdValidation, compareIds, checkRecipe, setFavRecipe, fetchRecipes);

export default usersRoute;

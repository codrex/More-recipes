import express from 'express';
import { validateSignupData,
        create, fetchUser,
         validateLoginData, authUser,
         sendDataWithToken, setFavRecipe,
        fetchRecipes, validateUpdate,
        fetchForUpdate, update,
        validateUserId, compareIds, isIdValidUser } from '../controller/user';
import { idValidation, checkRecipe } from '../controller/recipe';
import { verifyToken } from '../auth/auth';

const usersRoute = express.Router();

usersRoute.use((req, res, next) => {
  next();
});

usersRoute.route('/signup')
  .post(validateSignupData,
            create,
            sendDataWithToken);

usersRoute.route('/signin')
  .post(validateLoginData, authUser, sendDataWithToken);

usersRoute.use(verifyToken, isIdValidUser);

usersRoute.route('/:id')
  .get(validateUserId, fetchUser)
  .put(idValidation, compareIds, fetchForUpdate, validateUpdate, update, fetchUser);

usersRoute.route('/:id/recipes')
  .get(idValidation, compareIds, fetchRecipes);

usersRoute.route('/:id/recipe')
.post(idValidation, compareIds, checkRecipe, setFavRecipe, fetchRecipes);

export default usersRoute;

import express from 'express';
import { validateSignupData,
        create, fetchUser,
         validateLoginData, authUser,
         sendDataWithToken, setFavRecipe,
        fetchRecipes, validateUpdate,
        fetchForUpdate, update,
        validateUserId, compareIds } from '../controller/user';
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

usersRoute.route('/:id')
  .get(verifyToken, validateUserId, fetchUser)
  .put(verifyToken, idValidation, compareIds, fetchForUpdate, validateUpdate, update, fetchUser);

usersRoute.route('/:id/recipes')
  .get(verifyToken, idValidation, compareIds, fetchRecipes);

usersRoute.route('/:id/recipe')
.post(verifyToken, idValidation, checkRecipe, setFavRecipe, fetchRecipes);

export default usersRoute;

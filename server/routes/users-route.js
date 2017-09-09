import express from 'express';
import { validateSignupData,
        create, fetchUser,
         validateLoginData, authUser,
         sendDataWithToken, setFavRecipe,
        fetchFavRecipes } from '../controller/user';
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

usersRoute.route('/user')
  .get(verifyToken, fetchUser);

usersRoute.route('/recipes')
  .post(verifyToken, idValidation, checkRecipe, setFavRecipe, fetchFavRecipes)
  .get(verifyToken, fetchFavRecipes);


export default usersRoute;

import express from 'express';
import { validateSignupData,
        create, fetchUser,
        usernameExist, emailExist,
         validateLoginData, authUser,
         sendDataWithToken, setFavRecipe,
        fetchFavRecipes } from '../controller/user';
import { idValidation, checkRecipe } from '../controller/recipe';
import { verifyToken } from '../auth/auth';

const usersRoute = express.Router();

console.log('in user router');

usersRoute.use((req, res, next) => {
  next();
});

usersRoute.route('/signup')
  .post(validateSignupData,
          usernameExist,
          emailExist,
            create,
            fetchUser);

usersRoute.route('/signin')
  .post(validateLoginData, authUser, sendDataWithToken);

usersRoute.route('/recipes')
  .post(verifyToken, idValidation, checkRecipe, setFavRecipe, fetchFavRecipes)
  .get(verifyToken, fetchFavRecipes);


export default usersRoute;

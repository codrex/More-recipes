import express from 'express';
import { validateSignupData, create, fetchUser, usernameExist, emailExist } from '../controller/user';

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

export default usersRoute;

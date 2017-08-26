import express from 'express';
import { validateSignupData,
        create, fetchUser,
        usernameExist, emailExist,
         validateLoginData, authUser,
         sendDataWithToken } from '../controller/user';

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

export default usersRoute;

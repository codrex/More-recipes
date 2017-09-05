import db from '../models/index';
import { validateSignup, validateLogin, comparePwd } from '../validators/validator.js';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';
import { generateToken } from '../auth/auth';
const Users = db.Users;

// This function validates signup inputs
export const validateSignupData = (req, res, next) => {
  const signupData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const validate = validateSignup(signupData);
  if (validate.valid) {
    req.body = signupData;
    next();
  } else {
    sendValidationError(res, validate);
  }
};

// This function validates signin inputs
export const validateLoginData = (req, res, next) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  const validate = validateLogin(loginData);
  if (validate.valid) {
    req.loginData = loginData;
    next();
  } else {
    sendValidationError(res, validate);
  }
};

// This function handle user authentication
export const authUser = (req, res, next) => {
  Users.findOne({
    where: {
      username: req.loginData.username,
    },
    attributes: ['id', 'email', 'username', 'fullname', 'password'],

  }).then(user => {
    if (!user) {
      sendFail(res, 400, 'invalid username or password');
      return;
    }
    const hash = user.dataValues.password;
  // compare proved password
    if (user && comparePwd(hash, req.loginData.password)) {
      req.loggedInUser = user.dataValues;
      next();
    } else {
      sendFail(res, 400, 'invalid username or password');
    }
  }).catch(error => {
    serverError(res, error);
  });
};

// sends User's info along with an auth token back to the user
export const sendDataWithToken = (req, res) => {
  const token = generateToken({ id: req.loggedInUser.id });

  delete req.loggedInUser.id;
  delete req.loggedInUser.password;

  req.loggedInUser.token = token;
  sendSuccess(res, 200, 'User', req.loggedInUser);
};

// check if email provided by the user already exist in the database
export const emailExist = (req, res, next) => {
  Users.findOne({
    where: { email: req.body.email },
  }).then(user => {
    if (user) {
      sendFail(res, 400, 'This email already exist in our system');
    } else {
      next();
    }
  });
};

// check if username provided by the user already exist in the database
export const usernameExist = (req, res, next) => {
  Users.findOne({
    where: { username: req.body.username },
  }).then(user => {
    if (user) {
      sendFail(res, 400, 'This username already exist in our system');
    } else {
      next();
    }
  });
};

// create user record
export const create = (req, res, next) => {
  Users.create(req.body)
    .then((user) => {
      req.idToFetchUser = user.dataValues.id;
      next();
    }).catch((error) => {
      serverError(res, error);
    });
};

// get user record
export const fetchUser = (req, res) => {
  Users.findOne({
    where: { id: req.idToFetchUser },
    attributes: ['id', 'email', 'username'],
  }).then(user => {
    if (user) {
      sendSuccess(res, 200, 'User', user.dataValues);
    } else {
      sendFail(res, 404, 'user not found');
    }
  }).catch(error => {
    serverError(res, error);
  });
};

// add recipe as a user's favorite recipe
export const setFavRecipe = (req, res, next) => {
  Users.findById(req.requestId)
    .then(user => {
      user.addFavRecipes(req.body.recipeId)
      .then(() => {
        next();
      }).catch(error => {
        serverError(res, error);
      });
    });
};

// get a user's favorite recipe from the dbase
export const fetchFavRecipes = (req, res) => {
  Users.findOne({
    where: { id: req.requestId },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password'],
    },
    include: [{
      model: db.Recipes,
      as: 'favRecipes',
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      through: {
        attributes: [],
      },
      include: [{
        model: db.Users,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      }],
    }],
  })
  .then(userFavRecipes => {
    sendSuccess(res, 200, 'User', userFavRecipes);
  }).catch(error => {
    serverError(res, error);
  });
};

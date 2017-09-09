import db from '../models/index';
import { validateSignup, validateLogin, comparePwd } from '../validators/validator';
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

  }).then((user) => {
    if (!user) {
      sendFail(res, 400, 'invalid username');
      return;
    }
    const hash = user.dataValues.password;
  // compare proved password
    if (user && comparePwd(hash, req.loginData.password)) {
      req.user = user.dataValues;
      next();
    } else {
      sendFail(res, 400, 'invalid password');
    }
  }).catch(() => {
    serverError(res);
  });
};

// sends User's info along with an auth token back to the user
export const sendDataWithToken = (req, res) => {
  const token = generateToken({ id: req.user.id });

  delete req.user.id;
  delete req.user.password;

  req.user.token = token;
  sendSuccess(res, 200, 'User', req.user);
};

// create user record
export const create = (req, res, next) => {
  Users.create(req.body)
    .then((user) => {
      req.user = user.dataValues;
      next();
    }).catch((error) => {
      sendFail(res, 400, error.errors[0].message);
    });
};

// get user record
export const fetchUser = (req, res) => {
  Users.findOne({
    where: { id: req.requestId },
    attributes: ['id', 'email', 'username'],
    include: [{ all: true }]
  }).then((user) => {
    if (user) {
      sendSuccess(res, 200, 'User', user.dataValues);
    }
  });
};

// add recipe as a user's favorite recipe
export const setFavRecipe = (req, res, next) => {
  Users.findById(req.requestId)
    .then((user) => {
      user.addFavRecipes(req.body.recipeId)
      .then(() => {
        next();
      }).catch(() => {
        serverError(res);
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
        as: 'Owner',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      }],
    }],
  })
  .then(userFavRecipes => {
    sendSuccess((res), 200, 'User', userFavRecipes);
  }).catch(() => {
    serverError(res);
  });
};
export const isIdValidUser = (req, res, next) => {
  Users.findById(req.requestId)
    .then((user) => {
      if (user) {
        next();
      } else {
        sendFail(res, 404, 'User not found');
      }
    }).catch(() => {
      serverError(res);
    });
};

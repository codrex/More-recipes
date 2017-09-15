import db from '../models/index';
import { validateSignup, validateLogin,
         comparePwd, validateProfileUpdate, validationHandler } from '../validators/validator';
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
  validationHandler(signupData, validateSignup, req, res, next);
};

// This function validates profile update data
export const validateUpdate = (req, res, next) => {
  const updateData = {
    username: req.body.username || req.user.username,
    fullname: req.body.fullname || req.user.fullname,
    email: req.body.email || req.user.email,
  };
  validationHandler(updateData, validateProfileUpdate, req, res, next);
};

// This function validates signin inputs
export const validateLoginData = (req, res, next) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  validationHandler(loginData, validateLogin, req, res, next);
};

// This function handle user authentication
export const authUser = (req, res, next) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
    attributes: ['id', 'email', 'username', 'fullname', 'password'],

  }).then((user) => {
    if (!user) {
      sendFail(res, 400, 'invalid username');
      return;
    }
    const hash = user.dataValues.password;
  // compare proved password
    if (user && comparePwd(hash, req.body.password)) {
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

// update user record
export const update = (req, res, next) => {
  Users.update(req.body, { where: { id: req.requestId } })
  .then(() => {
    next();
  }).catch((error) => {
    sendFail(res, 400, error.errors[0].message);
  });
};

// get user record
export const fetchUser = (req, res) => {
  Users.findOne({
    where: { id: req.requestId },
    attributes: ['id', 'email', 'username', 'fullname'],
    include: [{ all: true }]
  }).then((user) => {
    if (user) {
      sendSuccess(res, 200, 'User', user.dataValues);
    }
  });
};

export const fetchForUpdate = (req, res, next) => {
  Users.findOne({
    where: { id: req.requestId },
    attributes: ['email', 'username', 'fullname'],
  }).then((user) => {
    if (user) {
      req.user = user.dataValues;
    }
    next();
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

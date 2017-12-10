import db from '../models/index';
import { validateSignup, validateLogin,
  comparePassword, validateProfileUpdate,
  validationHandler, validateId } from '../validators/validator';
import { serverError, sendSuccess, sendFail } from '../reply/reply';
import { generateToken } from '../authentication/authenticator';

const Users = db.Users;

// This function validates signup inputs
export const validateSignupData = (req, res, next) => {
  validationHandler({
    ...req.body
  }, validateSignup, req, res, next);
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

// This function validates  user id gotten from req.params
export const validateUserId = (req, res, next) => {
  const id = {
    id: req.params.id,
  };
  validationHandler(id, validateId, req, res, next);
};

// This function handle user authentication
export const loginUser = (req, res, next) => {
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
    if (user && comparePassword(hash, req.body.password)) {
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
  const token = generateToken({
    id: req.user.id
  });

  delete req.user.id;
  delete req.user.password;
  if (req.user.updatedAt) delete req.user.updatedAt;

  req.user.token = token;
  sendSuccess(res, 200, 'user', req.user);
};

// create user record
export const create = (req, res, next) => {
  Users.create(req.body)
    .then((user) => {
      req.user = user.dataValues;
      next();
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        sendFail(res, 400, `Sorry, ${error.errors[0].path} already exists, please enter another`);
        return;
      }
      serverError(res);
    });
};

// update user record
export const update = (req, res, next) => {
  Users.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      next();
    }).catch((error) => {
      sendFail(res, 400, error.errors[0].message);
    });
};

// get user record
export const fetchUser = (req, res) => {
  Users.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'email', 'username', 'fullname', 'profilePicture'],
    include: [{
      all: true
    }]
  }).then((user) => {
    if (user) {
      sendSuccess(res, 200, 'user', user.dataValues);
    } else {
      sendFail(res, 404, 'Sorry, user not found');
    }
  });
};

export const fetchForUpdate = (req, res, next) => {
  Users.findOne({
    where: {
      id: req.params.id
    },
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
      user.hasFavRecipes(req.body.recipeId)
        .then((isFavRecipe) => {
          if (isFavRecipe) {
            user.removeFavRecipes(req.body.recipeId)
              .then(() => {
                next();
              });
          } else {
            user.addFavRecipes(req.body.recipeId)
              .then(() => {
                next();
              });
          }
        });
    }).catch(() => {
      serverError(res);
    });
};

// add recipe to user list of created recipes
export const setRecipe = (req, res, next) => {
  Users.findById(req.requestId)
    .then((user) => {
      user.addCreatedRecipes(req.idToFetchRecipe)
        .then(() => {
          next();
        }).catch(() => {
          serverError(res);
        });
    });
};

// get a user's favorite recipe from the dbase
export const fetchRecipes = (req, res) => {
  Users.findOne({
    where: {
      id: req.requestId
    },
    attributes: ['id'],
    include: [{
      all: true
    }],
  })
    .then((userRecipes) => {
      sendSuccess((res), 200, 'user', userRecipes);
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
        sendFail(res, 404, 'Sorry, user not found');
      }
    }).catch(() => {
      serverError(res);
    });
};

export const compareIds = (req, res, next) => {
  if (parseInt(req.params.id, 10) === req.requestId) {
    next();
  } else {
    sendFail(res, 404, 'Sorry, user was not found');
  }
};

import db from '../models/index';
import comparePassword from '../utils/comparePassword';
import {
  serverError,
  sendSuccess,
  sendFail,
  sendPaginatedData
} from '../reply/reply';
import { generateToken } from '../authentication/authenticator';
import getParams from '../utils/pagination';
import { ATTRIBUTES, USER_NOT_FOUND } from '../constants/constants';

const Users = db.Users;

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
      model: db.Recipes,
      as: 'favRecipes',
      attributes: ['id'],
    }]
  }).then((user) => {
    if (user) {
      sendSuccess(res, 200, 'user', user.dataValues);
    } else {
      sendFail(res, 404, USER_NOT_FOUND);
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
export const setFavRecipe = (req, res) => {
  Users.findById(req.requestId)
    .then((user) => {
      const { recipeId } = req.body;
      user.hasFavRecipes(recipeId)
        .then((isFavRecipe) => {
          if (isFavRecipe) {
            user.removeFavRecipes(recipeId)
              .then(() => {
                sendSuccess(res, 200, 'favRecipe', {
                  id: recipeId,
                  added: false
                });
              });
          } else {
            user.addFavRecipes(recipeId)
              .then(() => {
                sendSuccess(res, 200, 'favRecipe', {
                  recipe: req.currentRecipe,
                  id: recipeId,
                  added: true
                });
              });
          }
        });
    }).catch(() => {
      serverError(res);
    });
};

// add recipe to user list of created recipes
export const setRecipe = (req) => {
  Users.findById(req.requestId)
    .then((user) => {
      user.addCreatedRecipes(req.currentRecipeId)
        .catch(() => {});
    });
};

export const fetchRecipes = (model, alias, req, res) => {
  const { as } = model;
  const attributes = ATTRIBUTES.concat(`${as}Id`);
  const { limit, offset } = getParams(req);
  Users.findOne({
    where: {
      id: req.requestId
    },
    attributes: ['id'],
    include: [
      {
        ...model,
        limit,
        offset,
        attributes
      },
    ]
  })
    .then((userRecipes) => {
      userRecipes[`get${alias}`]()
        .then((recipes) => {
          sendPaginatedData('recipes', {
            rows: userRecipes[as],
            count: recipes.length,
            limit
          }, res);
        });
    }).catch(() => {
      serverError(res);
    });
};

// get a user's favorite recipe from the dbase
export const fetchFavouriteRecipes = (req, res) => {
  const model = {
    model: db.Recipes,
    as: 'favRecipes'
  };
  fetchRecipes(model, 'FavRecipes', req, res);
};

// get a user's favorite recipe from the dbase
export const fetchCreatedRecipes = (req, res) => {
  const model = {
    model: db.Recipes,
    as: 'createdRecipes'
  };
  fetchRecipes(model, 'CreatedRecipes', req, res);
};

export const isIdValidUser = (req, res, next) => {
  Users.findById(req.requestId)
    .then((user) => {
      if (user) {
        next();
      } else {
        sendFail(res, 404, USER_NOT_FOUND);
      }
    }).catch(() => {
      serverError(res);
    });
};

export const compareIds = (req, res, next) => {
  if (parseInt(req.params.id, 10) === req.requestId) {
    next();
  } else {
    sendFail(res, 404, USER_NOT_FOUND);
  }
};

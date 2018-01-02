import { Users, Recipes } from '../models/index';
import comparePassword from '../utils/comparePassword';
import { generateToken } from '../authentication/authenticator';
import getParams from '../utils/pagination';
import { ATTRIBUTES, USER_NOT_FOUND } from '../constants';
import {
  serverError,
  sendSuccess,
  sendFail,
  sendPaginatedData
} from '../utils/responder';

/**
 * @name login
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const login = (req, res, next) => {
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

/**
 * @name create
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const create = (req, res, next) => {
  Users.create(req.body)
    .then((user) => {
      user.reload({
        attributes: ['id', 'email', 'username', 'fullname'],
      }).then((createdUser) => {
        req.user = createdUser.dataValues;
        next();
      });
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        sendFail(res, 400, `Sorry, ${error.errors[0].path} already exists, please enter another`);
        return;
      }
      serverError(res);
    });
};

/**
 * @name addAccessToken
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const addAccessToken = (req, res) => {
  const { user } = req;
  const token = generateToken({
    id: user.id
  });
  if (user.password) delete user.password;
  user.token = token;
  sendSuccess(res, 200, 'user', user);
};

/**
 * @name update
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
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

/**
 * @name fetchUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const fetchUser = (req, res) => {
  Users.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'email', 'username', 'fullname', 'profilePicture'],
    include: [{
      model: Recipes,
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

/**
 * @name beforeUpdate
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const beforeUpdate = (req, res, next) => {
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

/**
 * @name addFavouriteRecipe
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
export const addFavouriteRecipe = (req, res) => {
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

/**
 * @name addCreatedRecipe
 * @function
 * @param {Object} req - Express request object
 * @return {*} void
 */
export const addCreatedRecipe = (req) => {
  Users.findById(req.requestId)
    .then((user) => {
      user.addCreatedRecipes(req.currentRecipeId)
        .catch(() => {});
    });
};

/**
 * @name fetchRecipes
 * @function
 * @param {Object} model
 * @param {String} alias
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
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

/**
 * @name fetchFavouriteRecipes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
export const fetchFavouriteRecipes = (req, res) => {
  const model = {
    model: Recipes,
    as: 'favRecipes'
  };
  fetchRecipes(model, 'FavRecipes', req, res);
};

/**
 * @name fetchCreatedRecipes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
export const fetchCreatedRecipes = (req, res) => {
  const model = {
    model: Recipes,
    as: 'createdRecipes'
  };
  fetchRecipes(model, 'CreatedRecipes', req, res);
};

/**
 * @name isValidUser
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isValidUser = (req, res, next) => {
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

/**
 * @name compareIds
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const compareIds = (req, res, next) => {
  if (parseInt(req.params.id, 10) === req.requestId) {
    next();
  } else {
    sendFail(res, 404, USER_NOT_FOUND);
  }
};

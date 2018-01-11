import { Users, Recipes } from '../models/index';
import comparePassword from '../utils/comparePassword';
import { generateToken } from '../middleware/authentication';
import getParams from '../utils/getParams';
import { ATTRIBUTES, USER_NOT_FOUND } from '../constants';
import {
  sendServerError,
  sendSuccess,
  sendFail,
  sendPaginatedData
} from '../utils/responder';

/**
 * @description login a user
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
    include: [{
      model: Recipes,
      as: 'favRecipes',
      attributes: ['id'],
    }]

  }).then((user) => {
    if (!user) {
      sendFail(res, 400, 'invalid username');
      return;
    }
    const hash = user.dataValues.password;
    if (user && comparePassword(hash, req.body.password)) {
      req.user = user.dataValues;
      req.statusCode = 200;
      next();
    } else {
      sendFail(res, 400, 'invalid password');
    }
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @description add user record to the database
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
      req.user = user.dataValues;
      req.statusCode = 201;
      next();
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        sendFail(res, 400, `Sorry, ${error.errors[0].path} already exists, please enter another`);
        return;
      }
      sendServerError(res);
    });
};

/**
 * @description attach jwt access token to the user object retrieved from the database
 * @name addAccessToken
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const addAccessToken = (req, res) => {
  const { user, statusCode } = req;
  const token = generateToken({
    id: user.id
  });
  delete user.password;
  user.token = token;
  sendSuccess(res, statusCode, 'user', user);
};

/**
 * @name update
 * @function
 * @description update user record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const update = (req, res, next) => {
  Users.update(req.body, {
    where: {
      id: req.requestId
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
 * @description get user record
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const fetchUser = (req, res) => {
  Users.findOne({
    where: {
      id: req.params.id || req.requestId
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
 * @description fetch user record and stores it in ```req.user``` attribute.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const beforeUpdate = (req, res, next) => {
  Users.findOne({
    where: {
      id: req.requestId
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
 * @description sets association favourite recipe association between a user and a recipe
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
      sendServerError(res);
    });
};

/**
 * @name addCreatedRecipe
 * @description sets association created recipe association between a user and a recipe
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
 * @description recipes that have an association with the user
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
      sendServerError(res);
    });
};

/**
 * @description recipes that have a favourite recipe association with the user
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
 * @description recipes that have a created recipe association with the user
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
 * @description checks is a user id is in the database
 * @name isUserValid
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isUserValid = (req, res, next) => {
  Users.findById(req.requestId)
    .then((user) => {
      if (user) {
        next();
      } else {
        sendFail(res, 404, USER_NOT_FOUND);
      }
    }).catch(() => {
      sendServerError(res);
    });
};

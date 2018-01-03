import Sequelize from 'sequelize';
import db from '../models/index';
import getParams from '../utils/getParams';
import { ATTRIBUTES, RECIPE_NOT_FOUND } from '../constants';
import {
  sendServerError,
  sendSuccess,
  sendFail,
  sendPaginatedData
} from '../utils/responder';

const Recipes = db.Recipes;

/**
 * @name create
 * @description create recipe record.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const create = (req, res, next) => {
  Recipes.create(req.body)
    .then((recipe) => {
      recipe.setOwner(req.requestId).then(() => {
        req.currentRecipeId = recipe.dataValues.id;
        recipe.reload({
          attributes: ATTRIBUTES,
          include: [
            {
              model: db.Users,
              as: 'owner',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            }
          ],
        }).then((reloadedRecipe) => {
          sendSuccess(res, 201, 'recipe', reloadedRecipe);
        });
        next();
      });
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        sendFail(res, 400, 'Sorry, recipe name already exist, please enter another');
        return;
      }
      sendServerError(res);
    });
};

/**
 * @name fetch
 * @function
 * @param {Object} where
 * @param {Object} order
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
const fetch = (where = {}, order = [], req, res) => {
  const { limit, offset } = getParams(req);
  Recipes.findAndCountAll({
    where,
    limit,
    offset,
    order,
    attributes: ATTRIBUTES,
  }).then(({ count, rows }) => {
    sendPaginatedData('recipes', { rows, count, limit }, res);
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @name  fetchRecipe
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const fetchRecipe = (req, res, next) => {
  const id = req.currentRecipeId || req.params.id || req.body.recipeId;
  Recipes.findOne({
    where: {
      id,
    },
    attributes: ATTRIBUTES,
    include: [
      {
        model: db.Users,
        as: 'owner',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      }
    ],
  }).then((recipe) => {
    if (recipe) {
      sendSuccess(res, 200, 'recipe', recipe.dataValues);
      if (req.hasNewViewer) {
        recipe.increment('views', {
          by: 1
        });
      }
      if (req.recipeUpdated) next();
    } else {
      sendFail(res, 404, RECIPE_NOT_FOUND);
    }
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @name  fetchVotes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
export const fetchVotes = (req, res) => {
  Recipes.findOne({
    where: {
      id: req.currentRecipeId || req.params.id
    },
    attributes: ['id', 'upVotes', 'downVotes'],
  }).then((recipe) => {
    sendSuccess(res, 200, 'recipe', recipe.dataValues);
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @name  fetchRecipes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
export const fetchRecipes = (req, res) => {
  fetch({}, [], req, res);
};

/**
 * @name recipesSearch
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const recipesSearch = (req, res, next) => {
  if (req.query.search === undefined) return next();
  const { search } = req.query;
  const where = {
    $or: [
      {
        name: {
          $iLike: `%${search}%`
        }
      },
      {
        category: {
          $iLike: `%${search}%`
        }
      },
      {
        ingredients: {
          $contains: [search]
        }
      },
      {
        directions: {
          $contains: [search]
        }
      }
    ]
  };
  fetch(where, [], req, res);
};

/**
 * @name fetchRecipeByUpVote
 * @description  get records from the recipe table by highest number of upvotes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const fetchRecipeByUpVote = (req, res, next) => {
  if (req.query.sort === undefined) return next();
  fetch({}, [['upVotes', 'DESC']], req, res);
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
  Recipes.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'name',
      'category',
      'ingredients',
      'directions',
      'image'
    ],
  }).then((recipe) => {
    req.recipe = recipe;
    next();
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @name remove
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const remove = (req, res) => {
  Recipes.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      sendSuccess(res, 200, 'success', 'Recipe was successfully deleted');
    });
};

/**
 * @name isOwner
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isOwner = (req, res, next) => {
  Recipes.findOne({
    where: {
      id: parseInt(req.params.id, 10),
      ownerId: req.requestId
    }
  })
    .then((recipe) => {
      if (!recipe) {
        sendFail(res, 404, RECIPE_NOT_FOUND);
      } else {
        next();
      }
    }).catch(() => {
      sendServerError(res);
    });
};

/**
 * @name isRecipe
 * @description checking if recipe record exist in database
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const isRecipe = (req, res, next) => {
  Recipes.findById(req.body.recipeId || req.params.id)
    .then((recipe) => {
      if (recipe) {
        req.currentRecipe = recipe.dataValues;
        next();
      } else {
        sendFail(res, 404, RECIPE_NOT_FOUND);
      }
    }).catch(() => {
      sendServerError(res);
    });
};

/**
 * @name setReviewAssociation
 * @description set association between recipe and review
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const setReviewAssociation = (req, res, next) => {
  Recipes.findById(req.params.id)
    .then((recipe) => {
      recipe.addReview(req.createdReview.id)
        .then(() => {
          next();
        });
    }).catch(() => {
      sendServerError(res);
    });
};

/**
 * @name setFavouriteAssociation
 * @description set association between recipe and review.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const setFavouriteAssociation = (req, res, next) => {
  Recipes.findById(req.body.recipeId)
    .then((recipe) => {
      const { requestId } = req;
      recipe.hasFavoriteUsers(requestId)
        .then((hasUser) => {
          if (hasUser) {
            recipe.removeFavoriteUsers(requestId)
              .then(() => {
                next();
              });
          } else {
            recipe.addFavoriteUsers(requestId)
              .then(() => {
                next();
              });
          }
        });
    });
};

/**
 * @name update
 * @description update recipe record.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const update = (req, res, next) => {
  Recipes.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      req.recipeUpdated = true;
      next();
    }).catch(() => {
      sendServerError(res);
    });
};


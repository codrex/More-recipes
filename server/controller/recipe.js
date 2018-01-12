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
  Recipes.create({ ...req.body, stringIngredients: '' })
    .then((recipe) => {
      recipe.setOwner(req.requestId).then(() => {
        req.currentRecipeId = recipe.dataValues.id;
        recipe.reload({
          include: [
            {
              model: db.Users,
              as: 'owner',
              attributes: {
                exclude: ['createdAt', 'updatedAt', 'password'],
              },
            }
          ],
        }).then(({ dataValues }) => {
          delete dataValues.stringIngredients;
          delete dataValues.favRecipesId;
          delete dataValues.createdRecipesId;

          sendSuccess(res, 201, 'recipe', dataValues);
        });
        next();
      });
    }).catch(() => {
      sendServerError(res);
    });
};

/**
 * @name checkDuplicateName
 * @description checks if a recipe name is unique to a user
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const checkDuplicateName = (req, res, next) => {
  Recipes.findOne({
    where: {
      name: {
        $iLike: `%${req.body.name}%`
      },
      ownerId: req.requestId
    }
  }).then((recipe) => {
    if (recipe) {
      return sendFail(res, 400, 'Recipe already exist, Please enter another');
    }
    next();
  }).catch(() => {
    sendServerError();
  });
};

/**
 * @description fetch recipes from the database
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
    group: ['id']
  }).then(({ count, rows }) => {
    sendPaginatedData('recipes', { rows, count: count.length, limit }, res);
  }).catch(() => {
    sendServerError(res);
  });
};

/**
 * @description fetch a single recipe from the database
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
 * @description get recipe's vote record
 * @name fetchVotes
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
 * @description fetch recipe from the database
 * @name fetchRecipes
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @return {*} void
 */
export const fetchRecipes = (req, res) => {
  fetch({}, [[db.sequelize.fn('RANDOM')]], req, res);
};

/**
 * @description fetch recipe that matches a given search term
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
        stringIngredients: {
          $iLike: `%${search.toLowerCase()}%`
        }
      },
      {
        directions: {
          $contains: [search]
        }
      }
    ]
  };
  fetch(where, [
    [db.sequelize.where(db.sequelize.col('name'), 'iLike', `%${search}%`), 'DESC']
  ], req, res);
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
  const { sequelize } = db;
  if (req.query.sort === undefined) return next();
  fetch({
    upVotes: {
      $gt: 0
    }
  }, [
    [
      sequelize.where(sequelize.col('upVotes'), '>', sequelize.col('downVotes')),
      'DESC'
    ],
    [
      sequelize.where(sequelize.col('upVotes'), '-', sequelize.col('downVotes')),
      'DESC'
    ],
    [
      sequelize.fn('min', sequelize.col('downVotes')), 'DESC'
    ],
  ], req, res);
};

/**
 * @description fetch recipe and store it in ```req.recipe``` attribute.
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
 * @description delete recipe from the database
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
 * @description check recipe owner
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
    }
  })
    .then((recipe) => {
      if (!recipe) {
        sendFail(res, 404, RECIPE_NOT_FOUND);
      } else {
        if (recipe.dataValues.ownerId === req.requestId) {
          next();
          return;
        }
        sendFail(res, 403, 'You do not access to this recipe');
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


import Sequelize from 'sequelize';
import db from '../models/index';
import {
  serverError,
  sendSuccess,
  sendFail,
  sendPaginatedData
} from '../reply/reply';
import getParams from '../utils/pagination';
import { ATTRIBUTES, RECIPE_NOT_FOUND } from '../constants/constants';

const Recipes = db.Recipes;


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
    serverError(res);
  });
};

export const create = (req, res, next) => {
  Recipes.create(req.body)
    .then((recipe) => {
      recipe.setOwner(req.requestId).then(() => {
        req.currentRecipeId = recipe.dataValues.id;
        recipe.reload({
          attributes: ATTRIBUTES
        }).then((reloadRecipe) => {
          sendSuccess(res, 200, 'recipe', reloadRecipe);
        });
        next();
      });
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        sendFail(res, 400, 'Sorry, recipe name already exist, please enter another');
        return;
      }
      serverError(res);
    });
};

export const fetchRecipe = (req, res) => {
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
    } else {
      sendFail(res, 404, RECIPE_NOT_FOUND);
    }
  }).catch(() => {
    serverError(res);
  });
};

// fetch recipe votes
export const fetchVotes = (req, res) => {
  Recipes.findOne({
    where: {
      id: req.currentRecipeId || req.params.id
    },
    attributes: ['id', 'upVotes', 'downVotes'],
  }).then((recipe) => {
    sendSuccess(res, 200, 'recipe', recipe.dataValues);
  }).catch(() => {
    serverError(res);
  });
};

export const fetchAllRecipe = (req, res) => {
  fetch({}, [], req, res);
};

export const fetchAllBySearch = (req, res, next) => {
  if (req.query.search === undefined) return next();
  const { search } = req.query;
  const Op = Sequelize.Op;
  const where = {
    [Op.or]: [
      {
        name: {
          [Op.iLike]: `%${search}%`
        }
      },
      {
        category: {
          [Op.iLike]: `%${search}%`
        }
      },
      {
        ingredients: {
          [Op.contains]: [search]
        }
      },
      {
        directions: {
          [Op.contains]: [search]
        }
      }
    ]
  };
  fetch(where, [], req, res);
};

// fetch recipes by upVotes in desending order
export const fetchRecipeByUpVote = (req, res, next) => {
  if (req.query.sort === undefined) return next();
  fetch({}, [['upVotes', 'DESC']], req, res);
};

export const fetchForUpdate = (req, res, next) => {
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
    if (recipe) {
      req.recipe = recipe;
      next();
    } else {
      sendFail(res, 404, RECIPE_NOT_FOUND);
    }
  }).catch(() => {
    serverError(res);
  });
};

// This function delete a recipe from the recipe table
export const deleteRecipe = (req, res) => {
  Recipes.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      sendSuccess(res, 200, 'success', 'Recipe was successfully deleted');
    });
};

// checking if a requesting id is the id that created the post
export const checkOwnship = (req, res, next) => {
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
      serverError(res);
    });
};

// checking if recipe exist in dbase
export const checkRecipe = (req, res, next) => {
  Recipes.findById(req.body.recipeId || req.params.id)
    .then((recipe) => {
      if (recipe) {
        req.currentRecipe = recipe.dataValues;
        next();
      } else {
        sendFail(res, 404, RECIPE_NOT_FOUND);
      }
    }).catch(() => {
      serverError(res);
    });
};

// set association between recipe and review
export const setReview = (req, res, next) => {
  Recipes.findById(req.params.id)
    .then((recipe) => {
      if (!recipe) {
        return sendFail(res, 404, RECIPE_NOT_FOUND);
      }
      recipe.addRecipeReviews(req.reviewId)
        .then(() => {
          next();
        });
    }).catch(() => {
      serverError(res);
    });
};

// get reviews on a recipe
export const fetchReview = (req, res) => {
  const { limit, offset } = getParams(req);
  Recipes.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id'],
    include: [{
      model: db.RecipeReviews,
      limit,
      offset,
      attributes: ['id', 'RecipeId', 'createdAt', 'review'],
      include: [{
        model: db.Users,
        as: 'Reviewer',
        attributes: ['id', 'username', 'fullname']
      }],
      order: [['id', 'DESC']],
    }],
  })
    .then((recipe) => {
      if (recipe) {
        recipe.getRecipeReviews()
          .then((recipeReviews) => {
            const count = recipeReviews.length;
            sendPaginatedData('reviews', {
              count,
              limit,
              rows: recipe.RecipeReviews
            }, res);
          });
      } else sendFail(res, 404, RECIPE_NOT_FOUND);
    }).catch(() => {
      serverError(res);
    });
};

export const update = (req, res, next) => {
  Recipes.update(req.body, {
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      next();
    }).catch(() => {
      serverError(res);
    });
};


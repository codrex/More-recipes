import db from '../models/index';
import { validateRecipes, validateId } from '../validators/validator';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';

const Recipes = db.Recipes;

const validationHandler = (obj, validator, req, res, next) => {
  const validate = validator(obj);
  if (validate.valid) {
    req.body = obj;
    next();
  } else {
    sendValidationError(res, validate);
  }
};

// This function validates data gotten from the user
// before creating a recipe.
export const validateRecipe = (req, res, next) => {
  const recipes = {
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: (req.body.ingredients),
    directions: req.body.directions,
    OwnerId: req.requestId,
  };
  validationHandler(recipes, validateRecipes, req, res, next);
};

// This function validates data gotten from the user
// before updating a recipe.
export const validateUpdate = (req, res, next) => {
  const recipes = {
    recipeName: req.body.recipeName || req.recipe.recipeName,
    category: req.body.category || req.recipe.category,
    ingredients: req.body.ingredients || req.recipe.ingredients,
    directions: req.body.directions || req.recipe.directions,
    OwnerId: req.requestId,
  };
  validationHandler(recipes, validateRecipes, req, res, next);
};

// This function validate recipe id.
export const idValidation = (req, res, next) => {
  const validate = validateId({ id: req.params.id || req.body.recipeId });
  if (validate.valid) {
    next();
  } else {
    sendValidationError(res, validate);
  }
};

// Create recipe
export const create = (req, res, next) => {
  Recipes.create(req.body)
    .then((recipe) => {
      req.idToFetchRecipe = recipe.dataValues.id;
      req.recipe = recipe;
      next();
    }).catch(() => {
      serverError(res);
    });
};

// fetch recipe from dbase and send back to the user
export const fetchRecipe = (req, res) => {
  Recipes.findOne({
    where: { id: req.idToFetchRecipe || req.params.id },
    attributes: ['id', 'recipeName',
      'category', 'ingredients',
      'directions', 'upVotes',
      'downVotes'],
    include: [
        { model: db.Users,
          as: 'Owner',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
      {
        model: db.RecipeReviews,
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
        include: [{
          model: db.Users, as: 'Reviewer',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        }],
      },
    ],
  }).then((recipe) => {
    if (recipe) {
      sendSuccess(res, 200, 'Recipe', recipe.dataValues);
    } else {
      sendFail(res, 404, 'recipe not found');
    }
  }).catch(() => {
    serverError(res);
  });
};

// fetch recipe votes
export const fetchVotes = (req, res) => {
  Recipes.findOne({
    where: { id: req.idToFetchRecipe || req.params.id },
    attributes: ['id', 'upVotes', 'downVotes'],
  }).then((recipe) => {
    sendSuccess(res, 200, 'Recipe', recipe.dataValues);
  }).catch(() => {
    serverError(res);
  });
};

// fetch all recipes from dbase and send it back to the user
export const fetchAllRecipe = (req, res) => {
  Recipes.findAll({
    attributes: ['id', 'recipeName',
      'category', 'ingredients',
      'directions', 'upVotes',
      'downVotes'
    ],
  }).then((recipe) => {
    sendSuccess(res, 200, 'Recipes', recipe);
  }).catch(() => {
    serverError(res);
  });
};

// fetch recipes by search query from dbase and send it back to the user
export const fetchAllBySearch = (req, res, next) => {
  if (req.query.search === undefined) return next();
  Recipes.findAll({
    limit: 10,
    where: {
      $or: [
        { recipeName: req.query.search },
        { category: req.query.search },
      ],
    },
    attributes: ['id', 'recipeName',
      'category', 'ingredients',
      'directions', 'upVotes',
      'downVotes'
    ],

  }).then((recipe) => {
    sendSuccess(res, 200, 'Recipes', recipe);
  }).catch(() => {
    serverError(res);
  });
};
// fetch recipes by upVotes in desending order and send it back to the user
export const fetchRecipeByUpVote = (req, res, next) => {
  if (req.query.sort === undefined) return next();
  Recipes.findAll({
    limit: 10,
    order: [['upVotes', 'DESC']],
    attributes: ['id', 'recipeName',
      'category', 'ingredients',
      'directions', 'upVotes',
      'downVotes'],
  }).then((recipes) => {
    sendSuccess(res, 200, 'Recipes', recipes);
  }).catch(() => {
    serverError(res);
  });
};

// fetch recipe from db before recipe update
export const fetchForUpdate = (req, res, next) => {
  Recipes.findOne({
    where: { id: req.params.id },
    attributes: ['recipeName',
      'category', 'ingredients',
      'directions'],

  }).then((recipe) => {
    if (recipe) {
      req.recipe = recipe;
      next();
    } else {
      sendFail(res, 404, 'recipe not found');
    }
  }).catch(() => {
    serverError(res);
  });
};

// This function delete a recipe from the recipe table
export const deleteRecipe = (req, res) => {
  Recipes.destroy({ where: { id: req.params.id } })
  .then(() => {
    sendSuccess(res, 200, 'success', {});
  });
};

// checking if a requesting id is the id that created the post
export const checkOwnship = (req, res, next) => {
  Recipes.findById(parseInt(req.params.id, 10))
    .then((recipe) => {
      if (!recipe) {
        sendFail(res, 404, 'Recipe not found');
        return;
      }
      recipe.getOwner()
        .then((user) => {
          if (user && user.id === req.requestId) {
            next();
          } else {
            sendFail(res, 404, 'Recipe not found for User');
          }
        });
    }).catch(() => {
      serverError(res);
    });
};

// checking if recipe exist in dbase
export const checkRecipe = (req, res, next) => {
  Recipes.findById(req.params.id || req.body.recipeId)
    .then((recips) => {
      if (recips) {
        next();
      } else {
        sendFail(res, 404, 'Recipe not found');
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
        return sendFail(res, 404, 'Recipe not found');
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
  Recipes.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [{
      model: db.RecipeReviews,
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: [{
        model: db.Users,
        as: 'Reviewer',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      }],
    }],
  })
  .then((recipeReviews) => {
    sendSuccess(res, 200, 'Recipe', recipeReviews);
  }).catch(() => {
    serverError(res);
  });
};

export const isRecipe = (req, res, next) => {
  Recipes.findById(req.params.id)
  .then((recipe) => {
    if (recipe) {
      next();
    } else {
      sendFail(res, 404, 'Recipe not found');
    }
  }).catch(() => {
    serverError(res);
  });
};

export const parse = (req, res, next) => {
  try {
    if (typeof req.body.ingredients === 'string') {
      req.body.ingredients = JSON.parse(req.body.ingredients);
    }
    try {
      if (typeof req.body.directions === 'string') {
        req.body.directions = JSON.parse(req.body.directions);
      }
    } catch (e) {
      sendFail(res, 400, 'directions must be an array of string');
    }
    next();
  } catch (e) {
    sendFail(res, 400, 'ingredients must be an array of string');
  }
};

export const update = (req, res, next) => {
  Recipes.update(req.body, { where: { id: req.params.id } })
  .then(() => {
    next();
  }).catch(() => {
    serverError(res);
  });
};

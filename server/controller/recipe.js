import db from '../models/index';
import { validateRecipes, validateId, validationHandler } from '../validators/validator';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';

const Recipes = db.Recipes;
const attributes = [
  'id',
  'name',
  'category',
  'image',
  'ingredients',
  'directions',
  'upVotes',
  'downVotes',
  'views'
];
const RECIPE_NOT_FOUND = 'Sorry, recipe was not found';

// This function validates data gotten from the user before creating a recipe.
export const validateRecipe = (req, res, next) => {
  const { name, category, ingredients, directions, image } = req.body;
  const recipes = {
    name,
    category,
    ingredients,
    directions,
    image,
    OwnerId: req.requestId,
  };
  validationHandler(recipes, validateRecipes, req, res, next);
};

// This function validates data gotten from the user before updating a recipe.
export const validateUpdate = (req, res, next) => {
  const recipes = {
    name: req.body.name || req.recipe.name,
    category: req.body.category || req.recipe.category,
    ingredients: req.body.ingredients || req.recipe.ingredients,
    directions: req.body.directions || req.recipe.directions,
    image: req.body.image || req.recipe.image,
    OwnerId: req.requestId,
  };
  validationHandler(recipes, validateRecipes, req, res, next);
};

// This function validate recipe id.
export const recipeIdValidation = (req, res, next) => {
  const validate = validateId({
    id: req.body.recipeId || req.params.id
  });
  if (validate.valid) {
    next();
  } else {
    sendValidationError(res, validate);
  }
};

export const create = (req, res, next) => {
  Recipes.create(req.body)
    .then((recipe) => {
      req.idToFetchRecipe = recipe.dataValues.id;
      req.recipe = recipe;
      next();
    }).catch((error) => {
      if (error.name === 'SequelizeUniqueConstraintError') {
        sendFail(res, 400, 'Sorry, recipe name already exist, please enter another');
        return;
      }
      serverError(res);
    });
};

export const fetchRecipe = (req, res) => {
  Recipes.findOne({
    where: {
      id: req.idToFetchRecipe || req.params.id
    },
    attributes,
    include: [
      {
        model: db.Users,
        as: 'Owner',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      }
    ],
  }).then((recipe) => {
    if (recipe) {
      if (req.hasNewViewer) {
        recipe.increment('views', {
          by: 1
        });
      }
      sendSuccess(res, 200, 'recipe', recipe.dataValues);
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
      id: req.idToFetchRecipe || req.params.id
    },
    attributes: ['id', 'upVotes', 'downVotes'],
  }).then((recipe) => {
    sendSuccess(res, 200, 'recipe', recipe.dataValues);
  }).catch(() => {
    serverError(res);
  });
};

export const fetchAllRecipe = (req, res) => {
  Recipes.findAll({
    attributes,
  }).then((recipe) => {
    sendSuccess(res, 200, 'recipes', recipe);
  }).catch(() => {
    serverError(res);
  });
};

export const fetchAllBySearch = (req, res, next) => {
  if (req.query.search === undefined) return next();
  Recipes.findAll({
    limit: 10,
    where: {
      $or: [
        {
          name: req.query.search
        },
        {
          category: req.query.search
        },
      ],
    },
    attributes,

  }).then((recipe) => {
    sendSuccess(res, 200, 'recipes', recipe);
  }).catch(() => {
    serverError(res);
  });
};
// fetch recipes by upVotes in desending order
export const fetchRecipeByUpVote = (req, res, next) => {
  if (req.query.sort === undefined) return next();
  Recipes.findAll({
    limit: 10,
    order: [['upVotes', 'DESC']],
    attributes,
  }).then((recipes) => {
    sendSuccess(res, 200, 'recipes', recipes);
  }).catch(() => {
    serverError(res);
  });
};

export const fetchForUpdate = (req, res, next) => {
  Recipes.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['name',
      'category', 'ingredients',
      'directions', 'image'],
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
  Recipes.findById(parseInt(req.params.id, 10))
    .then((recipe) => {
      if (!recipe) {
        sendFail(res, 404, RECIPE_NOT_FOUND);
        return;
      }
      recipe.getOwner()
        .then((user) => {
          if (user && user.id === req.requestId) {
            next();
          } else {
            sendFail(res, 404, RECIPE_NOT_FOUND);
          }
        });
    }).catch(() => {
      serverError(res);
    });
};

// checking if recipe exist in dbase
export const checkRecipe = (req, res, next) => {
  Recipes.findById(req.body.recipeId || req.params.id)
    .then((recipe) => {
      if (recipe) {
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
  Recipes.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [{
      model: db.RecipeReviews,
      attributes: {
        exclude: ['updatedAt'],
      },
      include: [{
        model: db.Users,
        as: 'Reviewer',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      }],
    }],
    order: [[{
      model: db.RecipeReviews
    }, 'id', 'DESC']],
  })
    .then((recipeReviews) => {
      sendSuccess(res, 200, 'recipe', recipeReviews);
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

import db from '../models/index';
import { validateRecipes, validateId } from '../validators/validator.js';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';

const Recipes = db.Recipes;
const log = console.log;

export const validateRecipe = (req, res, next) => {
  const recipes = {
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    UserId: req.requestId,
  };
  const validate = validateRecipes(recipes);
  if (validate.valid) {
    req.body = recipes;
    next();
  } else {
    console.log(validate.error);
    sendValidationError(res, validate);
  }
};
export const idValidation = (req, res, next) => {
  log('invalidate id');
  const validate = validateId({ id: req.params.id });
  if (validate.valid) {
    next();
  } else {
    console.log(validate.error);
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
      log(error);
      serverError(res);
    });
};
export const fetchRecipe = (req, res) => {
  Recipes.findOne({
    where: { id: req.idToFetchRecipe || req.body.id },
    attributes: ['id', 'recipeName',
               'category', 'ingredients',
               'directions', 'upVotes',
                'downVotes'],
    include: [
          { model: db.Users,
            attributes: {
              exclude: ['createdAt', 'updatedAt', 'password'],
            },
            },
    ],
  }).then(recipe => {
    if (recipe) {
      sendSuccess(res, 200, 'Recipes', recipe.dataValues);
    } else {
      sendFail(res, 404, 'recipe not found');
    }
  }).catch(error => {
    log(error);
    serverError(res);
  });
};
export const deleteRecipe = (req, res) => {
  Recipes.destroy({ where: { id: req.params.id } })
  .then((recipes) => {
    log(recipes);
    sendSuccess(res, 200, 'success', {});
  }).catch(error => {
    log(error);
    sendFail(res, 400, 'Delete was unsuccessful');
  });
};

// checking if a requesting id is the id that created the post
export const checkOwnship = (req, res, next) => {
  Recipes.findById(parseInt(req.params.id, 10))
    .then(recipe => {
      if (!recipe) {
        sendFail(res, 404, 'Recipe not found');
        return;
      }
      recipe.getUser()
        .then(user => {
          if (user && user.id === req.requestId) {
            next();
          } else {
            sendFail(res, 404, 'Recipe not found for User');
          }
        });
    }).catch(error => {
      log(error);
      serverError(res);
    });
};


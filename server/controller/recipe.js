import db from '../models/index';
import { validateRecipes } from '../validators/validator.js';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';

const Recipes = db.Recipes;
const log = console.log;

export const validateRecipe = (req, res, next) => {
  const recipes = {
    recipeName: req.body.recipeName,
    category: req.body.category,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
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
export const create = (req, res, next) => {
  Recipes.create(req.body)
    .then((recipe) => {
      req.idToFetchRecipe = recipe.dataValues.id;
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
               'directions', 'upVote',
                'downVote'],
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


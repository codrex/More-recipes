import {
  validateRecipes,
  validateId,
  validationHandler,
  validateRecipeIds
} from '../../validators/validator';

// This function validates data gotten from the user before creating a recipe.
export const validateRecipe = (req, res, next) => {
  const { name, category, ingredients, directions, image } = req.body;
  const recipes = {
    name,
    category,
    ingredients,
    directions,
    image,
    ownerId: req.requestId,
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
    ownerId: req.requestId,
  };
  validationHandler(recipes, validateRecipes, req, res, next);
};

// This function validate recipe id.
export const recipeIdValidation = (req, res, next) => {
  validationHandler({ id: req.body.recipeId || req.params.id }, validateId, req, res, next);
};

export const recipeIdsValidation = (req, res, next) => {
  const { ids } = req.query;
  const recipeIds = ids && ids.split(',');
  const isValid = validateRecipeIds({ recipeIds });
  if (!isValid.valid) {
    req.recipeIds = [];
    next();
    return;
  }
  req.recipeIds = recipeIds;
  next();
};

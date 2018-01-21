import {
  validateRecipes,
  validateRecipeId,
  validationHandler,
  validateRecipeIds
} from '../../utils/validators';

/**
 * @name validateRecipe
 * @description validates data gotten from the user before creating a recipe.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateRecipe = (req, res, next) => {
  const recipes = {
    ...req.body,
    ownerId: req.requestId,
  };
  validationHandler(recipes, validateRecipes, req, res, next);
};


/**
 * @name validateUpdate
 * @description validates data gotten from the user before updating a recipe.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
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

/**
 * @name recipeIdValidation
 * @description validates recipe id.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const recipeIdValidation = (req, res, next) => {
  validationHandler({
    id: req.body.recipeId || req.params.id
  },
  validateRecipeId, req, res, next
  );
};

/**
 * @name recipeIdsValidation
 * @description validates recipe ids.
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
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

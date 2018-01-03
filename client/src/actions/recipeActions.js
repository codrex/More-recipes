import ActionDispatcher from './actionDispatcher';
import { validateRecipe } from '../utils/validator';
import {
  NEW_RECIPE,
  MODIFIED_RECIPE,
  UPDATE_DIRECTIONS,
  UPDATE_RECIPE_NAME,
  UPDATE_CATEGORY,
  UPDATE_INGREDIENTS,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  AFTER_REVIEW,
  GOT_RECIPE,
  GET_TOP_RECIPES,
  AFTER_VOTE,
  TOGGLE_FAV,
  DELETE_RECIPE,
  RESET_RECIPE,
  RESET_RECIPES,
  FIND_RECIPES,
  RECIPE_VALIDATION_ERROR,
  CLEAR_VALIDATION_ERROR,
  UPDATE_RECIPE_IMAGE,
  GET_CREATED_RECIPES,
  GET_FAVOURITE_RECIPES,
  GET_REVIEWS
} from './actions';
import { LIMIT, REVIEW_LIMIT } from '../constants';

/**
 * @return {object} action
 * @param {object} payload
 */
export const newRecipe = payload => ({
  type: NEW_RECIPE, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const modifiedRecipe = payload => ({
  type: MODIFIED_RECIPE, payload
});

/**
 * @return {object} action
 */
export const resetRecipe = () => ({
  type: RESET_RECIPE
});

/**
 * @return {object} action
 */
export const resetRecipes = () => ({
  type: RESET_RECIPES
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotTopRecipes = payload => ({
  type: GET_TOP_RECIPES, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotFavouriteRecipes = payload => ({
  type: GET_FAVOURITE_RECIPES, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotCreatedRecipes = payload => ({
  type: GET_CREATED_RECIPES, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotReviews = payload => ({
  type: GET_REVIEWS, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const afterDeleteRecipe = payload => ({
  type: DELETE_RECIPE, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const afterReview = payload => ({
  type: AFTER_REVIEW, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const afterVote = payload => ({
  type: AFTER_VOTE, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const afterToggleFav = payload => ({
  type: TOGGLE_FAV, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotAllRecipes = payload => ({
  type: GET_ALL_RECIPES, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotRecipe = payload => ({
  type: GOT_RECIPE, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotFindRecipe = payload => ({
  type: FIND_RECIPES, payload
});

/**
 * @return {object} action
 * @param {string} ingredient
 */
export const updateIngredients = ingredient => ({
  type: UPDATE_INGREDIENTS,
  ingredient
});

/**
 * @return {object} action
 * @param {object} image
 */
export const updateImage = image => ({
  type: UPDATE_RECIPE_IMAGE,
  image
});

/**
 * @return {object} action
 * @param {string} direction
 */
export const updateDirections = direction => ({
  type: UPDATE_DIRECTIONS,
  direction
});

/**
 * @return {object} action
 * @param {string} category
 */
export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
});

/**
 * @return {object} action
 * @param {string} name
 */
export const updateName = name => ({
  type: UPDATE_RECIPE_NAME,
  name
});

/**
 * @return {object} action
 * @param {object} recipe
 */
export const updateAllRecipeField = recipe => ({
  type: UPDATE_ALL_RECIPE_FIELD,
  recipe
});

/**
 * @return {object} action
 * @param {object|array} error
 */
export const recipeValidationError = error => ({
  type: RECIPE_VALIDATION_ERROR,
  error
});

/**
 * @return {object} action
 * @param {string} error
 */
export const clearValidationError = error => ({
  type: CLEAR_VALIDATION_ERROR,
  error
});


/**
 * @return {array | undefined} error
 * @param {object} recipe
 * @param {object} dispatch
 */
const dispatchValidatioError = (recipe, dispatch) => {
  const error = validateRecipe(recipe);
  const hasError = error.category || error.directions || error.ingredients || error.name;
  if (hasError) {
    return dispatch(recipeValidationError(error));
  }
  return undefined;
};

// thunks
/**
 * @return {promise} request
 * @param {object} recipe
 * @param {string} message
 */
export const createRecipe = (recipe, message) => (dispatch) => {
  if (dispatchValidatioError(recipe, dispatch)) {
    return;
  }

  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/recipes',
    recipe,
    newRecipe,
    'post',
    message
  );
};

/**
 * @return {promise} request
 * @param {object} recipe
 * @param {string} message
 */
export const modifyRecipe = (recipe, message) => (dispatch) => {
  if (dispatchValidatioError(recipe, dispatch)) {
    return;
  }

  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipe.id}`,
    recipe,
    modifiedRecipe,
    'put',
    message
  );
};

/**
 * @return {promise} request
 * @param {number} page
 */
export const getAllRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?limit=${LIMIT}&page=${page}`,
    null,
    gotAllRecipes,
    'get'
  );
};

/**
 * @return {promise} request
 * @param {number} page
 */
export const getTopRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?sort=upvotes&order=ascending&limit=${LIMIT}&page=${page}`,
    null,
    gotTopRecipes,
    'get'
  );
};

/**
 * @return {promise} request
 * @param {number} page
 */
export const getFavouriteRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(
    `/api/v1/users/${id}/recipes/favourite?limit=${LIMIT}&page=${page}`,
    null,
    gotFavouriteRecipes,
    'get'
  );
};

/**
 * @return {promise} request
 * @param {number} page
 */
export const getCreatedRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(
    `/api/v1/users/${id}/recipes/created?&limit=${LIMIT}&page=${page}`,
    null,
    gotCreatedRecipes,
    'get'
  );
};

/**
 * @return {promise} request
 * @param {number} recipeId
 * @param {number} page
 */
export const getReviews = (recipeId, page) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipeId}/reviews?&limit=${REVIEW_LIMIT}&page=${page}`,
    null,
    gotReviews,
    'get'
  );
};

/**
 * @return {promise} request
 * @param {number} recipeId
 */
export const getRecipe = recipeId => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipeId}`,
    null,
    gotRecipe,
    'get'
  );
};

/**
 * @return {promise} request
 * @param {number} recipeId
 * @param {string} review
 * @param {string} message
 */
export const postReview = (recipeId, review, message) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipeId}/reviews?limit=${REVIEW_LIMIT}`,
    review,
    afterReview,
    'post',
    message
  );
};

/**
 * @return {promise} request
 * @param {number} recipeId
 * @param {string} voteType
 * @param {string} status
 * @param {string} message
 */
export const vote = (recipeId, voteType, status, message) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipeId}/vote?${voteType}=${status}`,
    null,
    afterVote,
    'put',
    message
  );
};

/**
 * @return {promise} request
 * @param {number} recipeId
 * @param {string} message
 */
export const toggleFav = (recipeId, message = undefined) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/recipe',
    {
      recipeId
    },
    afterToggleFav,
    'post',
    message
  );
};

/**
 * @return {promise} request
 * @param {number} recipeId
 * @param {number} index
 */
export const deleteRecipe = (recipeId, index) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  // this function adds the index deleted recipe to the action
  const HOActionCreator = (payload) => {
    const action = afterDeleteRecipe(payload);
    action.recipeIndex = index;
    return action;
  };

  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipeId}`,
    null,
    HOActionCreator,
    'delete'
  );
};

/**
 * @return {promise} request
 * @param {string} searchTerm
 * @param {string} message
 */
export const findRecipes = (searchTerm, message = undefined) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?search=${searchTerm}&limit=${LIMIT}&page=1`,
    null,
    gotFindRecipe,
    'get',
    message
  );
};

import ActionDispatcher from './actionDispatcher';
import { validateRecipe } from '../utils/validator';
import {
  NEW_RECIPE,
  MODIFIED_RECIPE,
  UPDATE_DIRECTIONS,
  UPDATE_RECIPE_NAME,
  UPDATE_CATEGORY,
  UPDATE_INGREDIENTS,
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
 * fired when create recipe request is successful
 * @return {object} action
 * @param {object} payload
 */
export const newRecipe = payload => ({
  type: NEW_RECIPE, payload
});

/**
 * fired when modify recipe request is successful
 * @return {object} action
 * @param {object} payload
 */
export const modifiedRecipe = payload => ({
  type: MODIFIED_RECIPE, payload
});

/**
 * reset recipe object in the store to its initial state
 * @return {object} action
 */
export const resetRecipe = () => ({
  type: RESET_RECIPE
});

/**
 * reset recipes array in the store to its initial state
 * @return {object} action
 */
export const resetRecipes = () => ({
  type: RESET_RECIPES
});

/**
 * fired when get top recipes request is successful
 * @return {object} action
 * @param {object} payload
 */
export const gotTopRecipes = payload => ({
  type: GET_TOP_RECIPES, payload
});

/**
 * fired when get favourite recipes request is successful
 * @return {object} action
 * @param {object} payload
 */
export const gotFavouriteRecipes = payload => ({
  type: GET_FAVOURITE_RECIPES, payload
});

/**
 * fired when get created recipes request is successful
 * @return {object} action
 * @param {object} payload
 */
export const gotCreatedRecipes = payload => ({
  type: GET_CREATED_RECIPES, payload
});

/**
 * fired when get recipe reviews request is successful
 * @return {object} action
 * @param {object} payload
 */
export const gotReviews = payload => ({
  type: GET_REVIEWS, payload
});

/**
 * fired after a successful delete request
 * @return {object} action
 * @param {object} payload
 */
export const afterDeleteRecipe = payload => ({
  type: DELETE_RECIPE, payload
});

/**
 * fired after a review is successful
 * @return {object} action
 * @param {object} payload
 */
export const afterReview = payload => ({
  type: AFTER_REVIEW, payload
});

/**
 * fired after a successful vote request
 * @return {object} action
 * @param {object} payload
 */
export const afterVote = payload => ({
  type: AFTER_VOTE, payload
});

/**
 * fired after add or remove from favourite request is successful
 * @return {object} action
 * @param {object} payload
 */
export const afterToggleFav = payload => ({
  type: TOGGLE_FAV, payload
});

/**
 * fired when get all recipes request is successful
 * @return {object} action
 * @param {object} payload
 */
export const gotAllRecipes = payload => ({
  type: GET_ALL_RECIPES, payload
});

/**
 * fired after a get recipe request is successful
 * @return {object} action
 * @param {object} payload
 */
export const gotRecipe = payload => ({
  type: GOT_RECIPE, payload
});

/**
 * fired after a successful recipes search request
 * @return {object} action
 * @param {object} payload
 */
export const gotFindRecipe = payload => ({
  type: FIND_RECIPES, payload
});

/**
 * updates ingredient in the store. fired when filling add or modify recipe form
 * @return {object} action
 * @param {string} ingredient
 */
export const updateIngredients = ingredient => ({
  type: UPDATE_INGREDIENTS,
  ingredient
});

/**
 * update image object in the store. fired when filling
 * add or modify recipe form
 * @return {object} action
 * @param {object} image
 */
export const updateImage = image => ({
  type: UPDATE_RECIPE_IMAGE,
  image
});

/**
 * update direction object in the store. fired when
 * filling add or modify recipe form
 * @return {object} action
 * @param {string} direction
 */
export const updateDirections = direction => ({
  type: UPDATE_DIRECTIONS,
  direction
});

/**
 * update category object in the store. fired when filling add
 * or modify recipe form
 * @return {object} action
 * @param {string} category
 */
export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
});

/**
 * update recipe name object in the store.
 * fired when filling add or modify recipe form
 * @return {object} action
 * @param {string} name
 */
export const updateName = name => ({
  type: UPDATE_RECIPE_NAME,
  name
});

/**
 * logs form validation error in the store.
 * @return {object} action
 * @param {object|array} error
 */
export const recipeValidationError = error => ({
  type: RECIPE_VALIDATION_ERROR,
  error
});

/**
 * clear recipe validation error in the store
 * @return {object} action
 * @param {string} error
 */
export const clearValidationError = error => ({
  type: CLEAR_VALIDATION_ERROR,
  error
});


/**
 * dispatch recipe validation error if any
 * @return {array | undefined} error
 * @param {object} recipe
 * @param {object} dispatch
 */
const dispatchValidatioError = (recipe, dispatch) => {
  const error = validateRecipe(recipe);
  const hasError = (
    error.category
    || error.directions
    || error.ingredients
    || error.name
  );
  if (hasError) {
    return dispatch(recipeValidationError(error));
  }
  return undefined;
};

// thunks
/**
 * send create recipe ajax request
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
 * send modify recipe ajax request
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
 * get random recipes from the server
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
 * get recipes with the most upvote
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
 * get user's favourite recipes
 * @return {promise} request
 * @param {number} page
 */
export const getFavouriteRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/users/recipes/favourite?limit=${LIMIT}&page=${page}`,
    null,
    gotFavouriteRecipes,
    'get'
  );
};

/**
 * get user's created recipes
 * @return {promise} request
 * @param {number} page
 */
export const getCreatedRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/users/recipes/created?&limit=${LIMIT}&page=${page}`,
    null,
    gotCreatedRecipes,
    'get'
  );
};

/**
 * gets recipe reviews
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
 * gets a single recipe from the server based on the provided recipe ID
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
 * post reviews on a particular recipe
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
 * allows a user to either upvote or downvote a recipe
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
 * sends add to favourite or remove from favourite request
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
 * sends delete request to the server
 * @return {promise} request
 * @param {number} recipeId
 * @param {number} index
 */
export const deleteRecipe = (recipeId, index) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  // this function adds the index of the deleted recipe to the action
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
 * sends a search recipe request
 * @return {promise} request
 * @param {string} searchTerm
 * @param {number} page
 * @param {string} message
 */
export const findRecipes = (
  searchTerm,
  page,
  message = undefined
) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?search=${searchTerm}&limit=${LIMIT}&page=${page}`,
    null,
    gotFindRecipe,
    'get',
    message
  );
};

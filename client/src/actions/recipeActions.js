import ActionDispatcher from './actionDispatcher';
import { validateRecipe } from '../utils/validator/validator';
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
  RECIPE_TO_MODIFY,
  DELETE_RECIPE,
  ABOUT_TO_CREATE_RECIPE,
  FIND_RECIPES,
  RECIPE_VALIDATION_ERROR,
  CLEAR_VALIDATION_ERROR,
  UPDATE_RECIPE_IMAGE,
  GET_CREATED_RECIPES,
  GET_FAVOURITE_RECIPES,
  GET_REVIEWS
} from './actions';
import { LIMIT, REVIEW_LIMIT } from '../constants/constants';

export const newRecipe = payload => ({
  type: NEW_RECIPE, payload
});
export const modifiedRecipe = payload => ({
  type: MODIFIED_RECIPE, payload
});
export const recipeToModify = recipe => ({
  type: RECIPE_TO_MODIFY, recipe
});
export const aboutToCreateRecipe = () => ({
  type: ABOUT_TO_CREATE_RECIPE
});
export const gotTopRecipes = payload => ({
  type: GET_TOP_RECIPES, payload
});
export const gotFavouriteRecipes = payload => ({
  type: GET_FAVOURITE_RECIPES, payload
});
export const gotCreatedRecipes = payload => ({
  type: GET_CREATED_RECIPES, payload
});
export const gotReviews = payload => ({
  type: GET_REVIEWS, payload
});

export const afterDeleteRecipe = payload => ({
  type: DELETE_RECIPE, payload
});
export const afterReview = payload => ({
  type: AFTER_REVIEW, payload
});
export const afterVote = payload => ({
  type: AFTER_VOTE, payload
});
export const afterToggleFav = payload => ({
  type: TOGGLE_FAV, payload
});
export const gotAllRecipes = payload => ({
  type: GET_ALL_RECIPES, payload
});
export const gotRecipe = payload => ({
  type: GOT_RECIPE, payload
});
export const gotFindRecipe = payload => ({
  type: FIND_RECIPES, payload
});
export const updateIngredients = ingredient => ({
  type: UPDATE_INGREDIENTS,
  ingredient
});
export const updateImage = image => ({
  type: UPDATE_RECIPE_IMAGE,
  image
});
export const updateDirections = direction => ({
  type: UPDATE_DIRECTIONS,
  direction
});
export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  category
});
export const updateName = name => ({
  type: UPDATE_RECIPE_NAME,
  name
});
export const updateAllRecipeField = recipe => ({
  type: UPDATE_ALL_RECIPE_FIELD,
  recipe
});

export const recipeValidationError = error => ({
  type: RECIPE_VALIDATION_ERROR,
  error
});

export const clearValidationError = error => ({
  type: CLEAR_VALIDATION_ERROR,
  error
});


const dispatchValidatioError = (recipe, dispatch) => {
  const error = validateRecipe(recipe);
  const hasError = error.category || error.directions || error.ingredients || error.name;
  if (hasError) {
    return dispatch(recipeValidationError(error));
  }
  return undefined;
};

// thunks
export const createRecipe = (recipe, msg) => (dispatch) => {
  if (dispatchValidatioError(recipe, dispatch)) {
    return;
  }

  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/recipes',
    recipe,
    newRecipe,
    'post',
    msg
  );
};

export const modifyRecipe = (recipe, msg) => (dispatch) => {
  if (dispatchValidatioError(recipe, dispatch)) {
    return;
  }

  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipe.id}`,
    recipe,
    modifiedRecipe,
    'put',
    msg
  );
};

export const getAllRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?limit=${LIMIT}&page=${page}`,
    null,
    gotAllRecipes,
    'get'
  );
};

export const getTopRecipes = page => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?sort=upvotes&order=ascending&limit=${LIMIT}&page=${page}`,
    null,
    gotTopRecipes,
    'get'
  );
};

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

export const getReviews = (recipeId, page) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipeId}/reviews?&limit=${REVIEW_LIMIT}&page=${page}`,
    null,
    gotReviews,
    'get'
  );
};

export const getRecipe = id => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}`,
    null,
    gotRecipe,
    'get'
  );
};

export const postReview = (id, review, msg) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}/reviews?limit=${REVIEW_LIMIT}`,
    review,
    afterReview,
    'post',
    msg
  );
};

export const vote = (id, voteType, status) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}/vote?${voteType}=${status}`,
    null,
    afterVote,
    'put'
  );
};

export const toggleFav = (recipeId, msg = undefined) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/recipe',
    {
      recipeId
    },
    afterToggleFav,
    'post',
    msg
  );
};

export const deleteRecipe = (id, index) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  // this function adds the index deleted recipe to the action
  const HOActionCreator = (payload) => {
    const action = afterDeleteRecipe(payload);
    action.recipeIndex = index;
    return action;
  };

  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}`,
    null,
    HOActionCreator,
    'delete'
  );
};

export const findRecipes = (searchTerm, msg = undefined) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes?search=${searchTerm}&limit=${LIMIT}&page=1`,
    null,
    gotFindRecipe,
    'get',
    msg
  );
};

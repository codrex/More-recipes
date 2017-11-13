import ActionDispatcher from './actionDispatcher';
import {
  NEW_RECIPE,
  MODIFIED_RECIPE,
  UPDATE_DIRECTIONS,
  UPDATE_NAME_CATEGORY,
  UPDATE_INGREDIENTS,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  AFTER_REVIEW,
  GET_RECIPE,
  GET_TOP_RECIPES,
  AFTER_VOTE,
  TOGGLE_FAV,
  RECIPE_TO_MODIFY,
  CURRENT_RECIPE,
  DELETE_RECIPE,
  CREATE_NEW_RECIPE,
  FIND_RECIPES
} from './actions';

export const newRecipe = payload => ({ type: NEW_RECIPE, payload });
export const modifiedRecipe = payload => ({ type: MODIFIED_RECIPE, payload });
// export const setCurrentRecipe = recipe => ({ type: CURRENT_RECIPE, recipe });
export const recipeToModify = recipe => ({ type: RECIPE_TO_MODIFY, recipe });
export const createNewRecipe = () => ({ type: CREATE_NEW_RECIPE });
export const gotTopRecipes = payload => ({ type: GET_TOP_RECIPES, payload });
export const afterDeleteRecipe = payload => ({ type: DELETE_RECIPE, payload });
export const afterReview = payload => ({ type: AFTER_REVIEW, payload });
export const afterVote = payload => ({ type: AFTER_VOTE, payload });
export const afterToggleFav = payload => ({ type: TOGGLE_FAV, payload });
export const gotAllRecipes = payload => ({ type: GET_ALL_RECIPES, payload });
export const gotRecipe = payload => ({ type: GET_RECIPE, payload });
export const gotFindRecipe = payload => ({ type: FIND_RECIPES, payload });
export const updateIngredients = ingredient => ({
  type: UPDATE_INGREDIENTS,
  ingredient
});
export const updateDirections = direction => ({
  type: UPDATE_DIRECTIONS,
  direction
});
export const updateNameCategory = nameAndCategory => ({
  type: UPDATE_NAME_CATEGORY,
  nameAndCategory
});
export const updateAllRecipeField = all => ({
  type: UPDATE_ALL_RECIPE_FIELD,
  all
});

// thunks
export const createRecipe = (recipe, msg) => (dispatch) => {
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
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipe.id}`,
    recipe,
    modifiedRecipe,
    'put',
    msg
  );
};

export const getAllRecipes = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch('/api/v1/recipes', null, gotAllRecipes, 'get');
};

export const getTopRecipes = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/recipes?sort=upvotes&order=ascending',
    null,
    gotTopRecipes,
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
    `/api/v1/recipes/${id}/reviews`,
    review,
    afterReview,
    'post',
    msg
  );
};

export const vote = (id, voteType) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}/vote?vote=${voteType}vote`,
    null,
    afterVote,
    'put'
  );
};

export const toggleFav = (recipeId, msg = undefined) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(
    `/api/v1/users/${id}/recipe`,
    { recipeId },
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
    `/api/v1/recipes?search=${searchTerm}`,
    null,
    gotFindRecipe,
    'get',
    msg
  );
};

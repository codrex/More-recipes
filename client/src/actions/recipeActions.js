import ActionDispatcher from './actionDispatcher';
import {
  RECIPE,
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
  ON_NEW_RECIPE,
  FIND_RECIPES
} from './actions';

export const createOrModifyRecipe = recipe => ({ type: RECIPE, recipe });
export const setCurrentRecipe = recipe => ({ type: CURRENT_RECIPE, recipe });
export const updateIngredients = ingredient => ({
  type: UPDATE_INGREDIENTS,
  ingredient
});
export const updateDirections = direction => ({
  type: UPDATE_DIRECTIONS,
  direction
});
export const updateNameCategory = nameAndCat => ({
  type: UPDATE_NAME_CATEGORY,
  nameAndCat
});
export const updateAllRecipeField = all => ({
  type: UPDATE_ALL_RECIPE_FIELD,
  all
});
export const recipeToModify = recipe => ({ type: RECIPE_TO_MODIFY, recipe });
export const onNewRecipe = () => ({ type: ON_NEW_RECIPE });
export const gotTopRecipes = recipes => ({ type: GET_TOP_RECIPES, recipes });

const afterDeleteRecipe = payload => ({ type: DELETE_RECIPE, payload });
const afterReview = recipe => ({ type: AFTER_REVIEW, recipe });
const afterVote = recipe => ({ type: AFTER_VOTE, recipe });
const afterToggleFav = payload => ({ type: TOGGLE_FAV, payload });
const gotAllRecipes = recipes => ({ type: GET_ALL_RECIPES, recipes });
const gotRecipe = recipe => ({ type: GET_RECIPE, recipe });
const gotFindRecipe = recipes => ({ type: FIND_RECIPES, recipes });

export const createRecipe = (recipe, msg) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    '/api/v1/recipes',
    recipe,
    createOrModifyRecipe,
    'post',
    msg
  );
};

export const modifyRecipe = (recipe, msg) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    `/api/v1/recipes/${recipe.id}`,
    recipe,
    createOrModifyRecipe,
    'put',
    msg
  );
};

export const getAllRecipes = () => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/recipes', null, gotAllRecipes, 'get');
};

export const getTopRecipes = () => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    '/api/v1/recipes?sort=upvotes&order=ascending',
    null,
    gotAllRecipes,
    'get'
  );
};

export const getRecipe = id => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}`,
    null,
    gotRecipe,
    'get'
  );
};

export const postReview = (id, review, msg) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}/reviews`,
    review,
    afterReview,
    'post',
    msg
  );
};

export const vote = (id, voteType) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}/vote?vote=${voteType}vote`,
    null,
    afterVote,
    'put'
  );
};

export const toggleFav = (recipeId, msg = undefined) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(
    `/api/v1/users/${id}/recipe`,
    { recipeId },
    afterToggleFav,
    'post',
    msg
  );
};

export const deleteRecipe = (id, index) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  // this function adds the index deleted recipe to the action
  const HOActionCreator = (payload) => {
    const action = afterDeleteRecipe(payload);
    action.recipeIndex = index;
    return action;
  };

  dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}`,
    null,
    HOActionCreator,
    'delete'
  );
};

export const findRecipes = (searchTerm, msg = undefined) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    `/api/v1/recipes?search=${searchTerm}`,
    null,
    gotFindRecipe,
    'get',
    msg
  );
};

import { RECIPE, UPDATE_DIRECTIONS,
          UPDATE_NAME_CATEGORY, UPDATE_INGREDIENTS,
          UPDATE_ALL_RECIPE_FIELD, GET_ALL_RECIPES,
          GET_FAV_RECIPES, AFTER_REVIEW,
          GET_RECIPE, GET_TOP_RECIPES, AFTER_VOTE, ADD_TO_FAV } from './actions';
import ActionDispatcher from './actionDispatcher';


export const createOrModifyRecipe = recipe => ({ type: RECIPE, recipe });

export const updateIngredients = ingredient => ({ type: UPDATE_INGREDIENTS, ingredient });
export const updateDirections = direction => ({ type: UPDATE_DIRECTIONS, direction });
export const updateNameCategory = (nameAndCat) => ({ type: UPDATE_NAME_CATEGORY, nameAndCat });
export const updateAllRecipeField = (all) => ({ type: UPDATE_ALL_RECIPE_FIELD, all });

export const afterReview = (recipe) => ({ type: AFTER_REVIEW, recipe });
export const afterVote = (recipe) => ({ type: AFTER_VOTE, recipe });
export const afterAddToFav = (recipe) => ({ type: ADD_TO_FAV, recipe });


export const gotAllRecipes = (recipes) => ({ type: GET_ALL_RECIPES, recipes });
export const gotTopRecipes = (recipes) => ({ type: GET_TOP_RECIPES, recipes });
export const gotFavRecipes = (recipes) => ({ type: GET_FAV_RECIPES, recipes });
export const gotRecipe = (recipe) => ({ type: GET_RECIPE, recipe });

export const createRecipe = recipe => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/recipes', recipe, createOrModifyRecipe, 'post');
};

export const modifyRecipe = recipe => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher
    .requestAndDispatch(`/api/v1/recipes/${recipe.id}`, recipe, createOrModifyRecipe, 'put');
};

export const getAllRecipes = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/recipes', null, gotAllRecipes, 'get');
};

export const getFavRecipes = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(`/api/v1/users/${id}/recipes`, null, gotFavRecipes, 'get');
};

export const getTopRecipes = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher
  .requestAndDispatch('/api/v1/recipes?sort=upvotes&order=ascending', null, gotAllRecipes, 'get');
};

export const getRecipe = (id) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(`/api/v1/recipes/${id}`, null, gotRecipe, 'get');
};

export const postReview = (id, review) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher
  .requestAndDispatch(`/api/v1/recipes/${id}/reviews`, review, afterReview, 'post');
};

export const vote = (id, voteType) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher
  .requestAndDispatch(`/api/v1/recipes/${id}/vote?vote=${voteType}vote`, null, afterVote, 'put');
};

export const addToFav = (recipeId) => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(`/api/v1/users/${id}/recipe`, recipeId, afterAddToFav, 'post');
};

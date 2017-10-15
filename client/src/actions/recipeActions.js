import {
  RECIPE,
  UPDATE_DIRECTIONS,
  UPDATE_NAME_CATEGORY,
  UPDATE_INGREDIENTS,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  GET_FAV_RECIPES,
  AFTER_REVIEW,
  GET_RECIPE,
  GET_TOP_RECIPES,
  AFTER_VOTE,
  TOGGLE_FAV,
  RECIPE_TO_MODIFY,
  CURRENT_RECIPE,
  DELETE_RECIPE,
  ON_NEW_RECIPE
} from './actions';
import ActionDispatcher from './actionDispatcher';

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

const afterDeleteRecipe = userRecipes => ({ type: DELETE_RECIPE, userRecipes });
const afterReview = recipe => ({ type: AFTER_REVIEW, recipe });
const afterVote = recipe => ({ type: AFTER_VOTE, recipe });
const afterToggleFav = user => ({ type: TOGGLE_FAV, user });
const gotAllRecipes = recipes => ({ type: GET_ALL_RECIPES, recipes });
const gotFavRecipes = recipes => ({ type: GET_FAV_RECIPES, recipes });
const gotRecipe = recipe => ({ type: GET_RECIPE, recipe });

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

export const getFavRecipes = () => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(
    `/api/v1/users/${id}/recipes`,
    null,
    gotFavRecipes,
    'get'
  );
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

export const postReview = (id, review) => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch(
    `/api/v1/recipes/${id}/reviews`,
    review,
    afterReview,
    'post'
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
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(
    `/api/v1/users/${id}/recipe`,
    recipeId,
    afterToggleFav,
    'post',
    msg
  );
};

export const deleteRecipe = id => dispatch => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher
    .requestAndDispatch(`/api/v1/recipes/${id}`, null, null, 'delete')
    .then(() => {
      const userId = dispatcher.getIdFromToken();
      dispatcher.requestAndDispatch(
        `/api/v1/users/${userId}/recipes`,
        null,
        afterDeleteRecipe,
        'get'
      );
    });
};

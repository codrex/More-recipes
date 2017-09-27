import { RECIPE, UPDATE_DIRECTIONS,
  UPDATE_NAME_CATEGORY, UPDATE_INGREDIENTS } from './actions';
import ActionDispatcher from './actionDispatcher';

export const createOrModifyRecipe = recipe => ({ type: RECIPE, recipe });

export const updateIngredients = ingredient => ({ type: UPDATE_INGREDIENTS, ingredient });

export const updateDirections = direction => ({ type: UPDATE_DIRECTIONS, direction });

export const updateNameCategory = (nameAndCat) => ({ type: UPDATE_NAME_CATEGORY, nameAndCat });

export const createRecipe = recipe => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.postAndDispatch('/api/v1/recipes', recipe, createOrModifyRecipe);
};

// export const userSignup = user => (dispatch) => {
//   const dispatcher = new ActionDispatcher(dispatch);
//   dispatcher.postAndDispatch('/api/v1/users/signup', user, userAction);
// };

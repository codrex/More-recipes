import { RECIPE } from './actions';
import ActionDispatcher from './actionDispatcher';

export const createOrModifyRecipe = recipe => ({ type: RECIPE, recipe });

export const createRecipe = recipe => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.postAndDispatch('/api/v1/recipes', recipe, createOrModifyRecipe);
};

// export const userSignup = user => (dispatch) => {
//   const dispatcher = new ActionDispatcher(dispatch);
//   dispatcher.postAndDispatch('/api/v1/users/signup', user, userAction);
// };

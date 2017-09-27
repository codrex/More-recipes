import { RECIPE } from '../actions/actions';

export const createOrModifyRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE:
      return action.recipe;
    default:
      return state;
  }
};

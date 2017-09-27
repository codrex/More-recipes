import { RECIPE, UPDATE_DIRECTIONS,
         UPDATE_INGREDIENTS, UPDATE_NAME_CATEGORY } from '../actions/actions';
import initialState from '../reducers/initialState';

export const createOrModifyRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE:
      return action.recipe;
    default:
      return state;
  }
};

export const newRecipeReducer = (state = initialState.newRecipe, action) => {
  const copyOfState = Object.assign({}, state);
  switch (action.type) {
    case UPDATE_INGREDIENTS:
      copyOfState.ingredients = action.ingredient;
      return copyOfState;
    case UPDATE_DIRECTIONS:
      copyOfState.directions = action.direction;
      return copyOfState;
    case UPDATE_NAME_CATEGORY:
      copyOfState.recipeName = action.nameAndCat.recipeName;
      copyOfState.category = action.nameAndCat.category;
      return copyOfState;
    default:
      return state;
  }
};

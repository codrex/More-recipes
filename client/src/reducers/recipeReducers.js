import { RECIPE, UPDATE_DIRECTIONS,
         UPDATE_INGREDIENTS, UPDATE_NAME_CATEGORY,
         UPDATE_ALL_RECIPE_FIELD } from '../actions/actions';
import initialState from '../reducers/initialState';

export const createOrModifyRecipeReducer = (state = {}, action) => {
  switch (action.type) {
    case RECIPE:
      return action.recipe.Recipe;
    default:
      return state;
  }
};

export const newRecipeReducer = (state = initialState.newRecipe, action) => {
  const copyOfState = Object.assign({}, state);
  switch (action.type) {
    case UPDATE_INGREDIENTS:
      copyOfState.ingredients = action.ingredient;
      console.log(copyOfState, 'iiiiii');
      return copyOfState;
    case UPDATE_DIRECTIONS:
      copyOfState.directions = action.direction;
      return copyOfState;
    case UPDATE_NAME_CATEGORY:
      copyOfState.recipeName = action.nameAndCat.recipeName;
      copyOfState.category = action.nameAndCat.category;
      return copyOfState;
    case UPDATE_ALL_RECIPE_FIELD:
      copyOfState.recipeName = action.all.recipeName;
      copyOfState.category = action.all.category;
      copyOfState.ingredients = action.all.ingredients;
      copyOfState.directions = action.all.directions;
      copyOfState.id = action.all.id;
      console.log(copyOfState);
      return copyOfState;
    default:
      return state;
  }
};

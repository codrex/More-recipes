import { RECIPE, UPDATE_DIRECTIONS,
         UPDATE_INGREDIENTS, UPDATE_NAME_CATEGORY,
         UPDATE_ALL_RECIPE_FIELD, GET_ALL_RECIPES,
        GET_FAV_RECIPES, GET_TOP_RECIPES } from '../actions/actions';
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
      return copyOfState;
    default:
      return state;
  }
};

export const recipesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return action.recipes.Recipes;
    case GET_FAV_RECIPES:
      return action.recipes.User.favRecipes;
    case GET_TOP_RECIPES:
      return action.recipes.Recipes;
    default:
      return state;
  }
};


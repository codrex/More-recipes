import initialState from '../reducers/initialState';
import {
  RECIPE,
  UPDATE_DIRECTIONS,
  UPDATE_INGREDIENTS,
  UPDATE_NAME_CATEGORY,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  GET_TOP_RECIPES,
  GET_RECIPE,
  AFTER_REVIEW,
  AFTER_VOTE,
  RECIPE_TO_MODIFY,
  CURRENT_RECIPE,
  ON_NEW_RECIPE,
  FIND_RECIPES
} from '../actions/actions';

export const recipesReducer = (state = initialState.Recipes, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return action.recipes.Recipes;
    case GET_TOP_RECIPES:
      return action.recipes.Recipes;
    case FIND_RECIPES:
      return action.recipes.Recipes;
    default:
      return state;
  }
};

export const recipeReducer = (state = initialState.Recipe, action) => {
  if (action.type === GET_RECIPE) {
    return action.recipe.Recipe;
  }
  if (action.type === AFTER_REVIEW) {
    const RecipeReviews = action.recipe.Recipe.RecipeReviews;
    return { ...state,
      RecipeReviews
    };
  }
  if (action.type === AFTER_VOTE) {
    const upVotes = action.recipe.Recipe.upVotes;
    const downVotes = action.recipe.Recipe.downVotes;
    return { ...state,
      upVotes,
      downVotes
    };
  }
  if (action.type === CURRENT_RECIPE) {
    return action.recipe;
  }
  if (action.type === RECIPE) {
    return action.recipe.Recipe;
  }
  if (action.type === RECIPE_TO_MODIFY) {
    return action.recipe;
  }
  if (action.type === UPDATE_INGREDIENTS) {
    const ingredients = action.ingredient;
    return { ...state,
      ingredients
    };
  }
  if (action.type === UPDATE_DIRECTIONS) {
    const directions = action.direction;
    return { ...state,
      directions
    };
  }
  if (action.type === UPDATE_NAME_CATEGORY) {
    const nameAndCat = action.nameAndCat;
    return { ...state,
      ...nameAndCat
    };
  }
  if (action.type === UPDATE_ALL_RECIPE_FIELD) {
    return { ...state,
      ...action.all
    };
  }
  if (action.type === ON_NEW_RECIPE) {
    return initialState.Recipe;
  }
  return state;
};

import initialState from '../reducers/initialState';
import {
  RESET_RECIPES,
  UPDATE_DIRECTIONS,
  UPDATE_INGREDIENTS,
  UPDATE_CATEGORY,
  UPDATE_RECIPE_NAME,
  UPDATE_RECIPE_IMAGE,
  UPDATE_ALL_RECIPE_FIELD,
  GET_ALL_RECIPES,
  GET_TOP_RECIPES,
  GOT_RECIPE,
  AFTER_REVIEW,
  AFTER_VOTE,
  RECIPE_TO_MODIFY,
  NEW_RECIPE,
  FIND_RECIPES,
  RECIPE_VALIDATION_ERROR,
  CLEAR_VALIDATION_ERROR,
  RESET_RECIPE,
  GET_CREATED_RECIPES,
  GET_FAVOURITE_RECIPES,
  GET_REVIEWS,
  DELETE_RECIPE,
  TOGGLE_FAV
} from '../actions/actions';

export const recipeValidationError = (state = initialState.recipeValidationError, action) => {
  switch (action.type) {
    case RECIPE_VALIDATION_ERROR:
      return action.error;
    case CLEAR_VALIDATION_ERROR:
      return {
        ...state,
        ...action.error
      };
    default:
      return state;
  }
};

export const recipesReducer = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return action.payload.recipes;
    case GET_TOP_RECIPES:
      return action.payload.recipes;
    case GET_CREATED_RECIPES:
      return action.payload.recipes;
    case FIND_RECIPES:
      return action.payload.recipes;
    case DELETE_RECIPE: {
      const recipes = [...state];
      recipes.splice(action.recipeIndex, 1);
      return recipes;
    }
    case RESET_RECIPES: {
      return [];
    }
    default:
      return state;
  }
};

export const recipeReducer = (state = initialState.recipe, action) => {
  if (action.type === GOT_RECIPE) {
    return { ...state, ...action.payload.recipe };
  }
  if (action.type === AFTER_REVIEW) {
    const { reviews } = action.payload;
    return {
      ...state,
      reviews
    };
  }
  if (action.type === GET_REVIEWS) {
    const { reviews } = action.payload;
    return {
      ...state,
      reviews
    };
  }
  if (action.type === AFTER_VOTE) {
    const { upVotes } = action.payload.recipe;
    const { downVotes } = action.payload.recipe;
    return {
      ...state,
      upVotes,
      downVotes
    };
  }
  if (action.type === RECIPE_TO_MODIFY) {
    return { ...state, ...action.recipe };
  }
  if (action.type === UPDATE_INGREDIENTS) {
    const { ingredient } = action;
    return {
      ...state, ingredients: ingredient
    };
  }
  if (action.type === UPDATE_DIRECTIONS) {
    const { direction } = action;
    return {
      ...state, directions: direction
    };
  }
  if (action.type === UPDATE_CATEGORY) {
    const { category } = action;
    return {
      ...state, category
    };
  }
  if (action.type === UPDATE_RECIPE_NAME) {
    const { name } = action;
    return {
      ...state, name
    };
  }
  if (action.type === UPDATE_RECIPE_IMAGE) {
    const { image } = action;
    return {
      ...state, image
    };
  }
  if (action.type === UPDATE_ALL_RECIPE_FIELD) {
    return {
      ...state, ...action.recipe
    };
  }
  if (action.type === NEW_RECIPE) {
    return {
      ...action.payload.recipe
    };
  }
  if (action.type === RESET_RECIPE) {
    return {
      ...initialState.recipe
    };
  }
  return state;
};

export const favoriteRecipesReducer = (state = initialState.favouriteRecipes, action) => {
  switch (action.type) {
    case TOGGLE_FAV: {
      const {
        added,
        id,
        recipe
      } = action.payload.favRecipe;
      return added ? [...state].concat([recipe])
        : [...state].filter(item => item.id !== id);
    }
    case GET_FAVOURITE_RECIPES:
      return action.payload.recipes;
    default:
      return state;
  }
};

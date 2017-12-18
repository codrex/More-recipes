import initialState from './initialState';
import {
  LOGIN,
  SIGNUP,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE,
  DELETE_RECIPE,
  TOGGLE_FAV,
  GET_USER_VOTES
} from '../actions/actions';

const userReducer = (state = initialState.user, action = {

}) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state, ...action.payload.user
      };
    case SIGNUP:
      return {
        ...state, ...action.payload.user
      };
    case GOT_USER_PROFILE:
      return {
        ...state, ...action.payload.user
      };
    case UPDATE_USER_PROFILE:
      return {
        ...state, ...action.payload.user
      };
    case DELETE_RECIPE: {
      const recipes = [...state.createdRecipes];
      recipes.splice(action.recipeIndex, 1);
      return {
        ...state, createdRecipes: recipes
      };
    }
    case TOGGLE_FAV: {
      const {
        added,
        id
      } = action.payload.favRecipe;
      const { favRecipes } = state;
      return {
        ...state,
        favRecipes: added ? favRecipes.concat([{ id }])
          : favRecipes.filter(recipe => recipe.id !== id)
      };
    }
    case GET_USER_VOTES: {
      const { votes } = action.payload;
      return {
        ...state,
        votes
      };
    }
    default:
      return state;
  }
};
export default userReducer;

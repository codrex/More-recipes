import initialState from './initialState';
import {
  LOGIN,
  SIGNUP,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE,
  TOGGLE_FAV,
  GET_USER_VOTES
} from '../actions/actions';

/**
 * user reducer
 * @return {object} newState
 * @param {object} state
 * @param {object} action
 */
const userReducer = (state = initialState.user, action = {}) => {
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

    case TOGGLE_FAV: {
      const {
        added,
        id,
        recipe
      } = action.payload.favRecipe;
      const { favRecipes } = state;
      return {
        ...state,
        favRecipes: added ? favRecipes.concat([{ id: recipe.id }])
          : favRecipes.filter(item => item.id !== id)
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

import { USER, GOT_USER_PROFILE, UPDATE_USER_PROFILE, DELETE_RECIPE } from '../actions/actions';

export const userReducer = (state = { }, action) => {
  switch (action.type) {
    case USER:
      return action.user.User;
    case GOT_USER_PROFILE:
      return action.user.User;
    case UPDATE_USER_PROFILE:
      return action.user.User;
    case DELETE_RECIPE:
      return Object.assign({}, state, action.userRecipes.User);
    default:
      return state;
  }
};

export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case USER:
      return action.user.User.token;
    default:
      return state;
  }
};

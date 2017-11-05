import initialState from './initialState';
import {
  LOGIN,
  SIGNUP,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE,
  DELETE_RECIPE,
  TOGGLE_FAV
} from '../actions/actions';

export const userReducer = (state = initialState.User, action = {}) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload.User };
    case SIGNUP:
      return { ...state, ...action.payload.User };
    case GOT_USER_PROFILE:
      return { ...state, ...action.payload.User };
    case UPDATE_USER_PROFILE:
      return { ...state, ...action.payload.User };
    case DELETE_RECIPE:
      return { ...state, ...action.payload.User };
    case TOGGLE_FAV:
      return { ...state, ...action.payload.User };
    default:
      return state;
  }
};

export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case LOGIN:
      return action.user.User.token;
    default:
      return state;
  }
};

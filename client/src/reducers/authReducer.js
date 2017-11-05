import { LOGIN, SIGNUP, AJAX_REQUEST_AUTH_ERROR } from '../actions/actions';
import initialState from './initialState';

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...{ authenticated: true, token: action.payload.User.token } };
    case SIGNUP:
      return {
        ...state,
        ...{ authenticated: true, token: action.payload.User.token }
      };
    case AJAX_REQUEST_AUTH_ERROR:
      return {
        ...state,
        ...{ authenticated: false, token: '' }
      };
    default:
      return state;
  }
};
export default authReducer;

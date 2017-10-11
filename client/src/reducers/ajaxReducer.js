import { BEGIN_AJAX_REQUEST, END_AJAX_REQUEST,
         AJAX_REQUEST_ERROR, AJAX_REQUEST_SUCCESS,
        AJAX_REQUEST_AUTH_ERROR, REDIRECT, LOGIN_OR_REG_SUCCESS } from '../actions/actions';
import initialState from '../reducers/initialState';

export const ajaxReducer = (state = initialState.ajaxRequestRunning, action) => {
  switch (action.type) {
    case BEGIN_AJAX_REQUEST:
      return state + 1;
    case END_AJAX_REQUEST:
      return state - 1;
    default:
      return state;
  }
};
export const ajaxErrorReducer = (state = {}, action) => {
  switch (action.type) {
    case AJAX_REQUEST_ERROR:
      return { error: action.error };
    case AJAX_REQUEST_AUTH_ERROR:
      return { error: action.error };
    default:
      return state;
  }
};

export const ajaxSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case AJAX_REQUEST_SUCCESS:
      return action.message;
    case LOGIN_OR_REG_SUCCESS:
      return { };
    default:
      return state;
  }
};
export const ajaxRedirectReducer = (state = '', action) => {
  switch (action.type) {
    case REDIRECT:
      return action.url;
    default:
      return state;
  }
};

import { BEGIN_AJAX_REQUEST, END_AJAX_REQUEST,
         AJAX_REQUEST_ERROR, AJAX_REQUEST_SUCCESS } from '../actions/actions';
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
    default:
      return state;
  }
};

export const ajaxSuccessReducer = (state = {}, action) => {
  switch (action.type) {
    case AJAX_REQUEST_SUCCESS:
      return { success: 'Operation was successful' };
    default:
      return state;
  }
};

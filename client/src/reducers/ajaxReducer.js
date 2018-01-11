import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
  REDIRECT,
  RESET_REQ_COUNT,
  RESET_SUCCESS,
  AJAX_REQUEST_AUTH_ERROR
} from '../actions/actions';
import initialState from '../reducers/initialState';

/**
 * Ajax reducer
 * @return {object} newState
 * @param {object} state
 * @param {object} action
 */
export const ajaxReducer = (state = initialState.networkRequest, action) => {
  switch (action.type) {
    case BEGIN_AJAX_REQUEST:
      return {
        ...state,
        ...{
          requestCount: state.requestCount + 1,
          loading: action.loading
        }
      };
    case END_AJAX_REQUEST:
      return {
        ...state,
        ...{
          loading: state.requestCount > 1,
          requestCount: state.requestCount - 1,
          ...action.response
        }
      };
    case AJAX_REQUEST_AUTH_ERROR:
      return {
        ...state,
        ...{
          loading: state.requestCount > 1,
          requestCount: state.requestCount - 1,
          ...action.response
        }
      };
    case RESET_REQ_COUNT:
      return {
        ...state,
        ...{
          requestCount: 0
        }
      };
    case RESET_SUCCESS:
      return {
        ...state,
        ...{
          success: false,
          msg: ''
        }
      };
    default:
      return state;
  }
};

/**
 * ajax redirect reducer
 * @return {object} newState
 * @param {object} state
 * @param {object} action
 */
export const ajaxRedirectReducer = (state = '', action) => {
  switch (action.type) {
    case REDIRECT:
      return action.url;
    default:
      return state;
  }
};

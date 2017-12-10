import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
  REDIRECT,
  RESET_REQ_COUNT,
  RESET_SUCCESS,
} from '../actions/actions';
import initialState from '../reducers/initialState';

export const ajaxReducer = (state = initialState.networkRequest, action) => {
  switch (action.type) {
    case BEGIN_AJAX_REQUEST:
      return {
        ...state,
        loading: action.loading
      };
    case END_AJAX_REQUEST:
      return {
        ...state,
        ...{
          loading: false,
          requestCount: state.requestCount + 1,
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

export const ajaxRedirectReducer = (state = '', action) => {
  switch (action.type) {
    case REDIRECT:
      return action.url;
    default:
      return state;
  }
};

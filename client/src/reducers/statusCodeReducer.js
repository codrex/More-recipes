import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
} from '../actions/actions';
import initialState from '../reducers/initialState';

/**
 * status code reducer
 * @return {object} newState
 * @param {object} state
 * @param {object} action
 */
const statusCodeReducer = (
  state = initialState.currentStatusCode, action = {}
) => {
  switch (action.type) {
    case BEGIN_AJAX_REQUEST:
      return -1;
    case END_AJAX_REQUEST: {
      return action.response.code;
    }
    default:
      return state;
  }
};

export default statusCodeReducer;

import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
} from '../actions/actions';
import initialState from '../reducers/initialState';

const statusCodeReducer = (state = initialState.currentStatusCode, action) => {
  switch (action.type) {
    case BEGIN_AJAX_REQUEST:
      return -1;
    case END_AJAX_REQUEST:
      return action.response.code;
    default:
      return state;
  }
};

export default statusCodeReducer;

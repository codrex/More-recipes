import initialState from '../reducers/initialState';
import {
  GET_TOP_RECIPES,
  GET_CREATED_RECIPES,
  GET_FAVOURITE_RECIPES,
  FIND_RECIPES,
  GET_ALL_RECIPES,
  GET_REVIEWS,
  AFTER_REVIEW,
  RESET_PAGE_COUNT
} from '../actions/actions';


/**
 * page count reducer
 * @return {object} newState
 * @param {object} state
 * @param {object} action
 */
const pageCountReducer = (state = initialState.pageCount, action = {}) => {
  switch (action.type) {
    case GET_TOP_RECIPES:
      return action.payload.pageCount;
    case FIND_RECIPES:
      return action.payload.pageCount;
    case GET_CREATED_RECIPES:
      return action.payload.pageCount;
    case GET_FAVOURITE_RECIPES:
      return action.payload.pageCount;
    case GET_ALL_RECIPES:
      return action.payload.pageCount;
    case GET_REVIEWS:
      return action.payload.pageCount;
    case AFTER_REVIEW:
      return action.payload.pageCount;
    case RESET_PAGE_COUNT:
      return 0;
    default:
      return state;
  }
};
export default pageCountReducer;


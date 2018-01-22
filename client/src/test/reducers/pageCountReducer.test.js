import initialState from '../../reducers/initialState';
import reducer from '../../reducers/pageCountReducers';
import {
  GET_TOP_RECIPES,
  GET_CREATED_RECIPES,
  GET_FAVOURITE_RECIPES,
  FIND_RECIPES,
  GET_ALL_RECIPES,
  GET_REVIEWS,
  AFTER_REVIEW,
  RESET_PAGE_COUNT
} from '../../actions/actions';

let state;

describe('Testing page count reducer', () => {
  beforeEach(() => {
    state = initialState.pageCount;
  });

  it('should return initialState when reducer is called without args',
    () => {
      expect(reducer()).toBe(state);
    });

  it('should return a new state for action type GET_TOP_RECIPES', () => {
    const action = {
      payload: {
        pageCount: 5
      },
      type: GET_TOP_RECIPES
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(5);
  });

  it('should return a new state for action type GET_CREATED_RECIPES', () => {
    const action = {
      payload: {
        pageCount: 10
      },
      type: GET_CREATED_RECIPES
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(10);
  });

  it('should return a new state for action type GET_ALL_RECIPES', () => {
    const action = {
      payload: {
        pageCount: 11
      },
      type: GET_ALL_RECIPES
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(11);
  });

  it('should return a new state for action type GET_FAVOURITE_RECIPES', () => {
    const action = {
      payload: {
        pageCount: 11
      },
      type: GET_FAVOURITE_RECIPES
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(11);
  });

  it('should return a new state for action type FIND_RECIPES', () => {
    const action = {
      payload: {
        pageCount: 1
      },
      type: FIND_RECIPES
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(1);
  });

  it('should return a new state for action type GET_REVIEWS', () => {
    const action = {
      payload: {
        pageCount: 2
      },
      type: GET_REVIEWS
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(2);
  });

  it('should return a new state for action type AFTER_REVIEW', () => {
    const action = {
      payload: {
        pageCount: 2
      },
      type: AFTER_REVIEW
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(2);
  });

  it('should return a new state for action type RESET_PAGE_COUNT', () => {
    const action = {
      type: RESET_PAGE_COUNT
    };
    const pageCount = reducer(state, action);
    expect(pageCount).toBe(0);
  });
});

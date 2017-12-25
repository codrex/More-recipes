import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
} from '../../actions/actions';
import initialState from '../../reducers/initialState';
import reducer from '../../reducers/statusCodeReducer';

let state;

describe('Testing status code reducer', () => {
  beforeEach(() => {
    state = initialState.currentStatusCode;
  });

  it('should return initialState when status code reducer is call without args', () => {
    expect(reducer()).toBe(state);
  });

  it('should return a new state for action type END_AJAX_REQUEST', () => {
    const action = {
      response: {
        code: 200
      },
      type: END_AJAX_REQUEST
    };
    const statusCode = reducer(state, action);
    expect(statusCode).toBe(200);
  });

  it('should return a new state for action type BEGIN_AJAX_REQUEST', () => {
    const action = { type: BEGIN_AJAX_REQUEST };
    const statusCode = reducer(state, action);
    expect(statusCode).toBe(-1);
  });
});

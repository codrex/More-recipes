import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  AJAX_REQUEST_AUTH_ERROR
} from '../../actions/actions';
import initialState from '../../reducers/initialState';
import reducer from '../../reducers/authReducer';

let state;

describe('Testing auth reducer', () => {
  beforeEach(() => {
    state = initialState.auth;
  });

  it('should return initialState when auth reducer is call without args', () => {
    expect(reducer()).toMatchObject(state);
  });

  it('should return a new state for action type LOGIN', () => {
    const action = {
      payload: {
        user: {
          token: 'token'
        }
      },
      type: LOGIN
    };
    const auth = reducer(state, action);
    expect(auth).toMatchObject({ token: 'token', authenticated: true });
  });

  it('should return a new state for action type LOGOUT', () => {
    const action = { type: LOGOUT };
    const auth = reducer(state, action);
    expect(auth).toMatchObject({ token: '', authenticated: false });
  });

  it('should return a new state for action type SIGNUP', () => {
    const action = {
      payload: {
        user: {
          token: 'token'
        }
      },
      type: SIGNUP
    };
    const auth = reducer(state, action);
    expect(auth).toMatchObject({ token: 'token', authenticated: true });
  });

  it('should return a new state for action type AJAX_REQUEST_AUTH_ERROR', () => {
    const action = { type: AJAX_REQUEST_AUTH_ERROR };
    const auth = reducer(state, action);
    expect(auth).toMatchObject({ token: '', authenticated: false });
  });
});

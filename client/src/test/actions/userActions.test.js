// import { expect } from 'chai';
import initailState from '../../reducers/initialState';
import * as actions from '../../actions/userActions';
import * as actionTypes from '../../actions/actions';
import { nockMocker, mockStore, endAjaxReq, payload } from './userMock';

// ACTION CREATOR TEST
describe('Unit test for user actions', () => {
  it('expect login action creator to work corretly', () => {
    const payload = {};
    const login = {
      type: actionTypes.LOGIN,
      payload
    };
    expect(actions.login(payload)).toMatchObject(login);
  });
  it('expect signup action creator to work corretly', () => {
    const payload = {};
    const signup = {
      type: actionTypes.SIGNUP,
      payload
    };
    expect(actions.signup(payload)).toMatchObject(signup);
  });
  it('expect get user profile action creator to work corretly', () => {
    const payload = {};
    const getProfile = {
      type: actionTypes.GOT_USER_PROFILE,
      payload
    };
    expect(actions.gotProfile(payload)).toMatchObject(getProfile);
  });
  it('expect update user profile action creator to work corretly', () => {
    const payload = {};
    const updateProfile = {
      type: actionTypes.UPDATE_USER_PROFILE,
      payload
    };
    expect(actions.updatedProfile(payload)).toMatchObject(updateProfile);
  });
});

// THUNK TEST
describe('User thunks', () => {
  it(`should return BEGIN_AJAX_REQUEST, SIGNUP and
      END_AJAX_REQUEST action when signup request is successful `, () => {
      nockMocker('/api/v1/users/signup', payload, 'post', 200);

      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true
        },
        {
          type: 'SIGNUP',
          payload
        },
        endAjaxReq(200)
      ];
        // mocking store
      const store = mockStore(initailState.user);

      return store.dispatch(actions.userSignup({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });


  it(`should return BEGIN_AJAX_REQUEST, LOGIN and
      END_AJAX_REQUEST action on a successful login request`, () => {
      nockMocker('/api/v1/users/signin', payload, 'post', 200);

      const expectedActions = [
        {
          type: 'BEGIN_AJAX_REQUEST',
          loading: true
        },
        { type: 'LOGIN', payload
        },
        endAjaxReq(200)
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.userLogin({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GOT_USER_PROFILE and
      END_AJAX_REQUEST action when request get user profile is successful`, () => {
      nockMocker('/api/v1/users/', payload, 'get', 200);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: 'GOT_USER_PROFILE', payload },
        endAjaxReq(200)
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.getUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, UPDATE_USER_PROFILE and
      END_AJAX_REQUEST action when request for profile update is successful`, () => {
      nockMocker('/api/v1/users/update', payload, 'put', 200);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: 'UPDATE_USER_PROFILE', payload },
        endAjaxReq(200, 'Profile update successfully')
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.updateProfile(payload))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Test thunks:: expect request to fail', () => {
  const error = { error: 'error' };
  it(`should return BEGIN_AJAX_REQUEST and
      END_AJAX_REQUEST action for invalid signup data`, () => {
      nockMocker('/api/v1/users/signup', error, 'post', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        endAjaxReq(400, 'error', false)
      ];
        // mocking store
      const store = mockStore(initailState.user);

      return store.dispatch(actions.userSignup({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST and
      END_AJAX_REQUEST action for invalid login data`, () => {
      nockMocker('/api/v1/users/signin', error, 'post', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        endAjaxReq(400, 'error', false)
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.userLogin({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST and
      END_AJAX_REQUEST action when request for user profile is unsuccessful`, () => {
      nockMocker('/api/v1/users/', error, 'get', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        endAjaxReq(400, 'error', false)
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.getUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST and
      END_AJAX_REQUEST action when request made for profile update is unsuccessful`, () => {
      nockMocker('/api/v1/users/update', error, 'put', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        endAjaxReq(400, 'error', false)
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.updateProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, AJAX_REQUEST_AUTH_ERROR and
      END_AJAX_REQUEST action when auth fail with 401 status code`, () => {
      nockMocker('/api/v1/users/update', error, 'put', 401);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: 'END_AJAX_REQUEST',
          response: {
            msg: 'Authentication failed. Please SIGN-UP or LOGIN to continue',
            success: false } },
        { type: 'AJAX_REQUEST_AUTH_ERROR' },
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.updateProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, AJAX_REQUEST_AUTH_ERROR and
      END_AJAX_REQUEST action when auth fail with 403 status code`, () => {
      nockMocker('/api/v1/users/update', error, 'put', 403);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: 'END_AJAX_REQUEST',
          response: {
            msg: 'Authentication failed. Please SIGN-UP or LOGIN to continue', success: false } },
        { type: 'AJAX_REQUEST_AUTH_ERROR' },
      ];

      const store = mockStore(initailState.user);
      return store.dispatch(actions.updateProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});


import initialState from '../../../reducers/initialState';
import * as actions from '../../../actions/userActions';
import { nockMocker, mockStore, endAjaxReq, payload } from './userMock';

// THUNK TEST
describe('User thunks', () => {
  it(`should return BEGIN_AJAX_REQUEST, SIGNUP and END_AJAX_REQUEST actions
   when signup request is successful `, () => {
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
      const store = mockStore(initialState.user);

      return store.dispatch(actions.userSignup({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });


  it(`should return BEGIN_AJAX_REQUEST, LOGIN and END_AJAX_REQUEST actions when
  login request is successful`, () => {
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

      const store = mockStore(initialState.user);
      return store.dispatch(actions.userLogin({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, GOT_USER_PROFILE and END_AJAX_REQUEST
  actions when get user profile request is successful`,
    () => {
      nockMocker('/api/v1/users/1', payload, 'get', 200);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        { type: 'GOT_USER_PROFILE', payload },
        endAjaxReq(200)
      ];

      const store = mockStore(initialState.user);
      return store.dispatch(actions.getUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, UPDATE_USER_PROFILE and END_AJAX_REQUEST
   actions when profile update request is successful`,
    () => {
      nockMocker('/api/v1/users/update', payload, 'put', 200);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: 'UPDATE_USER_PROFILE', payload },
        endAjaxReq(200, 'Profile update successfully')
      ];

      const store = mockStore(initialState.user);
      return store.dispatch(actions.updateProfile(payload))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

describe('Test thunks:: expect request to fail', () => {
  const error = { error: 'error' };
  it(`should return BEGIN_AJAX_REQUEST and END_AJAX_REQUEST actions when signup
   request is unsuccessful`, () => {
      nockMocker('/api/v1/users/signup', error, 'post', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        endAjaxReq(400, 'error', false)
      ];
      const store = mockStore(initialState.user);

      return store.dispatch(actions.userSignup({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST and END_AJAX_REQUEST actions when login
  request is unsuccessful`, () => {
      nockMocker('/api/v1/users/signin', error, 'post', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: true },
        endAjaxReq(400, 'error', false)
      ];

      const store = mockStore(initialState.user);
      return store.dispatch(actions.userLogin({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST and END_AJAX_REQUEST action when update
  profile request is unsuccessful`, () => {
      nockMocker('/api/v1/users/update', error, 'put', 400);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        endAjaxReq(400, 'error', false)
      ];

      const store = mockStore(initialState.user);
      return store.dispatch(actions.updateProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  it(`should return BEGIN_AJAX_REQUEST, AJAX_REQUEST_AUTH_ERROR and
      END_AJAX_REQUEST actions when there is an authentication error`, () => {
      nockMocker('/api/v1/users/update', error, 'put', 401);

      const expectedActions = [
        { type: 'BEGIN_AJAX_REQUEST', loading: false },
        { type: 'END_AJAX_REQUEST',
          response: {
            msg: 'error',
            success: false,
            code: 401
          } },
        { type: 'AJAX_REQUEST_AUTH_ERROR' },
      ];

      const store = mockStore(initialState.user);
      return store.dispatch(actions.updateProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});

import * as actions from '../../../actions/userActions';
import * as actionTypes from '../../../actions/actions';

// ACTION CREATOR TEST
describe('Unit test for user actions', () => {
  it('should return an action with an action-type of LOGIN ', () => {
    const payload = {};
    const login = {
      type: actionTypes.LOGIN,
      payload
    };
    expect(actions.login(payload)).toMatchObject(login);
  });

  it('should return an action with an action-type of SIGNUP ', () => {
    const payload = {};
    const signup = {
      type: actionTypes.SIGNUP,
      payload
    };
    expect(actions.signup(payload)).toMatchObject(signup);
  });

  it('should return an action with an action-type of GOT_USER_PROFILE', () => {
    const payload = {};
    const getProfile = {
      type: actionTypes.GOT_USER_PROFILE,
      payload
    };
    expect(actions.gotProfile(payload)).toMatchObject(getProfile);
  });

  it('should return an action with an action-type of UPDATE_USER_PROFILE',
    () => {
      const payload = {};
      const updateProfile = {
        type: actionTypes.UPDATE_USER_PROFILE,
        payload
      };
      expect(actions.updatedProfile(payload)).toMatchObject(updateProfile);
    });
});


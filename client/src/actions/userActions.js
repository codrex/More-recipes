import { USER, LOGIN_OR_REG_SUCCESS, GOT_USER_PROFILE, UPDATE_USER_PROFILE } from './actions';
import ActionDispatcher from './actionDispatcher';

const userAction = user => ({ type: USER, user });
const gotProfile = user => ({ type: GOT_USER_PROFILE, user });
const updatedProfile = user => ({ type: UPDATE_USER_PROFILE, user });
export const loginOrRegSuccess = () => ({ type: LOGIN_OR_REG_SUCCESS });

export const userLogin = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/users/signin', user, userAction, 'post');
};

export const userSignup = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/users/signup', user, userAction, 'post');
};

export const getUserProfile = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(`/api/v1/users/${id}`, null, gotProfile, 'get');
};

export const updateProfile = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  dispatcher.requestAndDispatch(`/api/v1/users/${id}`, user, updatedProfile, 'put');
};

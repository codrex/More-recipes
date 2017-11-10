import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  LOGIN_OR_REG_SUCCESS,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE
} from './actions';
import { clearToken } from '../utils/auth/auth';
import ActionDispatcher from './actionDispatcher';

export const login = payload => ({ type: LOGIN, payload });
export const logout = () => ({ type: LOGOUT });
export const signup = payload => ({ type: SIGNUP, payload });
export const gotProfile = payload => ({ type: GOT_USER_PROFILE, payload });
export const updatedProfile = payload => ({ type: UPDATE_USER_PROFILE, payload });
export const loginOrRegSuccess = () => ({ type: LOGIN_OR_REG_SUCCESS });

export const userLogin = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/signin',
    user,
    login,
    'post'
  );
};

export const userLogout = () => (dispatch) => {
  clearToken();
  dispatch(logout);
  window.location.reload();
};

export const userSignup = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/signup',
    user,
    signup,
    'post'
  );
};

export const getUserProfile = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(`/api/v1/users/${id}`, null, gotProfile, 'get');
};

export const updateProfile = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(
    `/api/v1/users/${id}`,
    user,
    updatedProfile,
    'put',
    'Profile update successfully'
  );
};

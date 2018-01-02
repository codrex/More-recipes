import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  LOGIN_OR_REG_SUCCESS,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_USER_VOTES,
} from './actions';
import { clearToken } from '../utils/auth/auth';
import ActionDispatcher from './actionDispatcher';

/**
 * @return {object} action
 * @param {object} payload
 */
export const login = payload => ({
  type: LOGIN, payload
});

/**
 * @return {object} action
 */
export const logout = () => ({
  type: LOGOUT
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const signup = payload => ({
  type: SIGNUP, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotProfile = payload => ({
  type: GOT_USER_PROFILE, payload
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const updatedProfile = payload => ({
  type: UPDATE_USER_PROFILE, payload
});

/**
 * @return {object} action
 */
export const loginOrRegSuccess = () => ({
  type: LOGIN_OR_REG_SUCCESS
});

/**
 * @return {object} action
 * @param {object} payload
 */
export const gotVotes = payload => ({
  type: GET_USER_VOTES, payload
});

/**
 * @return {object} action
 * @param {object} user
 */
export const userLogin = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/signin',
    user,
    login,
    'post'
  );
};

/**
 * @return {object} action
 */
export const userLogout = () => (dispatch) => {
  clearToken();
  dispatch(logout);
  window.location.reload();
};

/**
 * @return {object} action
 * @param {object} user
 */
export const userSignup = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/signup',
    user,
    signup,
    'post'
  );
};

/**
 * @return {object} action
 */
export const getUserProfile = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(`/api/v1/users/${id}`, null, gotProfile, 'get');
};

/**
 * @return {object} action
 * @param {array} recipeIds
 */
export const getVotes = recipeIds => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    `/api/v1/users/votes?ids=${recipeIds.join()}`,
    null,
    gotVotes,
    'get'
  );
};

/**
 * @return {object} action
 * @param {object} user
 */
export const updateProfile = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(
    `/api/v1/users/${id}`,
    user,
    updatedProfile,
    'put',
    'Profile update successfully'
  );
};

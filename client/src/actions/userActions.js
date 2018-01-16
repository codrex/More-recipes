import {
  LOGIN,
  LOGOUT,
  SIGNUP,
  GOT_USER_PROFILE,
  UPDATE_USER_PROFILE,
  GET_USER_VOTES,
} from './actions';
import { clearToken } from '../utils/auth';
import ActionDispatcher from './actionDispatcher';

/**
 * login action creator
 * @return {object} action
 * @param {object} payload
 */
export const login = payload => ({
  type: LOGIN, payload
});

/**
 * logout action creator
 * @return {object} action
 */
export const logout = () => ({
  type: LOGOUT
});

/**
 * signup action creator
 * @return {object} action
 * @param {object} payload
 */
export const signup = payload => ({
  type: SIGNUP, payload
});

/**
 * gets user profile .
 * it is fired after get user profile request was successful
 * @return {object} action
 * @param {object} payload
 */
export const gotProfile = payload => ({
  type: GOT_USER_PROFILE, payload
});

/**
 * update user profile action creator
 * @return {object} action
 * @param {object} payload
 */
export const updatedProfile = payload => ({
  type: UPDATE_USER_PROFILE, payload
});

/**
 * get user vote action creator
 * @summary fired after get user votes request returns successfully
 * @return {object} action
 * @param {object} payload
 */
export const gotVotes = payload => ({
  type: GET_USER_VOTES, payload
});

/**
 * user login action creator
 * @summary handle user login request and
 * it fires a login action when login request is successful
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
 * logs out a user
 * @return {object} action
 */
export const userLogout = () => (dispatch) => {
  clearToken();
  dispatch(logout);
  window.location.reload();
};

/**
 * handles user signup process.
 * it performs similar operation as the userLogin function.
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
 * handles get user profile request.
 * @return {object} action
 */
export const getUserProfile = () => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  const id = dispatcher.getIdFromToken();
  return dispatcher.requestAndDispatch(
    `/api/v1/users/${id}`,
    null,
    gotProfile,
    'get'
  );
};

/**
 * handles get user votes request
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
 * handles user profile update request
 * @return {object} action
 * @param {object} user
 */
export const updateProfile = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch, false);
  return dispatcher.requestAndDispatch(
    '/api/v1/users/update',
    user,
    updatedProfile,
    'put',
    'Profile update successfully'
  );
};

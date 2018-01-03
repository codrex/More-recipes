import axios from 'axios';
import {
  endAjaxRequest,
  beginAjaxRequest,
  ajaxRequestAuthError
} from '../../actions/ajaxActions';
import { PRODUCTION_URL, DEVELOPMENT_URL } from '../../constants';

const rootUrl = process.env.NODE_ENV === 'production' ? PRODUCTION_URL : DEVELOPMENT_URL;

/**
 * request ajax handler
 * @return {promise} promise object
 * @param {object} payload
 * @param {string} path
 * @param {function} dispatch
 * @param {string} type
 * @param {bool} loading
 */
export const request = (payload, path, dispatch, type, loading) => {
  dispatch(beginAjaxRequest(loading));
  const url = rootUrl + path;
  if (type === ('get' || 'delete')) {
    return axios[type](url);
  }
  return axios[type](url, payload);
};

/**
 * set Authorization header
 * @return {*} void
 * @param {string} token
 */
export const setToken = (token) => {
  axios.defaults.headers.common.Authorization = token;
};

/**
 * dispatch when ajax request returned successful
 * @return {*} void
 * @param {function} dispatch
 * @param {string} msg
 * @param {number} code
 */
export const dispatchOnSuccess = (dispatch, msg = '', code = 200) => {
  dispatch(endAjaxRequest({
    success: true,
    msg,
    code
  }));
};

/**
 * dispatch when ajax request returned unsucessful
 * @return {*} void
 * @param {function} dispatch
 * @param {string} error
 * @param {number} code
 */
export const dispatchOnFail = (dispatch, error, code = 0) => {
  dispatch(endAjaxRequest({
    success: false,
    msg: error,
    code
  }));
};

/**
 * dispatch when there is an authentication error
 * @return {*} void
 * @param {function} dispatch
 * @param {string} error
 */
export const dispatchOnAuthError = (dispatch, error) => {
  dispatch(endAjaxRequest({
    success: false,
    msg: error,
  }));
  dispatch(ajaxRequestAuthError());
};

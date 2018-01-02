import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
  AJAX_REQUEST_AUTH_ERROR,
  REDIRECT,
  RESET_REQ_COUNT,
  RESET_SUCCESS,
} from './actions';

/**
 * @return {object} action
 * @param {bool} loading
 */
export const beginAjaxRequest = loading => ({
  type: BEGIN_AJAX_REQUEST, loading
});

/**
 * @return {object} action
 * @param {object} response
 */
export const endAjaxRequest = response => ({
  type: END_AJAX_REQUEST,
  response
});

/**
 * @return {object} action
 */
export const ajaxRequestAuthError = () => ({
  type: AJAX_REQUEST_AUTH_ERROR,
});

/**
 * @return {object} action
 * @param {string} url
 */
export const ajaxRedirect = url => ({
  type: REDIRECT, url
});

/**
 * @return {object} action
 */
export const resetReqCount = () => ({
  type: RESET_REQ_COUNT
});

/**
 * @return {object} action
 */
export const resetSuccess = () => ({
  type: RESET_SUCCESS
});

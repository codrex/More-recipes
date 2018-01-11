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
 * @description fired when an ajax request begins
 */
export const beginAjaxRequest = loading => ({
  type: BEGIN_AJAX_REQUEST, loading
});

/**
 * @return {object} action
 * @param {object} response
 * @description fired when an ajax request ends
 */
export const endAjaxRequest = response => ({
  type: END_AJAX_REQUEST,
  response
});

/**
 * @return {object} action
 * @description action is fired when authentication fail
 */
export const ajaxRequestAuthError = () => ({
  type: AJAX_REQUEST_AUTH_ERROR,
});

/**
 * @return {object} action
 * @param {string} url
 * @description update redirect state
 */
export const ajaxRedirect = url => ({
  type: REDIRECT, url
});

/**
 * @return {object} action
 * @description reset reqcount to 0
 */
export const resetReqCount = () => ({
  type: RESET_REQ_COUNT
});

/**
 * @return {object} action
 * @description reset success attribute it the initial or default state
 */
export const resetSuccess = () => ({
  type: RESET_SUCCESS
});

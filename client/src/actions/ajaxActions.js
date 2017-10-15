import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
  AJAX_REQUEST_ERROR,
  AJAX_REQUEST_SUCCESS,
  AJAX_REQUEST_AUTH_ERROR,
  REDIRECT
} from './actions';

export const beginAjaxRequest = () => ({ type: BEGIN_AJAX_REQUEST });
export const endAjaxRequest = () => ({ type: END_AJAX_REQUEST });
export const ajaxRequestSuccess = message => ({
  type: AJAX_REQUEST_SUCCESS,
  message
});
export const ajaxRequestError = error => ({ type: AJAX_REQUEST_ERROR, error });
export const ajaxRequestAuthError = error => ({
  type: AJAX_REQUEST_AUTH_ERROR,
  error
});
export const ajaxRedirect = url => ({ type: REDIRECT, url });

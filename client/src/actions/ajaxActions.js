import {
  BEGIN_AJAX_REQUEST,
  END_AJAX_REQUEST,
  AJAX_REQUEST_AUTH_ERROR,
  REDIRECT,
  RESET_REQ_COUNT,
  RESET_SUCCESS,
} from './actions';

export const beginAjaxRequest = (loading) => ({ type: BEGIN_AJAX_REQUEST, loading });
export const endAjaxRequest = (response) => ({ type: END_AJAX_REQUEST, response });
export const ajaxRequestAuthError = () => ({ type: AJAX_REQUEST_AUTH_ERROR });
export const ajaxRedirect = url => ({ type: REDIRECT, url });
export const resetReqCount = () => ({ type: RESET_REQ_COUNT });
export const resetSuccess = () => ({ type: RESET_SUCCESS });

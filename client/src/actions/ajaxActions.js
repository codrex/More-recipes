import { BEGIN_AJAX_REQUEST, END_AJAX_REQUEST,
          AJAX_REQUEST_ERROR, AJAX_REQUEST_SUCCESS } from './actions';

export const beginAjaxRequest = () => ({ type: BEGIN_AJAX_REQUEST });
export const endAjaxRequest = () => ({ type: END_AJAX_REQUEST });
export const ajaxRequestSuccess = () => ({ type: AJAX_REQUEST_SUCCESS });
export const ajaxRequestError = error => ({ type: AJAX_REQUEST_ERROR, error });


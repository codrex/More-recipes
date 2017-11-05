import axios from 'axios';
import { endAjaxRequest, beginAjaxRequest,
        ajaxRequestAuthError } from '../actions/ajaxActions';

const rootUrl = 'http://127.0.0.1:8000';

export const request = (payload, path, dispatch, type) => {
  dispatch(beginAjaxRequest());
  const url = rootUrl + path;
  if (type === ('get' || 'delete')) {
    return axios[type](url);
  }
  return axios[type](url, payload);
};

export const setToken = (token) => {
  axios.defaults.headers.common.Authorization = token;
};

export const dispatchOnSuccess = (dispatch, msg = undefined) => {
  dispatch(endAjaxRequest({
    success: true,
    msg,
  }));
};

export const dispatchOnFail = (dispatch, error) => {
  dispatch(endAjaxRequest({
    success: false,
    msg: error,
  }));
};

export const dispatchOnAuthError = (dispatch, error) => {
  dispatch(endAjaxRequest({
    success: false,
    msg: error,
  }));
  dispatch(ajaxRequestAuthError());
};

import axios from 'axios';
import { endAjaxRequest, ajaxRequestError,
        ajaxRequestSuccess, beginAjaxRequest } from '../actions/ajaxActions';


const rootUrl = 'http://127.0.0.1:8000';

export const sendPostReq = (payload, path, dispatch) => {
  dispatch(beginAjaxRequest());
  const url = rootUrl + path;
  return axios.post(url, payload);
};

export const dispatchOnSuccess = (dispatch) => {
  dispatch(ajaxRequestSuccess());
  dispatch(endAjaxRequest());
};

export const dispatchOnFail = (dispatch, error) => {
  dispatch(endAjaxRequest());
  dispatch(ajaxRequestError(error));
};

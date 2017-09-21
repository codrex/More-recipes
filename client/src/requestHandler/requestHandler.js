import axios from 'axios';

const rootUrl = 'http://127.0.0.1:8000';

export const sendPostReq = (payload, path, actionType) => {
  const url = rootUrl + path;
  const req = axios.post(url, payload);
  return { type: actionType, payload: req };
};

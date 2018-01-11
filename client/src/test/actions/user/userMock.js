
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';
import faker from 'faker';

axios.defaults.host = 'http://localhost';
axios.defaults.adapter = httpAdapter;

/**
 * mock request
 * @param {string} path
 * @param {object} payloadData
 * @param {string} reqType
 * @param {number} statusCode
 * @return {object} scope
 */
export const nockMocker = (path, payloadData, reqType, statusCode) => {
  const scope = nock('http://127.0.0.1:8000/', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
    }
  })[reqType](path)
    .reply(statusCode, payloadData);
  return scope;
};

/**
 * mock store
 * @param {object} state
 * @return {object} store
 */
export const mockStore = (state) => {
  const store = configureMockStore([thunk]);
  return store(state);
};

/**
 * @return {object} expected action
 * @param {number} code
 * @param {string} msg
 * @param {bool} success
 */
export const endAjaxReq = (code, msg = '', success = true) => ({
  type: 'END_AJAX_REQUEST',
  response: {
    msg,
    success,
    code
  }
});

export const payload = {
  status: 'success',
  user: {
    id: 1,
    email: faker.internet.email(),
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE1NTE0MzA0LCJleHAiOjE1MTU2MDA3MDR9.p_leLiWrAYBn8sB0n1VAd8VO3UtfJTolDLyyVJBTIY4',
    username: faker.name.firstName(),
    fullname: faker.name.findName()
  }
};

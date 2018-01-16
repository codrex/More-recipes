/* eslint-disable import/no-extraneous-dependencies */
import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';

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
  nock.cleanAll();
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

export const recipe = {
  name: 'africa oil rice',
  category: 'lunch',
  ingredients: ['rice', 'water', 'salt', 'oil'],
  directions: ['wash the rice', 'boil the rice for 20mins']
};


export const setup = (url, reqType, state, code = 200) => {
  const payload = {
    status: 'success',
    recipe
  };

  const scope = nockMocker(url, payload, reqType, code);
  // mocking store
  const store = mockStore(state);
  jest.setTimeout(10000);
  return {
    payload,
    store,
    scope
  };
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

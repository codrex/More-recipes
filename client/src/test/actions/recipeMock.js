import nock from 'nock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import httpAdapter from 'axios/lib/adapters/http';
import axios from 'axios';

axios.defaults.host = 'http://localhost';
axios.defaults.adapter = httpAdapter;

// mocking http request
export const nockMocker = (path, payloadData, reqType, statusCode) => {
  nock.cleanAll();
  const scope = nock('http://127.0.0.1:8000/', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
    }
  })[reqType](path)
    .once()
    .reply(statusCode, payloadData);
  return scope;
};

// STORE MOCK
export const mockStore = (state) => {
  const store = configureMockStore([thunk]);
  return store(state);
};

export const setup = (url, reqType, state, code = 200) => {
  const payload = {
    status: 'success',
    recipe: {
      name: 'recipe',
      category: 'lunch',
      ingredients: ['rice'],
      directions: ['wash the rice']
    }
  };
  const scope = nockMocker(url, payload, reqType, code);
  // mocking store
  const store = mockStore(state);
  return {
    payload,
    store,
    scope
  };
};

export const recipe = {
  name: 'recipe',
  category: 'lunch',
  ingredients: ['rice'],
  directions: ['wash the rice']
};

export const endAjaxReq = (code, msg = '', success = true) => ({
  type: 'END_AJAX_REQUEST',
  response: {
    msg,
    success,
    code
  }
});

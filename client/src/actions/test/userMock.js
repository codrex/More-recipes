
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';

// mocking http request
export const nockMocker = (path, payloadData, reqType, statusCode) => {
  const scope = nock('http://127.0.0.1:8000/', {
    reqheaders: {
      accept: 'application/json, text/plain, */*',
    }
  })[reqType](path)
    .reply(statusCode, payloadData);
  return scope;
};

// STORE MOCK
export const mockStore = (state) => {
  const store = configureMockStore([thunk]);
  return store(state);
};

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
    email: 'email@gmail.com',
    token: '123412341234jjkkklkmkmkmkmkmlkm',
    username: 'testuser',
    fullname: 'test user'
  }
};

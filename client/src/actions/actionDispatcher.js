import {
  dispatchOnSuccess,
  dispatchOnFail,
  dispatchOnAuthError,
  setToken,
  request
} from '../requestHandler/requestHandler';
import { LOGIN, SIGNUP } from './actions';
import { storeToken, getId, getToken } from '../utils/auth/auth';

/**
 *  A thunk class that is responsible for dispatching actions after an ajax request has returned.
 *  it calls the method responsible for sending ajax request to the server and
 *  wait for it to return, before dispatching neccessary actions.
 */
export default class ActionDispatcher {
  /**
   * @param {function} dispatch: dispatch function
   * @param {bool} loading
   * @param {string} TOKEN: access token
   */
  constructor(dispatch, loading = true, TOKEN = getToken()) {
    this.dispatch = dispatch;
    this.TOKEN = TOKEN;
    setToken(TOKEN);
    this.loading = loading;
  }

  /**
 * @return {undefined}
 */
  getIdFromToken() {
    return getId();
  }

  /**
 * @returns {undefined}
 * @param {object} error
 */
  onError(error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
        // if user is not logged in redirect user to home page
        dispatchOnAuthError(
          this.dispatch,
          'Authentication failed. Please SIGN-UP or LOGIN to continue'
        );
      } else {
        let errorMsg = error.response.data.error;
        if (typeof errorMsg === 'object') {
          errorMsg = errorMsg[Object.keys(errorMsg)[0]];
        }
        dispatchOnFail(this.dispatch, errorMsg);
      }
    } else if (error.request) {
      const errorMsg = 'Network error encountered, please check your conention and try again';
      dispatchOnFail(this.dispatch, errorMsg);
    }
  }
  /**
 * @return {undefined}
 * @param {function} action
 * @param {object} payload
 * @param {string} successMsg
 */
  saveToken(action, payload, successMsg) {
    // save token returned during login and signup  in the local storage
    if (action().type === SIGNUP || action().type === LOGIN) {
      storeToken(payload.data.User.token);
    }
    if (action) this.dispatch(action(payload.data));
    dispatchOnSuccess(this.dispatch, successMsg);
  }

  /**
   *
   * @param {string} url: destination url
   * @param {object} reqData: object to sent to the server
   * @param {function} action: action to be dispatch when request was successful
   * @param {string} reqType: type of request
   * @param {string} successMsg: message to return on success
   * @return {object} Promise
   */
  requestAndDispatch(url, reqData, action, reqType, successMsg) {
    return request(reqData, url, this.dispatch, reqType, this.loading)
      .then((payload) => {
        this.saveToken(action, payload, successMsg);
      })
      .catch((error) => {
        this.onError(error);
      });
  }
}

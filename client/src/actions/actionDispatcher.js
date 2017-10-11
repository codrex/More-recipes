import { dispatchOnSuccess,
         dispatchOnFail, dispatchOnAuthError,
         setToken, request } from '../requestHandler/requestHandler';
import { ajaxRedirect } from './ajaxActions';
import jwt from 'jsonwebtoken';

const TOKEN_KEY = 'MRAToken';

/**
 *  A thunk class that is responsible for dispatching actions after an ajax request has returned.
 *  it calls the method responsible for sending ajax request to the server and
 *  wait for it to return, before dispatching neccessary actions.
 */
export default class ActionDispatcher {
  /**
   * @param {function} dispatch: dispatch function
   * @param {string} TOKEN: access token
   */
  constructor(dispatch, TOKEN = localStorage.getItem(TOKEN_KEY) || '') {
    this.dispatch = dispatch;
    this.TOKEN = TOKEN;
    setToken(TOKEN);
  }

  /**
 * @return {undefined}
 */
  getIdFromToken() {
    const data = jwt.decode(localStorage.getItem('MRAToken'));
    if (data) {
      return data.id;
    }
    return undefined;
  }

  /**
 * @returns {undefined}
 * @param {object} error
 */
  onError(error) {
    if (error.response) {
      if (error.response.status === 401 || error.response.status === 403) {
      // if user is not logged in redirect user to home page
        dispatchOnAuthError(this.dispatch,
      'Authentication failed. Please SIGN-UP or LOGIN to continue');
        this.dispatch(ajaxRedirect('/'));
      } else {
        dispatchOnFail(this.dispatch, error.response.data.error);
      }
    }
  }
//    /**
//  * @returns {undefined}
//  * @param {function} action
//  * @param {object} payload
//  */
/**
 * @return {undefined}
 * @param {function} action
 * @param {object} payload
 * @param {string} successMsg
 */
  saveToken(action, payload, successMsg) {
    if (payload.data.User) {
      if (payload.data.User.token) {
        localStorage.setItem(TOKEN_KEY, payload.data.User.token);
      }
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
   * @return {undefined}
   */
  requestAndDispatch(url, reqData, action, reqType, successMsg) {
    return request(reqData, url, this.dispatch, reqType)
    .then((payload) => {
      this.saveToken(action, payload, successMsg);
    }).catch((error) => {
      this.onError(error);
    });
  }

}

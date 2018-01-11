import {
  dispatchOnSuccess,
  dispatchOnFail,
  dispatchOnAuthError,
  setToken,
  request
} from '../utils/requestHandler';
import { LOGIN, SIGNUP } from './actions';
import { storeToken, getId, getToken } from '../utils/auth';


/**
 *  A thunk class that is responsible for dispatching actions after an ajax request has returned.
 *  it calls the method responsible for sending ajax request to the server,
 *  wait for it to return, before dispatching necessary actions.
 */
export default class ActionDispatcher {
  /**
   * constructor
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
   * gets userId from token
   * @return {undefined}
   */
  getIdFromToken = () => getId()

  /**
   * Handles ajax request errors
   * @returns {undefined}
   * @param {object} error - axios request error
   */
  onError(error) {
    if (error.response) {
      if (error.response.status === 401) {
        dispatchOnAuthError(
          this.dispatch,
          error.response.data.error,
          error.response.status
        );
      } else {
        let errorMsg = error.response.data.error;
        if (typeof errorMsg === 'object') {
          errorMsg = errorMsg[Object.keys(errorMsg)[0]];
        }
        dispatchOnFail(this.dispatch, errorMsg, error.response.status);
      }
    } else if (process.env.NODE_ENV !== 'test') {
      const errorMsg = 'Network error encountered, please check your connection and try again';
      dispatchOnFail(this.dispatch, errorMsg);
    } else {
      dispatchOnFail(this.dispatch);
    }
  }

  /**
   * this function is called when an ajax request returns successfully
   * it store user's access token if user logged in or signed up
   * and dispatch the necessary actions
   * @return {undefined}
   * @param {function} action
   * @param {object} payload
   * @param {string} successMsg
   */
  saveToken(action, payload, successMsg) {
    if (action().type === SIGNUP || action().type === LOGIN) {
      storeToken(payload.data.user.token);
    }
    this.dispatch(action(payload.data));
    dispatchOnSuccess(this.dispatch, successMsg);
  }

  /**
   * this function send ajax request to the server
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

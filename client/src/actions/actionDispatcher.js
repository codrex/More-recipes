import { sendPostReq, dispatchOnSuccess,
         dispatchOnFail, dispatchOnAuthError, setToken } from '../requestHandler/requestHandler';
import { ajaxRedirect } from './ajaxActions';

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
  constructor(dispatch, TOKEN = '') {
    this.dispatch = dispatch;
    this.TOKEN = TOKEN;
    setToken(TOKEN);
  }
  /**
   *
   * @param {string} url: destination url
   * @param {object} reqData: object to sent to the server
   * @param {function} action: action to be dispatch when post was successful
   * @return {undefined}
   */
  postAndDispatch(url, reqData, action) {
    sendPostReq(reqData, url, this.dispatch)
    .then((payload) => {
      this.dispatch(action(payload.data));
      dispatchOnSuccess(this.dispatch);
    }).catch((error) => {
      if (error.response) {
        if (error.response.status === (403 || 401)) {
          // if user is not logged in redirect user to home page
          dispatchOnAuthError(this.dispatch,
          'Authentication failed. Please SIGN-UP or LOGIN to continue');
          this.dispatch(ajaxRedirect('/'));
        }
      } else {
        dispatchOnFail(this.dispatch, error.response.data.error);
      }
    });
  }
}

import { sendPostReq, dispatchOnSuccess, dispatchOnFail } from '../requestHandler/requestHandler';

/**
 *  A thunk class that is responsible for dispatching actions after an ajax request has returned.
 *  it calls the method responsible for sending ajax request to the server and
 *  wait for it to return, before dispatching neccessary actions.
 */
export default class ActionDispatcher {
  /**
   * @param {function} dispatch: dispatch function
   */
  constructor(dispatch) {
    this.dispatch = dispatch;
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
      dispatchOnFail(this.dispatch, error.response.data.error);
    });
  }
}

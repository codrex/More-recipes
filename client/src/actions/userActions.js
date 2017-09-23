import { USER } from './actions';
import { sendPostReq, dispatchOnSuccess, dispatchOnFail } from '../requestHandler/requestHandler';

export const userAction = user => ({ type: USER, user });

export const userLogin = user => (dispatch) => {
  sendPostReq(user, '/api/v1/users/signin', dispatch)
    .then((payload) => {
      dispatch(userAction(payload.data.user));
      dispatchOnSuccess(dispatch);
    }).catch((error) => {
      dispatchOnFail(dispatch, error.response.data.error);
    });
};

export const userSignup = user => (dispatch) => {
  sendPostReq(user, '/api/v1/users/signup', dispatch)
    .then((payload) => {
      dispatch(userAction(payload.data.user));
      dispatchOnSuccess(dispatch);
    }).catch((error) => {
      dispatchOnFail(dispatch, error.response.data.error);
    });
};

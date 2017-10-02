import { USER, LOGIN_OR_REG_SUCCESS } from './actions';
import ActionDispatcher from './actionDispatcher';

export const userAction = user => ({ type: USER, user });
export const loginOrRegSuccess = () => ({ type: LOGIN_OR_REG_SUCCESS });

export const userLogin = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/users/signin', user, userAction, 'post');
};

export const userSignup = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.requestAndDispatch('/api/v1/users/signup', user, userAction, 'post');
};

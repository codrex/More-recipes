import { USER } from './actions';
import ActionDispatcher from './actionDispatcher';

export const userAction = user => ({ type: USER, user });

export const userLogin = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.postAndDispatch('/api/v1/users/signin', user, userAction);
};

export const userSignup = user => (dispatch) => {
  const dispatcher = new ActionDispatcher(dispatch);
  dispatcher.postAndDispatch('/api/v1/users/signup', user, userAction);
};

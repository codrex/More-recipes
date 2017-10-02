import { USER } from '../actions/actions';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER:
      return action.user.User;
    default:
      return state;
  }
};
export const tokenReducer = (state = '', action) => {
  switch (action.type) {
    case USER:
      return action.user.User.token;
    default:
      return state;
  }
};

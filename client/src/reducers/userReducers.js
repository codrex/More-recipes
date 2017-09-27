import { USER } from '../actions/actions';

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER:
      return action.user;
    default:
      return state;
  }
};

import { CREATE_ACCOUNT, LOGIN } from '../actions/actions';

export const createUserReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ACCOUNT:
      return action.payload.response.data;
    case LOGIN:
      return action.payload.response.data;
    default:
      return state;
  }
};

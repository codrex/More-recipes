import { CREATE_ACCOUNT, LOGIN } from './actions';
import { sendPostReq } from '../requestHandler/requestHandler';

export const createAccount = (user) => sendPostReq(user, '/api/v1/users/signup', CREATE_ACCOUNT);
export const login = (user) => sendPostReq(user, '/api/v1/users/signin', LOGIN);


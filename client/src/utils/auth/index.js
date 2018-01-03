import jwt from 'jsonwebtoken';

export const TOKEN_ID = 'MRAToken';
export const getToken = () => localStorage.getItem(TOKEN_ID);

/**
 * get user id from jwt token
 * @return {number|string} id
 */
export const getId = () => {
  const token = getToken();
  const decodedToken = jwt.decode(token);
  if (decodedToken) {
    const { id } = jwt.decode(getToken());
    return id;
  }
  return '';
};

/**
 * store user token
 * @return {undefined}
 * @param {string} token
 */
export const storeToken = (token) => {
  localStorage.setItem(TOKEN_ID, token);
};

/**
 * delete user token
 * @return {undefined}
 */
export const clearToken = () => {
  localStorage.setItem(TOKEN_ID, '');
};

/**
 * check if user token is valid
 * @return {bool} true|false
 */
export const hasToken = () => {
  const token = getToken();
  const decodedToken = jwt.decode(token);
  if (decodedToken) {
    const { exp } = decodedToken;
    const date = new Date();
    if (exp < Math.floor(date.getTime() / 1000)) {
      // user authentication expired, user has no token
      return false;
    }
    return true;
  }
  // dispatch user authenticated, user has token
  return false;
};


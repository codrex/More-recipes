import jwt from 'jsonwebtoken';

export const TOKEN_ID = 'MRAToken';
export const getToken = () => localStorage.getItem(TOKEN_ID);

/**
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
 * @return {undefined}
 * @param {string} token
 */
export const storeToken = (token) => {
  localStorage.setItem(TOKEN_ID, token);
};

/**
 * @return {undefined}
 */
export const clearToken = () => {
  localStorage.setItem(TOKEN_ID, '');
};

/**
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


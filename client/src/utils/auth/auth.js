import jwt from 'jsonwebtoken';

export const TOKEN_ID = 'MRAToken';

export const getToken = () => localStorage.getItem(TOKEN_ID);

export const getId = () => {
  const token = getToken();
  const decodedToken = jwt.decode(token);
  if (decodedToken) {
    const { id } = jwt.decode(getToken());
    return id;
  }
  return '';
};

export const storeToken = (token) => {
  localStorage.setItem(TOKEN_ID, token);
};

export const clearToken = () => {
  localStorage.setItem(TOKEN_ID, '');
};

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


import jwt from 'jsonwebtoken';
import { storeToken, TOKEN_ID, getToken, getId, hasToken } from '../index';


const token = jwt.sign({ id: 1 }, 'test');
// eslint-disable-next-line max-len
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTA3NjIzMjAxLCJleHAiOjE1MDc3OTYwMDF9.Cqmo4LbcoqlKl3a4NRnDvGibBFkMdTk8gzg8uNdMg8k';

describe('auth.js', () => {
  test('should store token in local storage', () => {
    storeToken(token);
    expect(localStorage.getItem(TOKEN_ID)).toEqual(token);
  });
  test('should return token stored from the local storage', () => {
    storeToken(token);
    expect(getToken()).toEqual(token);
  });
  test('should return id gotten from the token stored in the local storage',
    () => {
      storeToken(token);
      expect(getId(getToken())).toEqual(1);
    });
  test('should return  true when token has not expired', () => {
    storeToken(token);
    expect(hasToken()).toEqual(true);
  });
  test('should return false when token is not available', () => {
    storeToken('');
    expect(hasToken()).toEqual(false);
  });
  test('should return false when token has expired', () => {
    storeToken(expiredToken);
    expect(hasToken()).toEqual(false);
  });
});

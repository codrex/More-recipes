import validate from 'validate.js';
import constraint from './constraint';

export const validateLogin = (data) => {
  const error = {};
  const username = validate.single(data.username, constraint.username);
  const password = validate.single(data.password, constraint.password);

  if (username)error.username = username;
  if (password)error.password = password;
  return error;
};
export const validateSignup = (data) => {
  const error = {};
  const username = validate.single(data.username, constraint.username);
  const password = validate.single(data.password, constraint.password);
  const email = validate.single(data.email, constraint.email);

  if (data.password !== data.reEnterPassword)error.reEnterPassword = 'Password mis-match';
  if (username)error.username = username;
  if (password)error.password = password;
  if (email)error.email = email;
  return error;
};

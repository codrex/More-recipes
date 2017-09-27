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
export const hasRecipeNameAndCategory = (data) => {
  const error = {};
  const recipeName = validate.single(data.recipeName, constraint.recipe('recipeName'));
  const category = validate.single(data.category, constraint.recipe('category'));

  if (recipeName)error.recipeName = recipeName[0].replace('recipeName', 'recipe name');
  if (category)error.category = category;
  return error;
};

// this validation function validates ingredients or directions
// depending on the value present.
export const validateItems = (value) => {
  const error = {};
  const ingredient = validate.single(value.ingredient,
    constraint.recipe('ingredient'));
  const direction = validate.single(value.direction,
    constraint.recipe('direction'));

  if (ingredient)error.ingredient = ingredient[0];
  if (direction)error.direction = direction[0];

  return error;
};

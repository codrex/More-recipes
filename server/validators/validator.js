import validate from 'validate.js';
import constraint from './constraints.js';
import bcrypt from 'bcrypt-nodejs';

// this function will process the report gotten from the validator
const processValidationResult = (result) => {
  const valid = result === undefined;
  return valid && { valid } || !valid && { valid, error: result };
};

const validator = (obj, constraints) => {
  const result = validate(obj, constraints);
  return processValidationResult(result);
};

const validateSignup = (obj) => validator(obj, constraint.signupConstraint);
const validateRecipes = (obj) => validator(obj, constraint.createRecipeConstraint);
const validateId = (obj) => validator(obj, constraint.idConstraint);
const validateLogin = (obj) => validator(obj, constraint.loginWithUsernameConstraint);
const validateReview = (obj) => validator(obj, constraint.reviewConstraint);
const comparePwd = (hash, password) => bcrypt.compareSync(password, hash);

// custom validator that check for space separated string
validate.validators.noSpace = (value) => {
  if (typeof value === 'string') {
    if (value.split(' ').length > 1) {
      return 'can not be space separated';
    }
  }
  return undefined;
};

// custom validator that check if a string has more than one word
validate.validators.atLeastTwoWord = (value) => {
  if (typeof value === 'string') {
    if (value.split(' ').length < 2) {
      return 'must be aleast two words';
    }
  }
  return undefined;
};

// custom validator to check if an array is an array of string
validate.validators.stringArray = (value) => {
  if (Array.isArray(value)) {
    if (value.length < 1) return 'array can only contain type string';
    // check if value is an array
    const result = value.every(elem => typeof elem === 'string');
    return !result && 'array can only contain type string' || result && undefined;
  }
  return 'element is not an array';
};

export {
  validateLogin,
  validateSignup,
  validateRecipes,
  comparePwd,
  validate,
  constraint,
  validateId,
  validateReview,
};

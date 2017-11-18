import validate from 'validate.js';
import constraint from './constraints';
import bcrypt from 'bcrypt-nodejs';
import { sendValidationError } from '../reply/reply';


// this function will process the report gotten from the validator
const processValidationResult = (result) => {
  const valid = result === undefined;
  return (valid && { valid }) || (!valid && { valid, error: result });
};

const validator = (obj, constraints) => {
  const result = validate(obj, constraints);
  return processValidationResult(result);
};

const isWords = word => {
  if (typeof word === 'string') {
    if (word.trim().split(' ').length > 1) {
      return true;
    }
  }
  return false;
};

// custom validator that check for space separated string
validate.validators.noSpace = (value) => {
  if (isWords(value)) {
    return 'can not be space separated';
  }
  return undefined;
};

// custom validator that check for space separated string
validate.validators.words = (value) => {
  if (isWords(value)) {
    return undefined;
  }
  return 'must be more than one word';
};

// custom validator to check if an array is an array of string
validate.validators.stringArray = (value) => {
  if (Array.isArray(value)) {
    if (value.length < 1) return 'array can only contain type string';
    // check if value is an array
    const result = value.every(elem => typeof elem === 'string');
    return (!result && 'array can only contain type string') || (result && undefined);
  }
  return 'element is not an array';
};

// validates user registration data
const validateSignup = obj => validator(obj, constraint.signupConstraint);

// validates user data during user profile update
const validateProfileUpdate = obj => validator(obj, constraint.profileUpdateConstraint);

// validates create recipe data
const validateRecipes = obj => validator(obj, constraint.createRecipeConstraint);

const validateId = obj => validator(obj, constraint.idConstraint);

// validates user login data
const validateLogin = obj => validator(obj, constraint.loginWithUsernameConstraint);

const validateReview = obj => validator(obj, constraint.reviewConstraint);

const comparePassword = (hash, password) => bcrypt.compareSync(password, hash);

const validateVote = obj => validator(obj, constraint.voteConstraint);

const validationHandler = (obj, validationFunction, req, res, next) => {
  const isValid = validationFunction(obj);
  if (isValid.valid) {
    req.body = obj;
    next();
  } else {
    sendValidationError(res, isValid);
  }
};

export {
  validateLogin,
  validateSignup,
  validateRecipes,
  validateProfileUpdate,
  comparePassword,
  validate,
  constraint,
  validateId,
  validateReview,
  validateVote,
  validationHandler,
};

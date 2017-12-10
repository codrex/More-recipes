import validate from 'validate.js';
import bcrypt from 'bcrypt-nodejs';
import constraint from './constraints';
import { sendValidationError } from '../reply/reply';


// this function will process the report gotten from the validator
const processValidationResult = (result) => {
  const valid = result === undefined;
  return (valid && {
    valid
  }) || (!valid && {
    valid, error: result
  });
};

const validator = (obj, constraints) => {
  const result = validate(obj, constraints);
  return processValidationResult(result);
};

const isWords = (word) => {
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
    const result = value.every(elem => typeof elem === 'string');
    return (!result && 'array can only contain type string') || (result && undefined);
  }
  return 'element is not an array';
};

validate.validators.isString = (value) => {
  if (typeof value === 'string') return undefined;
  return 'can only be a string';
};

const validateSignup = obj => validator(obj, constraint.signupConstraint);

const validateProfileUpdate = obj => validator(obj, constraint.profileUpdateConstraint);

const validateRecipes = obj => validator(obj, constraint.createRecipeConstraint);

const validateId = obj => validator(obj, constraint.idConstraint);

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

import validate from 'validate.js';
import constraints from './constraints';
import { sendValidationError } from '../responder';

/**
 * @description this function will process the report gotten from the validator
 * @return {object} result
 * @param {undefined | string} result
 */
const processResult = (result) => {
  const valid = result === undefined;
  return (valid && {
    valid
  }) || (!valid && {
    valid, error: result
  });
};

/**
 *@return {object} result
 * @param {object} value
 * @param {object} constraint
 */
const validator = (value, constraint) => {
  const result = validate(value, constraint);
  return processResult(result);
};

/**
 * @return {bool} true|false
 * @param {String} word
 */
const isWords = (word) => {
  if (typeof word === 'string') {
    if (word.trim().split(' ').length > 1) {
      return true;
    }
  }
  return false;
};

/**
 * @description custom validator that check for space separated string
 * @return {String|undefined} error message
 * @param {String} value
 */
validate.validators.noSpace = (value) => {
  if (isWords(value)) {
    return 'can not be space separated';
  }
  return undefined;
};

/**
 * @description custom validator that check for space separated string
 * @return {String|undefined} error message
 * @param {String} value
 */
validate.validators.words = (value) => {
  if (isWords(value)) {
    return undefined;
  }
  return 'must be more than one word';
};

/**
 * @description custom validator to check if an array is an array of string
 * @return {String|undefined} error message
 * @param {Array} value
 */
validate.validators.stringArray = (value) => {
  if (Array.isArray(value)) {
    if (value.length < 1) return 'array can only contain type string';
    const result = value.every(element => typeof element === 'string');
    return (!result && 'array can only contain strings') || (result && undefined);
  }
  return 'element is not an array';
};

/**
 * @description custom validator to check if an array is an array of numbers
 * @return {String|undefined} error message
 * @param {Array} value
 */
validate.validators.numberArray = (value) => {
  if (Array.isArray(value)) {
    const result = value.every(element => !isNaN(parseInt(element, 10)));
    return (!result && 'array can only contain number ') || (result && undefined);
  }
  return 'element is not an array';
};

/**
 * @return {String|undefined} error message
 * @param {String} value
 */
validate.validators.isString = (value) => {
  if (typeof value === 'string') return undefined;
  return 'can only be a string';
};

/**
 * @return {undefined}
 * @param {Object} value
 * @param {Object} validationFunction
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const validationHandler = (value, validationFunction, req, res, next = null) => {
  const isValid = validationFunction(value);
  if (isValid.valid) {
    if (next) next();
  } else sendValidationError(res, isValid);
};

const validateSignup = value => validator(value, constraints.signupConstraint);
const validateProfileUpdate = value => validator(value, constraints.profileUpdateConstraint);
const validateRecipes = value => validator(value, constraints.createRecipeConstraint);
const validateId = value => validator(value, constraints.idConstraint);
const validateRecipeIds = value => validator(value, constraints.recipeIdsConstraint);
const validateLogin = value => validator(value, constraints.loginWithUsernameConstraint);
const validateReview = value => validator(value, constraints.reviewConstraint);
const validateVote = value => validator(value, constraints.voteConstraint);


export {
  validateLogin,
  validateSignup,
  validateRecipes,
  validateProfileUpdate,
  validate,
  constraints,
  validateId,
  validateReview,
  validateVote,
  validationHandler,
  validateRecipeIds
};

const validate = require('validate.js');
const constraint = require('./constraints.js');
const bcrypt = require('bcrypt-nodejs');


const processValidationResult = (result) => {
  const valid = result === undefined;
  let obj;
  if (valid) {
    obj = {
      valid,
    };
  } else {
    const firstObject = Object.keys(result)[0];
    obj = {
      valid,
      error: result[firstObject][0],
    };
  }
  return obj;
};
const validator = (obj, constraints) => {
  const result = validate(obj, constraints);
  return processValidationResult(result);
};
const validateSignup = (obj) => validator(obj, constraint.signupConstraint);
const validateGroupCreation = (obj) => validator(obj, constraint.createGroupConstraint);
const validateMessage = (obj) => validator(obj, constraint.messageConstraint);
const validateAll = (obj, objConstraint) => validator(obj, objConstraint);


const validateLogin = (obj) => {
  let result;
  if (obj.username === undefined) {
    result = validate(obj, constraint.loginWithEmailConstraint);
  } else if (obj.email === undefined) {
    result = validate(obj, constraint.loginWithUsernameConstraint);
  } else {
    result = validate(obj, constraint.loginWithUsernameConstraint);
  }
  return processValidationResult(result, obj);
};

const cleanUp = (whitelist, attrs) => validate.cleanAttributes(attrs, whitelist);
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
validate.validators.atLeastTwoWord = (value) => {
  if (typeof value === 'string') {
    if (value.split(' ').length < 2) {
      return 'must be aleast two words';
    }
  }
  return undefined;
};

module.exports = {
  validateGroupCreation,
  validateLogin,
  validateMessage,
  validateSignup,
  cleanUp,
  comparePwd,
  validateAll,
  validate,
  constraint,
};


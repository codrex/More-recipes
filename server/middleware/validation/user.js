import {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validationHandler,
  validateId
} from '../../utils/validators';

/**
 * @name validateSignupData
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateSignupData = (req, res, next) => {
  validationHandler({
    ...req.body
  }, validateSignup, req, res, next);
};


/**
 * @name validateUpdate
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateUpdate = (req, res, next) => {
  const updateData = {
    username: req.body.username || req.user.username,
    fullname: req.body.fullname || req.user.fullname,
    email: req.body.email || req.user.email,
  };
  validationHandler(updateData, validateProfileUpdate, req, res, next);
};

/**
 * @name validateLoginData
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateLoginData = (req, res, next) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  validationHandler(loginData, validateLogin, req, res, next);
};

/**
 * @name validateUserId
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
export const validateUserId = (req, res, next) => {
  const id = {
    id: req.params.id,
  };
  validationHandler(id, validateId, req, res, next);
};

import {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validationHandler,
  validateId
} from '../../validators/validator';

// This function validates signup inputs
export const validateSignupData = (req, res, next) => {
  validationHandler({
    ...req.body
  }, validateSignup, req, res, next);
};

// This function validates profile update data
export const validateUpdate = (req, res, next) => {
  const updateData = {
    username: req.body.username || req.user.username,
    fullname: req.body.fullname || req.user.fullname,
    email: req.body.email || req.user.email,
  };
  validationHandler(updateData, validateProfileUpdate, req, res, next);
};

// This function validates signin inputs
export const validateLoginData = (req, res, next) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  validationHandler(loginData, validateLogin, req, res, next);
};

// This function validates  user id gotten from req.params
export const validateUserId = (req, res, next) => {
  const id = {
    id: req.params.id,
  };
  validationHandler(id, validateId, req, res, next);
};

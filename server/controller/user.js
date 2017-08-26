import db from '../models/index';
import { validateSignup } from '../validators/validator.js';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';
const Users = db.Users;
const log = console.log;

export const validateSignupData = (req, res, next) => {
  const signupData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };
  const validate = validateSignup(signupData);
  if (validate.valid) {
    req.signupData = signupData;
    next();
  } else {
    log(validate.error);
    sendValidationError(res, validate);
  }
};

export const emailExist = (req, res, next) => {
  Users.findOne({
    where: { email: req.body.email },
  }).then(user => {
    if (user) {
      sendFail(res, 400, 'This email already exist in our system');
    } else {
      next();
    }
  });
};
export const usernameExist = (req, res, next) => {
  Users.findOne({
    where: { username: req.body.username },
  }).then(user => {
    if (user) {
      sendFail(res, 400, 'This username already exist in our system');
    } else {
      next();
    }
  });
};

export const create = (req, res, next) => {
  Users.create(req.signupData)
    .then((user) => {
      req.idToFetchUser = user.dataValues.id;
      next();
    }).catch((error) => {
      log(error);
      serverError(res);
    });
};
export const fetchUser = (req, res) => {
  Users.findOne({
    where: { id: req.idToFetchUser },
    attributes: ['id', 'email', 'username'],
  }).then(user => {
    if (user) {
      sendSuccess(res, 200, 'User', user.dataValues);
    } else {
      sendFail(res, 404, 'user not found');
    }
  }).catch(error => {
    log(error);
    serverError(res);
  });
};

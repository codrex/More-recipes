import db from '../models/index';
import { validateSignup, validateLogin, comparePwd } from '../validators/validator.js';
import { sendValidationError, serverError, sendSuccess, sendFail } from '../reply/reply';
import { generateToken } from '../auth/auth';
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
    req.body = signupData;
    next();
  } else {
    log(validate.error);
    sendValidationError(res, validate);
  }
};
export const validateLoginData = (req, res, next) => {
  const loginData = {
    username: req.body.username,
    password: req.body.password,
  };
  const validate = validateLogin(loginData);
  if (validate.valid) {
    req.loginData = loginData;
    next();
  } else {
    log(validate.error);
    sendValidationError(res, validate);
  }
};
export const authUser = (req, res, next) => {
  Users.findOne({
    where: {
      username: req.loginData.username,
    },
  }).then(user => {
    if (!user) {
      sendFail(res, 400, 'invalid username or password');
      return;
    }
    const hash = user.dataValues.password;
    if (user && comparePwd(hash, req.loginData.password)) {
      req.loggedInUser = user.dataValues;
      next();
    } else {
      sendFail(res, 400, 'invalid username or password');
    }
  }).catch(error => {
    log(error);
    serverError(res);
  });
};

export const sendDataWithToken = (req, res) => {
  const token = generateToken({ id: req.loggedInUser.id });
  delete req.loggedInUser.id;
  delete req.loggedInUser.password;
  req.loggedInUser.token = token;
  log(token, req.loggedInUser);
  sendSuccess(res, 200, 'User', req.loggedInUser);
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
  Users.create(req.body)
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

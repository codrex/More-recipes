import jwt from 'jsonwebtoken';
import { sendFail } from '../utils/responder';
import { TOKEN_EXPIRATION_TIME } from '../constants';

const secret = process.env.secret;

/**
 * @name generateToken
 * @description  generate jwt token
 * @function
 * @param {Object} dataToEncode
 * @return {string} token
 */
const generateToken = dataToEncode => jwt.sign(dataToEncode, secret, {
  expiresIn: TOKEN_EXPIRATION_TIME
});

/**
 * @name getToken
 * @description  gets jwt token from the request object
 * @function
 * @param {Object} req - Express request object
 * @return {string} token
 */
const getToken = req => req.body.Authorization || req.query.Authorization ||
req.headers.authorization;

/**
 * @name verifyToken
 * @description  verifies a user's jwt token
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Object} next - Express next middleware function
 * @return {*} void
 */
const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          sendFail(res, 401, 'Sorry, current session has expired, please login to continue');
        } else {
          sendFail(res, 401, 'Sorry, authentication failed, you need to login or register');
        }
        return;
      }
      req.requestId = decoded.id;
      next();
    });
  } else {
    sendFail(res, 401, 'Sorry, authentication failed, you need to login or register');
  }
};

export {
  generateToken,
  verifyToken,
};


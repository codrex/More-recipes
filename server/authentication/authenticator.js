import jwt from 'jsonwebtoken';
import { sendFail } from '../utils/responder';

const secret = process.env.secret;
const generateToken = dataToencode => jwt.sign(dataToencode, secret, {
  expiresIn: '2d'
});
const getToken = req => req.body.Authorization || req.query.Authorization ||
req.headers.authorization;

const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          sendFail(res, 401, 'Sorry, current session has expired, please login to continue');
        } else {
          sendFail(res, 403, 'Sorry, authentication failed, you need to login or register');
        }
        return;
      }
      req.requestId = decoded.id;
      next();
    });
  } else {
    sendFail(res, 403, 'Sorry, authentication failed, you need to login or register');
  }
};

export {
  generateToken,
  verifyToken,
};


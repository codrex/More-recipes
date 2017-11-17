import jwt from 'jsonwebtoken';
import { sendFail } from '../reply/reply';

const secret = process.env.secret || 'andelabootcamprexogbemudiaosazuwa';
const generateToken = dataToencode => jwt.sign(dataToencode, secret, { expiresIn: '2d' });
const getToken = req => req.body.Authorization || req.query.Authorization ||
req.headers.authorization;

const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        sendFail(res, 401, err.message);
        return;
      }
      req.requestId = decoded.id;
      next();
    });
  } else {
    sendFail(res, 403, 'not allowed to access path without authorization');
  }
};

export {
  generateToken,
  verifyToken,
};


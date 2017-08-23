const jwt = require('jsonwebtoken');
const secret = require('../config/config').secret;


const generateToken = (dataToencode) => jwt.sign(dataToencode, secret, { expiresIn: '30m' });

const getToken = (req) => req.body.Authorization || req.query.Authorization ||
req.headers.authorization;

const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          status: 'fail',
          error: err.message,
        });
        res.end();
        return;
      }
      req.requestId = decoded.id;
      next();
    });
  } else {
    res.status(403).send({
      status: 'fail',
      error: 'not allowed to access path without authorization',
    });
    res.end();
  }
};

module.exports = {
  generateToken,
  verifyToken,
};


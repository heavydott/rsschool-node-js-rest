const { CustomRestError } = require('../errors/not-found-error');
const { UNAUTHORIZED } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const authVerify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new CustomRestError({
      status: UNAUTHORIZED,
      message: 'No Authorization headers!'
    });
  }
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    throw new CustomRestError({
      status: UNAUTHORIZED,
      message: 'No Bearer!'
    });
  } else {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        throw new CustomRestError({
          status: UNAUTHORIZED,
          message: 'Token invalid!'
        });
      }
      req.user = user;
      next();
    });
  }
};

module.exports = { authVerify };

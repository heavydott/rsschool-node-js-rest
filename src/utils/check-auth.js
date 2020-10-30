const { catchDecorator } = require('./error-handling');
const jwt = require('jsonwebtoken');

const checkToken = catchDecorator(async (req, res, next) => {
  console.log('authorization = ', req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, err => {
      if (err) {
        const error = new Error();
        error.status = 401;
        throw error;
      } else {
        return next();
      }
    });
  } else {
    const error = new Error();
    error.status = 401;
    throw error;
  }
});

module.exports = { checkToken };

const {
  INTERNAL_SERVER_ERROR,
  getStatusText,
  getReasonPhrase
} = require('http-status-codes');
const { errorLog } = require('./logging');
const { CustomRestError } = require('../errors/not-found-error');

const errorHandler = async (err, req, res, next) => {
  console.log(err);
  switch (true) {
    case err instanceof CustomRestError: {
      const status = err.status;
      errorLog(JSON.stringify({ status, message: getStatusText(status) }), req);
      res.status(status).end(getStatusText(status));
      break;
    }
    default: {
      const status = err.status;
      errorLog(
        JSON.stringify({
          status,
          message: getReasonPhrase(INTERNAL_SERVER_ERROR)
        }),
        req
      );
      res
        .status(INTERNAL_SERVER_ERROR)
        .send(getReasonPhrase(INTERNAL_SERVER_ERROR));
    }
  }
  next();
};

const catchDecorator = handler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
};

module.exports = { errorHandler, catchDecorator };

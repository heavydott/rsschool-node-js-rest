const { StatusCodes, getStatusText } = require('http-status-codes');
const AppError = require('./app-error');

const getErrorConstructor = e =>
  (e.constructors && e.constructors.name) || 'Error';

const getMessage = e => e.message || e;

const errorHandler = (error, req, res, next) => {
  console.error(`${getErrorConstructor(error)}: ${getMessage(error)}`);
  if (error instanceof AppError) {
    res
      .status(error.httpCode)
      .send(error.message || getStatusText(error.httpCode));
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send(getStatusText(StatusCodes.INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = errorHandler;

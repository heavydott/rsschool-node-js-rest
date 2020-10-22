const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { errorLog } = require('./logging');

const errorHandler = async (err, req, res, next) => {
  if (err) {
    const status = err.status ? err.status : INTERNAL_SERVER_ERROR;
    errorLog(JSON.stringify({ status, message: getStatusText(status) }), req);
    res.status(status).end(getStatusText(status));
  }
  next();
};

module.exports = { errorHandler };

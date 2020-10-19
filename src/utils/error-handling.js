const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { errorLog } = require('./logging');

const errorHandler = async (err, req, res) => {
  if (err) {
    err.status = getStatusText(INTERNAL_SERVER_ERROR);
    err.statusCode = INTERNAL_SERVER_ERROR;
    errorLog(err, req, res);
    res.status(err.statusCode).send(err.status);
  }
};

module.exports = { errorHandler };

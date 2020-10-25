const { NOT_FOUND } = require('http-status-codes');

class CustomRestError extends Error {
  constructor({ status = NOT_FOUND, message }) {
    super(message);
    this.status = status;
  }
}

module.exports = { CustomRestError };

const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { collection: 'users' }
);

const toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

module.exports = {
  User: mongoose.model('users', User),
  toResponse
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const uuid = require('uuid');

const User = new Schema(
  {
    name: String,
    login: String,
    password: String
  },
  { collection: 'users' }
);

/* class UserC {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static fromRequest(body) {
    return new User(body);
  }
}*/

module.exports = mongoose.model('users', User);

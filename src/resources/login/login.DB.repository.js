const { User } = require('../users/user.model');
const bcrypt = require('bcrypt');
const { FORBIDDEN } = require('http-status-codes');
const { CustomRestError } = require('../../errors/not-found-error');

const validate = async ({ login, password }) => {
  const user = await User.findOne({ login });
  try {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      return { login: user.login, userId: user._id };
    }
    throw new CustomRestError({
      status: FORBIDDEN,
      message: 'Forbidden, invalid login or password'
    });
  } catch (err) {
    throw new CustomRestError({
      status: FORBIDDEN,
      message: 'Forbidden, invalid login or password'
    });
  }
};

module.exports = { validate };

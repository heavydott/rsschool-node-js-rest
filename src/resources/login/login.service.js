const loginRepo = require('./login.DB.repository');
const jwt = require('jsonwebtoken');

const getToken = async user => {
  const data = await loginRepo.validate(user);
  const expiration = '1h';
  const signature = process.env.JWT_SECRET_KEY;
  const token = await jwt.sign(data, signature, {
    expiresIn: expiration
  });
  return token;
};

module.exports = { getToken };

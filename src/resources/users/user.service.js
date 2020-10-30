const usersRepo = require('./user.DB.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
// eslint-disable-next-line no-sync
const salt = bcrypt.genSaltSync(saltRounds);

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = id => usersRepo.remove(id);

const save = user => {
  // eslint-disable-next-line no-sync
  user.password = bcrypt.hashSync(user.password, salt);
  return usersRepo.save(user);
};

const update = (id, user) => usersRepo.update(id, user);

const getToken = async (login, password) => {
  if (!login || !password) {
    return null;
  }
  console.log('user pass from login before = ', password);
  // eslint-disable-next-line no-sync
  console.log('user pass test = ', bcrypt.hashSync('admin', salt));
  // eslint-disable-next-line no-sync
  password = bcrypt.hashSync(password, salt);
  const user = await usersRepo.getForAuth(login, password);
  console.log('user pass from login = ', password);
  console.log('user pass for token = ', user.password);
  if (user) {
    const payload = { sub: user._id, login };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 10000
    });
    return token;
  }
};

module.exports = { getAll, get, remove, save, update, getToken };

const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const { CustomRestError } = require('../../errors/not-found-error');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  console.log(user);
  if (!user) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return user;
};

const getForAuth = async (login, password) => User.findOne({ login, password });

const remove = async id => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  await Task.updateMany({ userId: id }, { userId: null });
  return user;
};

const save = async user => await User.create(user);
// const save = async user => {
//   await User.create(user);
//   return user;
// };

const update = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user);
  if (!updatedUser) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return updatedUser;
};

module.exports = { getAll, get, getForAuth, remove, save, update };

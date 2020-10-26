const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const { CustomRestError } = require('../../errors/not-found-error');
const ENTITY_NAME = 'user';

const getAll = async () => User.find({});

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return user;
};

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

const save = async user => User.create(user);

const update = async (id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user);
  if (!updatedUser) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return updatedUser;
};

module.exports = { getAll, get, remove, save, update };

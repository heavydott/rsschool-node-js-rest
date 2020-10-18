const DB = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Users';
const AppError = '../../utils/app-error';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);

  if (!user) {
    throw new AppError(`User with id=${id} not found`);
  }

  return user;
};

const remove = async id => {
  // if(!(await DB.removeEntity(TABLE_NAME, id))) {
  //   throw new Error();
  // }
  return DB.removeEntity(TABLE_NAME, id);
};

const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};

const update = async (id, user) => {
  user.id = id;
  const updatedUser = DB.updateEntity(TABLE_NAME, id, user);
  if (!updatedUser) {
    throw new Error();
  }
  return updatedUser;
};

module.exports = { getAll, get, remove, save, update };

const DB = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Users';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const user = await DB.getEntity(TABLE_NAME, id);
  return user;
};

const remove = async id => {
  return DB.removeEntity(TABLE_NAME, id);
};

const save = async user => {
  return DB.saveEntity(TABLE_NAME, user);
};

const update = async (id, user) => {
  user.id = id;
  const updatedUser = DB.updateEntity(TABLE_NAME, id, user);
  return updatedUser;
};

module.exports = { getAll, get, remove, save, update };

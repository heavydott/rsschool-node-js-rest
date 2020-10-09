const User = require('../resources/users/user.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: () => {},
  fixBoardsStructure: () => {},
  fixTasksStructure: () => {}
};

(() => {
  for (let i = 0; i < 8; i++) {
    db.Users.push(new User());
  }
})();

const getAllEntities = tableName => {
  return db[tableName].filter(entity => entity);
};

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    console.error(
      `The DB data is damaged. Table: ${tableName}, Entity ID: ${id}`
    );
    throw new Error();
  } else if (entities.length === 0) {
    console.error(`There is no entity. Table: ${tableName}, Entity ID: ${id}`);
    throw new Error();
  }
  return entities[0];
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (entity) {
    const index = db[tableName].indexOf(entity);
    // db[tableName].splice(index, 1);
    db[tableName] = [
      ...db[tableName].slice(0, index),
      ...(db[tableName].length > index + 1
        ? db[tableName].slice(index + 1)
        : [])
    ];
  }
  return entity;
};

const saveEntity = (tableName, entity) => {
  db[tableName].push(entity);
  return getEntity(tableName, entity.id);
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (oldEntity) {
    db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
  }
  return getEntity(tableName, id);
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};

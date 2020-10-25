const { CustomRestError } = require('../errors/not-found-error');
// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
// const Task = require('../resources/tasks/task.model');

const db = {
  Users: [],
  Boards: [],
  Tasks: [],
  fixUsersStructure: user => {
    if (user) {
      db.Tasks.filter(task => task).forEach(task => {
        task.userId = task.userId === user.id ? null : task.userId;
      });
    }
  },
  fixBoardsStructure: board => {
    if (board) {
      db.Tasks.filter(task => task && task.boardId === board.id).forEach(
        task => (db.Tasks[db.Tasks.indexOf(task)] = undefined)
      );
    }
  },
  fixTasksStructure: task => {
    console.log(task);
  }
};

/* (() => {
  for (let i = 0; i < 8; i++) {
    db.Users.push(new User());
  }
  const board = new Board();
  db.Boards.push(board);
  db.Tasks.push(
      new Task({ boardId: board.id, userId: db.Users[0].id }),
      new Task({ boardId: board.id, userId: db.Users[0].id })
  );
})();*/

const getAllEntities = tableName => {
  return db[tableName].filter(entity => entity);
};

const getEntity = (tableName, id) => {
  const entities = db[tableName]
    .filter(entity => entity)
    .filter(entity => entity.id === id);

  if (entities.length > 1) {
    throw new CustomRestError({
      message: `The DB data is damaged. Table: ${tableName}, Entity ID: ${id}`
    });
  } else if (entities.length === 0) {
    throw new CustomRestError({
      message: `There is no entity. Table: ${tableName}, Entity ID: ${id}`
    });
  }

  return entities[0];
};

const removeEntity = (tableName, id) => {
  const entity = getEntity(tableName, id);
  if (!entity) {
    throw new CustomRestError({
      message: `There is no entity. Table: ${tableName}, Entity ID: ${id}`
    });
  }
  db[`fix${tableName}Structure`](entity);
  const index = db[tableName].indexOf(entity);
  db[tableName].splice(index, 1);
  return entity;
};

const saveEntity = (tableName, entity) => {
  if (entity) {
    db[tableName].push(entity);
    return getEntity(tableName, entity.id);
  }
  throw new CustomRestError({ message: 'There is no entity' });
};

const updateEntity = async (tableName, id, entity) => {
  const oldEntity = getEntity(tableName, id);
  if (!oldEntity) {
    throw new CustomRestError({
      message: `There is no entity. Table: ${tableName}, Entity ID: ${id}`
    });
  }
  db[tableName][db[tableName].indexOf(oldEntity)] = { ...entity };
  return getEntity(tableName, id);
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  saveEntity,
  updateEntity
};

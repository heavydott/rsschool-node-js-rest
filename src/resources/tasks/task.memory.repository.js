const DB = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Tasks';

const getAll = async boardId => {
  const tasks = DB.getAllEntities(TABLE_NAME);
  const boardTasks = tasks
    .filter(task => task)
    .filter(task => task.boardId === boardId);
  return boardTasks;
};

const get = async (id, boardId) => {
  const task = await DB.getEntity(TABLE_NAME, id);

  if (!task) {
    return null;
  } else if (task.boardId !== boardId) {
    return null;
  }

  return task;
};

const remove = async (id, boardId) => {
  console.log(boardId);
  if (!(await DB.removeEntity(TABLE_NAME, id))) {
    throw new Error();
  }
  /* const task = await DB.getEntity(TABLE_NAME, id);

    if (!task && task.boardId !== boardId) {
        throw new Error();
    }

    const task1 = await DB.removeEntity(TABLE_NAME, id);

    if(task === task1) {
        console.log('yes');
    } else {
        console.log('no');
    }

    return task1;*/
};

const save = async (task, boardId) => {
  task.boardId = boardId;
  return DB.saveEntity(TABLE_NAME, task);
};

const update = async (id, boardId, task) => {
  task.id = id;
  task.boardId = boardId;
  const updatedTask = DB.updateEntity(TABLE_NAME, id, task);
  if (!updatedTask) {
    throw new Error();
  }
  return updatedTask;
};

module.exports = { getAll, get, remove, save, update };

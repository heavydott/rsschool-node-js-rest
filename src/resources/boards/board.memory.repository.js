const DB = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  console.log('id board', id);
  console.log('board', board);

  if (!board) {
    return null;
  }

  return board;
};

const remove = async id => {
  // if(!(await DB.removeEntity(TABLE_NAME, id))) {
  //   throw new Error();
  // }
  return DB.removeEntity(TABLE_NAME, id);
};

const save = async board => {
  return DB.saveEntity(TABLE_NAME, board);
};

const update = async (id, board) => {
  board.id = id;
  const updatedBoard = DB.updateEntity(TABLE_NAME, id, board);
  if (!updatedBoard) {
    throw new Error();
  }
  return updatedBoard;
};

module.exports = { getAll, get, remove, save, update };

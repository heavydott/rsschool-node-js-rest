const DB = require('../../utils/inMemoryDb');
const TABLE_NAME = 'Boards';

const getAll = async () => {
  return DB.getAllEntities(TABLE_NAME);
};

const get = async id => {
  const board = await DB.getEntity(TABLE_NAME, id);
  if (!board) {
    return null;
  }
  return board;
};

const remove = async id => {
  return DB.removeEntity(TABLE_NAME, id);
};

const save = async board => {
  return DB.saveEntity(TABLE_NAME, board);
};

const update = async (id, board) => {
  board.id = id;
  const updatedBoard = DB.updateEntity(TABLE_NAME, id, board);
  return updatedBoard;
};

module.exports = { getAll, get, remove, save, update };

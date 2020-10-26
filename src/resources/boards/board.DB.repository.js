const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');
const { CustomRestError } = require('../../errors/not-found-error');
const ENTITY_NAME = 'board';

const getAll = async () => Board.find({});

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return board;
};

const remove = async id => {
  const board = await Board.findByIdAndDelete(id);
  if (!board) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  await Task.deleteMany({ boardId: id });
  return board;
};

const save = async board => Board.create(board);

const update = async (id, board) => {
  const updatedBoard = await Board.findByIdAndUpdate(id, board);
  if (!updatedBoard) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return updatedBoard;
};

module.exports = { getAll, get, remove, save, update };

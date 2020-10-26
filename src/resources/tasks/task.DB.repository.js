const { Task } = require('./task.model');
const { CustomRestError } = require('../../errors/not-found-error');
const ENTITY_NAME = 'task';

const getAll = async boardId => Task.find({ boardId });

const get = async id => {
  const task = await Task.findById(id);
  if (!task) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return task;
};

const remove = async id => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return task;
};

const save = async (task, boardId) => {
  task.boardId = boardId;
  return Task.create(task);
};

const update = async (id, boardId, task) => {
  task.id = id;
  task.boardId = boardId;
  const updatedTask = await Task.findByIdAndUpdate(id, task);
  if (!updatedTask) {
    throw new CustomRestError({
      message: `There is no ${ENTITY_NAME}, Entity ID: ${id}`
    });
  }
  return updatedTask;
};

module.exports = { getAll, get, remove, save, update };

const tasksRepo = require('./task.DB.repository');

const getAll = boardId => tasksRepo.getAll(boardId);

const get = id => tasksRepo.get(id);

const remove = id => tasksRepo.remove(id);

const save = (task, boardId) => tasksRepo.save(task, boardId);

const update = (id, boardId, task) => tasksRepo.update(id, boardId, task);

module.exports = { getAll, get, remove, save, update };

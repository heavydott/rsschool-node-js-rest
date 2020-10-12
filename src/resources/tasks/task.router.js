const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id, req.params.boardId);
    res.status(200).send(Task.toResponse(task));
  } catch (e) {
    console.error(e);
    res.status(404).end('Not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.id);
  res.status(204).send('ok');
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.save(
    Task.fromRequest(req.body),
    req.params.boardId
  );
  res.status(200).send(Task.toResponse(task));
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.update(
    req.params.id,
    req.params.boardId,
    Task.fromRequest(req.body)
  );
  res.status(200).send(Task.toResponse(task));
});

module.exports = router;

const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').get(
  catchDecorator(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:id').get(
  catchDecorator(async (req, res) => {
    const task = await tasksService.get(req.params.id, req.params.boardId);
    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:id').delete(
  catchDecorator(async (req, res) => {
    const task = await tasksService.remove(req.params.id);
    res.status(204).send(Task.toResponse(task));
  })
);

router.route('/').post(
  catchDecorator(async (req, res) => {
    const task = await tasksService.save(
      Task.fromRequest(req.body),
      req.params.boardId
    );
    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:id').put(
  catchDecorator(async (req, res) => {
    const task = await tasksService.update(
      req.params.id,
      req.params.boardId,
      Task.fromRequest(req.body)
    );
    res.status(200).send(Task.toResponse(task));
  })
);

module.exports = router;

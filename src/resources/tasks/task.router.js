const router = require('express').Router({ mergeParams: true });
const { toResponse } = require('./task.model');
const tasksService = require('./task.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').get(
  catchDecorator(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.json(tasks.map(toResponse));
  })
);

router.route('/:id').get(
  catchDecorator(async (req, res) => {
    const task = await tasksService.get(req.params.id);
    res.status(200).send(toResponse(task));
  })
);

router.route('/:id').delete(
  catchDecorator(async (req, res) => {
    const task = await tasksService.remove(req.params.id);
    res.status(204).send(toResponse(task));
  })
);

router.route('/').post(
  catchDecorator(async (req, res) => {
    const task = await tasksService.save(req.body, req.params.boardId);
    res.status(200).send(toResponse(task));
  })
);

router.route('/:id').put(
  catchDecorator(async (req, res) => {
    const task = await tasksService.update(
      req.params.id,
      req.params.boardId,
      req.body
    );
    res.status(200).send(toResponse(task));
  })
);

module.exports = router;

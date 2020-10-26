const router = require('express').Router();
const { toResponse } = require('./board.model');
const boardsService = require('./board.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').get(
  catchDecorator(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(toResponse));
  })
);

router.route('/:id').get(
  catchDecorator(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(toResponse(board));
  })
);

router.route('/:id').delete(
  catchDecorator(async (req, res) => {
    const board = await boardsService.remove(req.params.id);
    res.status(204).send(toResponse(board));
  })
);

router.route('/').post(
  catchDecorator(async (req, res) => {
    const board = await boardsService.save(req.body);
    console.log(board);
    res.status(200).send(toResponse(board));
  })
);

router.route('/:id').put(
  catchDecorator(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).send(toResponse(board));
  })
);

module.exports = router;

const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').get(
  catchDecorator(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchDecorator(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/:id').delete(
  catchDecorator(async (req, res) => {
    const board = await boardsService.remove(req.params.id);
    res.status(204).send(Board.toResponse(board));
  })
);

router.route('/').post(
  catchDecorator(async (req, res) => {
    const board = await boardsService.save(Board.fromRequest(req.body));
    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchDecorator(async (req, res) => {
    const board = await boardsService.update(
      req.params.id,
      Board.fromRequest(req.body)
    );
    res.status(200).send(Board.toResponse(board));
  })
);

module.exports = router;

const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  } catch (e) {
    console.error(e);
    res.status(404).end('Not found');
  }
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.status(204).send('ok');
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.save(Board.fromRequest(req.body));
  res.status(200).send(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(
    req.params.id,
    Board.fromRequest(req.body)
  );
  res.status(200).send(Board.toResponse(board));
});

module.exports = router;

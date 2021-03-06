const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').get(
  catchDecorator(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(toResponse));
  })
);

router.route('/:id').get(
  catchDecorator(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(200).send(toResponse(user));
  })
);

router.route('/:id').delete(
  catchDecorator(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    res.status(204).send(toResponse(user));
  })
);

router.route('/').post(
  catchDecorator(async (req, res) => {
    console.log(req.body);
    const user = await usersService.save(req.body);
    console.log(user);
    res.status(200).send(toResponse(user));
  })
);

router.route('/:id').put(
  catchDecorator(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).send(toResponse(user));
  })
);

module.exports = router;

const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').get(
  catchDecorator(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchDecorator(async (req, res) => {
    const user = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').delete(
  catchDecorator(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    res.status(204).send(User.toResponse(user));
  })
);

router.route('/').post(
  catchDecorator(async (req, res) => {
    const user = await usersService.save(User.fromRequest(req.body));
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchDecorator(async (req, res) => {
    const user = await usersService.update(
      req.params.id,
      User.fromRequest(req.body)
    );
    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;

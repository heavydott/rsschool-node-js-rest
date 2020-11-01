const router = require('express').Router();
const loginService = require('./login.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').post(
  catchDecorator(async (req, res) => {
    const { login, password } = req.body;
    const token = await loginService.getToken({ login, password });
    res.json({ token });
  })
);

module.exports = router;

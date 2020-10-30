const router = require('express').Router();
const usersService = require('../users/user.service');
const { catchDecorator } = require('../../utils/error-handling');

router.route('/').post(
  catchDecorator(async (req, res) => {
    const { login, password } = req.body;
    const token = await usersService.getToken(login, password);
    console.log('token = ', token);
    if (token) {
      res.send(token);
    } else {
      const error = new Error();
      error.status = 401;
      throw error;
    }
  })
);

module.exports = router;

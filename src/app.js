const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const bodyParser = require('body-parser');

const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const { errorHandler } = require('./utils/error-handling');
const { infoLog } = require('./utils/logging');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// request logging
app.use((req, res, next) => {
  infoLog(req);
  next();
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// Команды вызова исключений!

// uncaughtException
// throw Error('Oops!');

// unhandledRejection
// Promise.reject(Error('Oops!'));

app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

// another error handler
app.all('*', (req, res) => {
  const err = new Error();
  errorHandler(err, req, res);
});

module.exports = app;

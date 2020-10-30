const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const { logger } = require('./utils/logging');
// const usersService = require('./resources/users/user.service');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => logger.error('MongoDB connection error')).once(
  'open',
  () => {
    logger.info('Successfully connect to DB');
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
      // usersService.save({
      //   name: 'admin',
      //   login: 'admin',
      //   password: 'admin'
      // });
    });
  }
);

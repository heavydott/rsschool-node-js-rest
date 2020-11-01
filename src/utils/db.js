const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { logger } = require('../utils/logging');
// const usersService = require('../resources/users/user.service');

const connectDb = connect => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', () => logger.error('MongoDB connection error')).once(
    'open',
    async () => {
      logger.info('Successfully connect to DB');
      connect();
      // db.dropDatabase('rsschool-rest-api');
      // usersService.save({ name: 'admin', login: 'admin', password: 'admin' });
    }
  );
};

module.exports = { connectDb };

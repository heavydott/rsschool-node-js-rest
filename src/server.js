const { PORT } = require('./common/config');
const app = require('./app');
const { connectDb } = require('./utils/db');

connectDb(() => {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
});

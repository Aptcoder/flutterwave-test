const express = require('express');
const loaders = require('./loaders');
const { PORT } = require('./config');
const logger = require('./utils/logger');

const app = express();
async function startServer() {
  await loaders.init({ expressApp: app });

  app.listen(PORT, () => {
    logger.info(`Server is listening at ${PORT}`);
  });
}

startServer();

module.exports = app;

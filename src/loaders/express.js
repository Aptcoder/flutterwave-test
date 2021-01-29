const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const logger = require('../utils/logger');
const router = require('../routes');
const { handleError } = require('../utils/error');

module.exports = ({ app }) => {
  app.use(cors());
  app.use(morgan('dev', { stream: logger.stream }));
  app.use(bodyParser.json());

  app.use('/', router);

  app.use((err, req, res, next) => handleError(res, err));
  return app;
};

const winston = require('winston');
const options = require('../config/logger');

const myformat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logger = winston.createLogger({
  format: myformat,
  transports: [new winston.transports.Console(options.console),
    new winston.transports.File(options.file)],
  exitOnError: false
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;

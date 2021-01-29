const path = require('path');

module.exports = {
  file: {
    level: 'info',
    filename: path.join('logs', 'app-logs.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true
  }
};

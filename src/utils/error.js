const logger = require('./logger');

class APIError extends Error {
/**
 * @constructor
 * @param {Number} statusCode - status code for the api response
 * @param {string} message - error message
 */
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (res, err) => {
  // if invalid json payload
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).send({
      message: 'Invalid JSON payload passed.',
      status: 'error',
      data: null
    });
  }
  // unexpected error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something unexpected went wrong.';
  logger.error(err);
  return res.status(statusCode).send({
    message,
    status: 'error',
    data: null
  });
};

module.exports = {
  APIError,
  handleError
};

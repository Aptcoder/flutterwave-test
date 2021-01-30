const { APIError } = require('../utils/error');
// request validator

module.exports = (() => {
  const isObject = (value) => {
    const type = typeof value;
    return type === 'object' && !!value && !Array.isArray(value);
  };

  const validator = (req, res, next) => {
    const { data, rule } = req.body;
    try {
      // are rule and data presesnt
      if (!rule || !data) {
        const field = rule ? 'data' : 'rule';
        throw new APIError(400, `${field} is required.`);
      }

      // is rule valid object
      if (!isObject(rule)) {
        throw new APIError(400, 'rule should be an object.');
      }
      if (!rule.field) {
        throw new APIError(400, 'field is required.');
      } else if (!rule.condition) {
        throw new APIError(400, 'condition is required.');
      } else if (!['eq', 'neq', 'gt', 'gte', 'contains'].includes(rule.condition)) {
        throw new APIError(400, 'condition should be one of [eq, neq, gt, gte, contains].');
      } else if (!rule.condition_value) {
        throw new APIError(400, 'condition_value is required.');
      }
      const isDataValid = isObject(data) || typeof data === 'string' || Array.isArray(data);
      if (!isDataValid) {
        throw new APIError(400, 'data should be a|an object, array or string.');
      }
      let aux_data = data;
      if (typeof data === 'string') {
        aux_data = new String(data);
      }
      if (!(rule.field in aux_data)) {
        throw new APIError(400, `field ${rule.field} is missing from data.`);
      }
      return next();
    } catch (err) {
      return next(err);
    }
  };

  return {
    requestValidator: validator
  };
})();

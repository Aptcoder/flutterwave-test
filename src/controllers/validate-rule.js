module.exports = (() => {
  const validations = {
    eq(field, condition_value) {
      return field === condition_value;
    },
    neq(field, condition_value) {
      return field !== condition_value;
    },
    gt(field, condition_value) {
      return field > condition_value;
    },
    gte(field, condition_value) {
      return field >= condition_value;
    },
    contains(field, condition_value) {
      const isString = typeof field === 'string';
      if (isString) {
        return field.indexOf(condition_value) !== '-1';
      }
      return condition_value in field;
    }
  };

  const validateRule = (req, res, next) => {
    try {
      const { rule, data } = req.body;
      const fieldValue = data[rule.field];
      const result = validations[rule.condition](fieldValue, rule.condition_value);
      const statusCode = result ? 200 : 400;
      const message = result ? `field ${rule.field} successfully validated.` : `field ${rule.field} failed validation.`;
      const status = result ? 'success' : 'error';

      return res.status(statusCode).send({
        message,
        status,
        data: {
          validation: {
            error: result,
            field: rule.field,
            field_value: fieldValue,
            condition: rule.condition,
            condition_value: rule.condition_value
          }
        }
      });
    } catch (err) {
      return next(err);
    }
  };

  return {
    validate: validateRule
  };
})();

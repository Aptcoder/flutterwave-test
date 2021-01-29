const expressLoader = require('./express');

const init = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
};

module.exports = { init };

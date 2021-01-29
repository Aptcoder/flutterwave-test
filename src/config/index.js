module.exports = (() => {
  const development = {
    PORT: 5000,
    DB_URL: 'mongodb://127.0.0.1:27017/classboard-dev'
  };

  const production = {
    PORT: process.env.PORT,
    DB_URL: null
  };

  const test = {
    PORT: 5000,
    DB_URL: 'mongodb://127.0.0.1:27017/classboard-test'
  };

  const env = process.env.NODE_ENV;
  if (env === 'production') {
    return production;
  }
  if (env === 'testing') {
    return test;
  }

  return development;
})();

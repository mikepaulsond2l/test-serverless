const bunyan = require('bunyan');
const conf = require('../conf');

const logger = bunyan.createLogger({
  name: conf.name,
  environment: conf.environment,
  version: conf.version,
});

module.exports = logger;

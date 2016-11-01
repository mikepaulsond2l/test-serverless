// const conf = require('../conf');
const Logger = require('@d2l/content-service-worker-utils').Logger;
const version = require('@d2l/content-service-worker-utils').version;

const logger = new Logger({
  name: 'd2l-content-service-lambda-cleanup',
  environment: 'mp-test', //TODO: change this
  version,
});

module.exports = logger;

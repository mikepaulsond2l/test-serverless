require('babel-polyfill');
const S3 = require('@d2l/content-service-worker-utils').S3;
const deleteOrMoveFiles = require('./utils/delete-or-move-files');
const logger = require('./utils/logger');
const conf = require('./conf');

module.exports.cleanup = (event, context, callback) => {
  const process = (bucket, keys, trashPrefix) => {
    const s3 = new S3({ logger });
    const deleteFiles = deleteOrMoveFiles(s3, trashPrefix, conf.concurrency);

    return s3.expandKeys(bucket, keys)
      .then((allKeys) => {
        logger.info(`keys to delete: [${allKeys}]`);
        let progressIndex = 0;
        let progressTotal = allKeys.length;

        return deleteFiles(bucket, allKeys);
      })
      .then(() => {
        const message = 'Cleanup completed successfully';
        logger.info(message);
        callback(null, { message, event });
      })
      .catch(error => {
        logger.error('Cleanup failed');
        callback(error);
      });
  };

  if (event && event.bucket && event.keys) {
    logger.info(`processing event: ${JSON.stringify(event)}`);
    process(event.bucket, event.keys, event.trashPrefix);
  } else {
    callback('Event must be providd with bucket and keys');
  }
};

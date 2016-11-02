// if (!global._babelPolyfill) {
require('babel-polyfill');
// }

const S3 = require('@d2l/content-service-worker-utils').S3;
// const deleteOrMoveFiles = require('./utils/delete-or-move-files');
// const logger = require('./utils/logger');

module.exports.cleanup = (event, context, callback) => {
  const process = (bucket, keys, trashPrefix) => {

    // const s3 = new S3({ logger });
    // const deleteFiles = deleteOrMoveFiles(s3, trashPrefix);

    // return s3.expandKeys(bucket, keys)
    //   .then((allKeys) => {
    //     this.progressIndex = 0;
    //     this.progressTotal = allKeys.length;
    //     return deleteFiles(bucket, allKeys, {
    //       onProgress: (numDeleted) => (this.progressIndex += numDeleted),
    //     });
    //   })
    //   .catch(err => {
    //     throw new WorkerError({
    //       message: err.message || err.code,
    //       type: errorTypeFromMessage(err.message || err.code),
    //     });
    //   });

    // get progress() {
    //   return 100 * (this.progressTotal
    //     ? (this.progressIndex || 0) / this.progressTotal
    //     : 1);
    // }

    const message =
      `Cleanup - bucket: [${bucket}], keys: [${keys}], trashPrefix: [${trashPrefix}]`;

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message,
      }),
    };

    callback(null, response);
  };

  process('d2l-content-dev', ['mpaulson/key/uploads']);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

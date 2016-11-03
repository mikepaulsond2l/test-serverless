const BPromise = require('bluebird');

const moveToTrash = (s3, trashPrefix, concurrency = 1) =>
  (bucket, keys, { onProgress } = {}) =>
    BPromise.map(keys, (key) =>
      s3.renameFile(bucket, key, `${trashPrefix}/${key}`)
        .then(() => onProgress && onProgress(1))
    , { concurrency });

const bulkDelete = (s3) =>
  (bucket, keys, { onProgress } = {}) =>
    s3.deleteFiles(bucket, keys)
      .then(() => onProgress && onProgress(keys.length));

module.exports = (s3, trashPrefix, concurrency) => (
  trashPrefix
    ? moveToTrash(s3, trashPrefix, concurrency)
    : bulkDelete(s3)
);

var webpack = require('webpack');

module.exports = {
  entry: './handler.js',
  target: 'node',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: __dirname,
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.node$/,
      loader: 'node-loader',
    }, {
      test: /\.md$/,
      loader: 'ignore-loader',
    }]
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
    ],
  },
};

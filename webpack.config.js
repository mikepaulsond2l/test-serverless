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
    }]
  },
  // resolve: {
  //   modulesDirectories: [
  //     'node_modules',
  //   ],
  // },
  externals: [
    'any-promise',
  ],
  // plugins: [
  //   new webpack.IgnorePlugin(/any-promise/),
  // ],
};

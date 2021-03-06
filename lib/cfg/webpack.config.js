'use strict';
const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');

const dist = path.resolve(__dirname, '../dist');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: ['./lib/src/index.js'],
  output: {
    path: dist,
    filename: 'index.js',
    libraryTarget: 'umd',
    globalObject: 'this',
    library: 'auth-mech'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      allowAsyncCycles: false,
      cwd: process.cwd()
    })
  ]
};

const webpackMerge = require('webpack-merge')
const path = require('path')

const commonConfig = require('./base.js')

/**
 * Webpack build config
 *
 * @returns {Object} - build configuration
 */
module.exports = function dev() {
  return webpackMerge(commonConfig(), {
    entry: {
      index: './src/index.js',
    },
    output: {
      path: path.join(__dirname, '/../lib'),
      filename: '[name].js',
    },
  })
}

const webpackMerge = require('webpack-merge')
const path = require('path')

const commonConfig = require('./base.js')

/**
 * Webpack dev config
 *
 * @returns {Object} - dev configuration
 */
module.exports = function dev() {
  return webpackMerge(commonConfig(), {
    entry: {
      main: './main.js',
    },
    output: {
      path: path.join(__dirname, '/../lib'),
      filename: '[name].js',
    },
    devtool: 'cheap-module-source-map',
    devServer: {
      stats: 'minimal',
      publicPath: '/lib/',
    },
  })
}

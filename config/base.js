/**
* Webpack shared base config
*
* @returns {Object} - global configuration
*/
module.exports = function base() {
  return {
    output: {
      library: 'epic-snitchy',
      libraryTarget: 'umd',
      umdNamedDefine: true,
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      }],
    },
  }
}

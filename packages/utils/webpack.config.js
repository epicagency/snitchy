const isProd = process.env.NODE_ENV === 'production';
const webpackBase = require('../../webpack.config.js');

module.exports = {
  ...webpackBase,
  entry: './src/index.js',
  output: {
    filename: isProd ? 'snitchy-utils.min.js' : 'snitchy-utils.js',
    library: 'Snitchy utils',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

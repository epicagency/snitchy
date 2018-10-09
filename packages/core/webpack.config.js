const isProd = process.env.NODE_ENV === 'production';
const webpackBase = require('../../webpack.config.js');

module.exports = {
  ...webpackBase,
  entry: './src/index.js',
  output: {
    filename: isProd ? 'snitchy.min.js' : 'snitchy.js',
    library: 'Snitchy parser',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

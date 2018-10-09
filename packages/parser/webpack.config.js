const isProd = process.env.NODE_ENV === 'production';
const webpackBase = require('../../webpack.config.js');

module.exports = {
  ...webpackBase,
  entry: './src/Parser.js',
  output: {
    filename: isProd ? 'snitchy-parser.min.js' : 'snitchy-parser.js',
    library: 'Snitchy parser',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
};

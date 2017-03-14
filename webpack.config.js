const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '/lib'),
    filename: '[name].js',
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
  devtool: 'cheap-module-source-map',
  devServer: {
    stats: 'minimal',
    publicPath: '/lib/',
  },
};

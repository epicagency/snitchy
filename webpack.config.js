const WebpackStrip = require('webpack-strip');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  // #TODO: check if this is ok…
  node: {
    fs: 'empty',
  },
  entry: './src/index.js',
  output: {
    filename: isProd ? 'snitchy.min.js' : 'snitchy.js',
    library: 'snitchy',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  mode: isProd ? 'production' : 'development',
  optimization: {
    minimize: isProd,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

if (isProd) {
  config.module.rules.push({
    test: /\.js$/,
    use: [
      { loader: WebpackStrip.loader('debug', 'console.info') },
    ],
  });
}

module.exports = config;

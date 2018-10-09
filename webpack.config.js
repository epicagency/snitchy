const WebpackStrip = require('webpack-strip');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  // #TODO: check if this is ok…
  // node: {
  //   fs: 'empty',
  // },
  // DEV set here as defaults?
  // entry: './src/index.js',
  // output: {
  //   filename: isProd ? 'snitchy.min.js' : 'snitchy.js',
  //   library: 'Snitchy',
  //   libraryTarget: 'umd',
  //   umdNamedDefine: true,
  // },
  mode: isProd ? 'production' : 'development',
  optimization: {
    minimize: isProd,
  },
  resolve: {
    mainFields: ['module', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs)$/,
        // DEV
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              require('@babel/plugin-proposal-class-properties'), // eslint-disable-line global-require
              require('@babel/plugin-proposal-object-rest-spread'), // eslint-disable-line global-require
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      reportFilename: '../report.html',
    }),
  ],
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

import path from 'path';
import webpack from 'webpack';
import memoryfs from 'memory-fs';

export default fixture => {
  const compiler = webpack({
    context: __dirname,
    entry: `./${fixture}`,
    output: {
      path: path.resolve(__dirname),
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /\.xlsx$/,
        use: {
          loader: path.resolve(__dirname, '../src/loader.js'),
        },
      }],
    },
  });

  compiler.outputFileSystem = new memoryfs(); // eslint-disable-line new-cap

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject(err);
      }

      resolve(stats);
    });
  });
};

const path = require('path');

module.exports = {
  entry: {
    main: './src/js/index.js',
    sw: './src/js/sw.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};

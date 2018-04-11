const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',

        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

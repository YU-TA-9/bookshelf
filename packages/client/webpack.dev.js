const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 4000,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
});

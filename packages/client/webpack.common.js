const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: 'asset/resource',
      },
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
              sourceType: 'unambiguous',
            },
          },
          { loader: 'ts-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new Dotenv({
      path: path.resolve(__dirname, `.env`),
    }),
  ],
};

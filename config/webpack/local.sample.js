const path = require('path');

const projectPath = path.resolve(__dirname, '../../');
const webpack = require('webpack');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devServer: {
    hot: true,
    contentBase: ['/', path.join(projectPath, 'build'), path.join(projectPath, 'static')],
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
    disableHostCheck: true,
    open: true,
  },
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?https://0.0.0.0:8080',
    './src/index.jsx',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new TransferWebpackPlugin([{ from: 'static', to: '/' }]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new ExtractTextPlugin({
      filename: 'bundle.css',
      allChunks: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(projectPath, 'static/index.ejs'),
      inject: 'body',
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]~~~~[hash:base64:24]',
              },
            },
          ],
        }),
      },
      {
        test: /\.pcss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[local]~~~~[hash:base64:24]',
              },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        }),
        exclude: /node_modules/,
      },
    ],
  },
};

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV,
  entry: {
    index: [
      './static/index.js',
    ],
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'isomorphic-fetch',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}}
          ],
        }),
      }, {
        test: /\.(svg)$/,
        loader: 'svg-url-loader',
      }, {
        test: /\.(ico|jpg|png|gif|eot|otf|webp|ttf|woff|woff2)$/,
        loader: 'url-loader',
        query: {limit: 8192},
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin("index.css"),
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'static'),
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.js'],
  },
};

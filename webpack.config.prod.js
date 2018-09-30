const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const config = require('./src/config/config.prod');

module.exports = {
  entry: ['babel-polyfill', './src/app.jsx'],
  devtool: null,
  output: {
    path: "./public",
    publicPath: "/",
    filename: 'app.[hash].min.js'
  },
  module: {
    loaders: [
      {
        test : /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader : 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'react-html-attrs'
          ]
        }
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=images/[name].[ext]"
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      }
    ]
  },
  resolve: {
    extensions: ['.js', ''],
    alias: {
      config: path.resolve(__dirname, './src/config/config.prod'),
      cart: path.resolve(__dirname, './src/core/helpers/Cart'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({ config: 'config', cart: 'cart' }),
    new WebpackCleanupPlugin({
      exclude: ['vendors/**/*', 'icons/**/*', '.htaccess', 'index.php', 'robots.txt'],
    }),
    new HtmlWebpackPlugin({
      title: 'JUNIMED',
      inject: false,
      template: 'src/staticFiles/index.ejs',
      externalSources: {
        css: [
          '/vendors/font-awesome/css/font-awesome.min.css',
          '/vendors/jRange/jquery.range.css',
          '/vendors/swiper/dist/css/swiper.min.css',
        ],
        js: [
          '/vendors/jquery/dist/jquery.min.js',
          '/vendors/swiper/dist/js/swiper.min.js',
          '/vendors/jRange/jquery.range-min.js',
          '//maps.googleapis.com/maps/api/js?sensor=false&key=' + config.GOOGLE_MAPS_API
        ]
      },
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    }),
    new ExtractTextPlugin("app.[hash].min.css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};

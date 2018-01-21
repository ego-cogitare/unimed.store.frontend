const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: "public",
    filename: 'app.js'
  },
  devtool: null,
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
        loaders: ['style-loader', 'css-loader']
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
      config: path.resolve(__dirname, './src/config/config.dev'),
    }
  },
  plugins: [
    new webpack.ProvidePlugin({ config: 'config' }),
    new HtmlWebpackPlugin({
      title: 'JUNIMED',
      inject: false,
      template: 'src/staticFiles/index.ejs',
      externalSources: {
        css: [
          './vendors/font-awesome/css/font-awesome.min.css',
          './vendors/jRange/jquery.range.css',
          './vendors/swiper/dist/css/swiper.min.css',
        ],
        js: [
          './vendors/jquery/dist/jquery.min.js',
          './vendors/swiper/dist/js/swiper.min.js',
          './vendors/jRange/jquery.range-min.js',
        ]
      }
    })
  ]
};

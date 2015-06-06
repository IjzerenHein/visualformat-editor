/*global module, process*/
/*eslint no-use-before-define:0 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var path = require('path');

// Support for extra commandline arguments
var argv = require('optimist')
            //--env=XXX: sets a global ENV variable (i.e. window.ENV='XXX')
            .alias('e','env').default('e','dev')
            .argv;

var config = {
  context: path.join(__dirname, 'src'),
  entry: {'bundle': './main'},
  output:{
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: isDevServer() ? '/' : ''
  },
  devServer: {
    publicPath: '/'
  },
  reload: isDevServer() ? 'localhost' : null,
  module:{
    loaders:[
      //{ test: /\.js$/,              loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.json$/,            loader: 'json-loader' },
      { test: /\.css$/,             loader: 'style-loader!css-loader' },
      { test: /\.less$/,            loader: 'style-loader!css-loader!less-loader' },
      { test: /\.(png|jpg|gif)$/,   loader: 'url-loader?limit=5000&name=[path][name].[ext]&context=./src' },
      { test: /\.eot$/,             loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /\.ttf$/,             loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /\.svg$/,             loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /\.woff$/,            loader: 'file-loader?name=[path][name].[ext]&context=./src' },
      { test: /index\.html$/,       loader: 'file-loader?name=[path][name].[ext]&context=./src' }
    ]
  },
  resolve: {
    alias: {
      'famous-flex': 'famous-flex/src'
    }
  },
  plugins:[
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require('./package.json').version),
      ENV: JSON.stringify(argv.env)
    })
  ]
};

function isDevServer() {
  return process.argv.join('').indexOf('webpack-dev-server') > -1;
}

module.exports = config;

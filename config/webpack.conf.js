var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var projectRoot = path.resolve(__dirname, '..');
var srcRoot = path.resolve(projectRoot, 'src');

module.exports = {
  devtool: 'inline-source-map',
  context: projectRoot,
  resolve: {
    extensions: ['.js']
  },
  entry: {
    app: './src/index.js',
    dependencies: './src/core/dependencies.js',
    polyfills: './src/core/polyfills.js'
  },
  output: {
    path: path.resolve(projectRoot, 'dist'),
    filename: '[name].js'
  },
  cache: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [srcRoot],
        enforce: 'pre'
      },
      { // Babel loader
        test: /\.js$/,
        loader: 'babel-loader',
        include: [srcRoot]
      },
      { // CSS loader
        test: /\.css$/,
        include: /node_modules/,
        loader: 'style!css!postcss'
      },
      { // Scss loader for assets
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css'
            }
          },
          {loader: 'extract-loader'},
          {loader: 'css-loader'},
          {loader: 'postcss-loader'},
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'compressed'
            }
          }
        ]
      },
      { // Woff loader
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      { // Font loader
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {loader: 'extract-loader'},
          {loader: 'pug-html-loader'}
        ],
        include: path.resolve(srcRoot, 'index.pug')
      },
      {
        test: /\.pug$/,
        loader: 'pug-html-loader',
        exclude: path.resolve(srcRoot, 'index.pug')
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.js($|\?)/i
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'dependencies', 'polyfills']
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          emitError: true,
          emitWarning: true,
          failOnError: false,
          configFile: path.resolve(projectRoot, '.eslintrc')
        },
        htmlLoader: {
          minimize: true
        },
        postcss: [
          require('postcss-inline-svg')({
            path: 'src/assets/icons',
            encode: false
          }),
          require('postcss-svgo')()
        ]
      }
    })
  ],
  node: {
    fs: 'empty',
    global: true,
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    contentBase: './dist',
    port: 8080,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: true,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
};

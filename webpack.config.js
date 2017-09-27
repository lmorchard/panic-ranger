const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const HOST = process.env.HOST ? HOST : 'localhost';
const PORT = process.env.PORT || 3000;
const PROJECT_DOMAIN = process.env.PROJECT_DOMAIN || null;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_GLITCH = PROJECT_DOMAIN !== null;
const SKETCHES = process.env.SKETCHES || null;

const sketches = fs.readdirSync('./src/sketches')
  .filter(fn => path.extname(fn) === '.js')
  .map(fn => path.basename(fn, '.js'));

const plugins = fs.readdirSync('./src/plugins')
  .filter(fn => path.extname(fn) === '.js');

const entries = {
  'core.js': [ './src/lib/core.js' ],
  // 'plugins.js': plugins.map(fn => `./src/plugins/${fn}`)
};

const htmlPlugins = [];

if (SKETCHES === 'current') {

  // Build only the "current" sketch for dev speed
  entries['index.js'] = './src/sketches/current.js';

  htmlPlugins.push(new HtmlWebpackPlugin({
    chunks: ['core.js', 'index.js'],
    template: './src/sketch.html.ejs',
    filename: `index.html`
  }));

} else if (!!SKETCHES) {

  // Build all sketches and the index page
  sketches.forEach(name =>
    entries[`sketches/${name}/index.js`] = [`./src/sketches/${name}.js`]);

  htmlPlugins.push(new HtmlWebpackPlugin({
    template: './src/sketch-index.html.ejs',
    filename: 'index.html',
    chunks: [],
    sketches
  }));

  sketches.forEach(name =>
    htmlPlugins.push(new HtmlWebpackPlugin({
      template: './src/sketch.html.ejs',
      filename: `sketches/${name}/index.html`,
      chunks: ['core.js', `sketches/${name}/index.js`]
    }))
  );

} else {

  // Only build the main app
  entries['index.js'] = './src/index.js';

  htmlPlugins.push(new HtmlWebpackPlugin({
    chunks: ['core.js', 'index.js'],
    template: './src/sketch.html.ejs',
    filename: `index.html`
  }));

}

module.exports = {
  devServer: {
    public: PROJECT_DOMAIN
      ? `${PROJECT_DOMAIN}.glitch.me`
      : `${HOST}:${PORT}`,
    port: PORT,
    disableHostCheck: true,
    contentBase: 'dist',
    hot: true
  },
  watchOptions: {
    aggregateTimeout: IS_GLITCH ? 500 : 0
  },
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
    chunkFilename: '[id].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${NODE_ENV}"` }),
    new webpack.optimize.CommonsChunkPlugin('core.js'),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ].concat(htmlPlugins)
};

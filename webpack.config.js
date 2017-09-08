const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PROD = NODE_ENV === 'production';
const IS_DEV = NODE_ENV === 'development';

const BUILD_INDEX = IS_PROD || (IS_DEV && 'INDEX' in process.env);

const sketches = (IS_DEV && 'SKETCHES' in process.env)
  ? process.env.SKETCHES.split(',')
  : fs.readdirSync('./src/sketches')
      .filter(fn => path.extname(fn) === '.js')
      .map(fn => path.basename(fn, '.js'));

const plugins = fs.readdirSync('./src/plugins')
  .filter(fn => path.extname(fn) === '.js');

class AfterBuildPlugin {
  constructor(cb) { this.cb = cb; }
  apply(compiler) { compiler.plugin('done', () => this.cb()); }
};

const entries = {
  'core.js': [
    './src/lib/core.js'
  ].concat(
    plugins.map(fn => `./src/plugins/${fn}`)
  )
};
if (BUILD_INDEX) {
  entries['index.js'] = './src/index.js';
}
sketches.forEach(name =>
  entries[`sketches/${name}/index.js`] = [`./src/sketches/${name}.js`]);

const htmlPlugins = sketches.map(name =>
  new HtmlWebpackPlugin({
    chunks: ['core.js', `sketches/${name}/index.js`],
    template: './src/sketch.html.ejs',
    filename: `sketches/${name}/index.html`
  })
);
if (BUILD_INDEX) {
  htmlPlugins.push(new HtmlWebpackPlugin({
    chunks: ['core.js', 'index.js'],
    template: './src/index.html.ejs',
    filename: 'index.html',
    sketches
  }));
}

module.exports = [
  {
    devServer: {
      port: PORT,
      disableHostCheck: true,
      contentBase: 'dist'
    },
    devtool: 'source-map',
    entry: entries,
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name]',
      chunkFilename: '[id].bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.(js|jsx)/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [['es2015', { modules: false }], 'stage-0'],
            plugins: [ 'transform-runtime' ]
          }
        }
      ]
    },
    plugins: [].concat(
      [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': `"${process.env.NODE_ENV || 'dev'}"`
        }),
        new webpack.optimize.CommonsChunkPlugin('core.js')
      ],
      htmlPlugins,
      [ new DashboardPlugin() ]
    )
  }
];

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const projectPath = path.resolve(__dirname, '../../');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const env = process.env.NODE_ENV || 'dev';
const envAppConfigURL = path.resolve(__dirname, `../app/${env}.js`);

module.exports = {
  output: {
    path: path.resolve(projectPath, 'build'),
    publicPath: '/',
    chunkFilename: '[name]-[hash].chunk.js',
    filename: '[name]-[hash].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [path.resolve(projectPath, 'src'), path.resolve(projectPath, 'node_modules')],
    alias: {
      Config: fs.existsSync(envAppConfigURL) ? envAppConfigURL : path.resolve(__dirname, 'dev.js'),
      Utils: path.resolve(projectPath, 'src/utils/index.js'),
      Components: path.resolve(projectPath, 'src/components/'),
      Images: path.resolve(projectPath, 'src/assets/images/'),
      Icons: path.resolve(projectPath, 'src/assets/icons/'),
      Styles: path.resolve(projectPath, 'src/assets/styles/'),
    },
  },
  plugins: [
    new webpack.ContextReplacementPlugin(
      /^\.\/locale$/,
      /cz.js|de.js|en.js|es.js|fr.js|hu.js|it.js|pl.js|ru.js|sv.js|tr.js|uk.js|zh.js/,
    ),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      syntax: 'scss',
    }),
  ],
  module: {
    // Disable handling of requires with a single expression
    exprContextRegExp: /$^/,
    exprContextCritical: false,
    // Disable handling of requires with expression wrapped by string,
    wrappedContextRegExp: /$^/,
    wrappedContextCritical: false,
    loaders: [{ test: /\.json$/, loader: 'json' }],
    rules: [
      {
        test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: 'file-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\/icon\/.*\.svg$/,
        loaders: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeTitle: true },
                { removeDesc: true },
              ],
            },
          },
        ],
      },
      {
        test: /\/monoicon\/.*\.svg$/,
        loaders: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { cleanupIDs: true },
                { cleanupAttrs: true },
                { removeDoctype: true },
                { removeXMLProcInst: true },
                { removeComments: true },
                { removeMetadata: true },
                { removeTitle: true },
                { removeDesc: true },
                { removeAttrs: { attrs: '(desc|fill|stroke|fill-opacity|stroke-opacity)' } },
                { removeUselessDefs: true },
                { removeXMLNS: true },
                { removeEditorsNSData: true },
                { removeEmptyAttrs: true },
                { removeHiddenElems: true },
                { removeEmptyText: true },
                { removeEmptyContainers: true },
                { cleanupEnableBackground: true },
                { convertStyleToAttrs: false },
                { convertColors: true },
                { convertTransform: true },
                { removeUnknownsAndDefaults: true },
                { removeNonInheritableGroupAttrs: true },
                { removeUselessStrokeAndFill: true },
                { removeUnusedNS: true },
                { cleanupNumericValues: true },
                { cleanupListOfValues: true },
                { moveGroupAttrsToElems: true },
                { collapseGroups: true },
                { removeRasterImages: true },
                { mergePaths: true },
                { removeDimensions: true },
                { removeStyleElement: false },
              ],
            },
          },
        ],
      },
      {
        test: /\/images\/.*\.svg$/,
        use: 'file-loader',
      },
    ],
  },
};

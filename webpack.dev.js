const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtensionReloader = require('webpack-extension-reloader');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new ExtensionReloader({
      manifest: path.resolve(__dirname, './src/manifest.json'),
      reloadPage: true,
    }),
  ]
});

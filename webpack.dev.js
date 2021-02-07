const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  devtool: 'inline-source-map',
  entry: {
    content: "./src/content-scripts/main.js",
    reload: "./src/background/reload.js",
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'src/manifest.json',
        transform: (content) => {
          const manifestJSON = JSON.parse(content.toString());
          return JSON.stringify(
            Object.assign({}, manifestJSON, {
              "background": {
                "scripts": ["reload.js"]
              }
            }),
            null, ' ');
        },
      },
    ]),
    new ExtensionReloader({
      entries: {
        contentScript: 'content',
        background: 'reload'
      },
      reloadPage: true,
    }),
  ]
});

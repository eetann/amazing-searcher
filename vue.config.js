const ExtensionReloader = require('webpack-extension-reloader');
const ZipPlugin = require('zip-webpack-plugin');
const path = require('path');

module.exports = {
  productionSourceMap: false,
  css: {extract: true},
  filenameHashing: false,
  chainWebpack: config => {
    config.entryPoints.clear().end()
    config.entry("content").add("./src/content-scripts/main.js").end()
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    if (process.env.NODE_ENV === "production") {
      config.plugin("zip-plgin").use(
        ZipPlugin, [{
          filename: path.basename(__dirname) + ".zip",
          pathPrefix: path.basename(__dirname)
        }]
      );
      config.plugin("copy").tap(([options]) => {
        const manifest = {from: 'src/manifest.json'};
        options = [...options, manifest];
        return [options];
      });
    } else {
      config.entry("reload").add("./src/background/reload.js").end();
      config.plugin("copy").tap(([options]) => {
        const manifest = {
          from: 'src/manifest.json',
          transform: (content) => {
            return JSON.stringify(
              Object.assign({}, JSON.parse(content.toString()), {
                "background": {"scripts": ["js/reload.js"]},
              }), null, ' ');
          },
        };
        options = [...options, manifest];
        return [options];
      });
      config.plugin("extension-reloader").use(
        ExtensionReloader, [{
          reloadPage: true,
          entries: {
            contentScript: 'content',
            background: 'reload'
          },
        }]
      );
    }
  },
}

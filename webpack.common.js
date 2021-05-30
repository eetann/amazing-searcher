const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    content: "./src/content-scripts/main.js",
    options: "./src/options/main.js",
    background: "./src/background/main.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
  },
  optimization: {
    splitChunks: {
      name: 'chunk',
      chunks(chunk) {
        return chunk.name !== 'background';
      },
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-env",
          ],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          header: true,
          skipEmptyLines: true
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin([{
      from: 'src/manifest.json',
    },
    {
      context: 'public',
      from: 'imgs/*',
    }
    ]),
    new HtmlWebpackPlugin({
      template: 'public/options.html',
      filename: 'options.html',
      chunks: ['chunk', 'options']
    }),
    new MiniCssExtractPlugin(),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false
    }),
  ]
}

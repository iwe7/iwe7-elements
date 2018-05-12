const path = require("path");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const entrys = require("./entrys/index.js");

const ngcWebpack = require("ngc-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const _root = path.resolve(__dirname, ".");

function getRoot(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

module.exports = {
  entry: {
    app: "./.tmp/src/app/element.app.js",
    ...entrys,
    polyfills: ["./.tmp/src/polyfills.js"]
  },
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    rules: [{
        test: /.js$/,
        parser: {
          system: true
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "@ngtools/webpack"
      },
      {
        test: /\.html$/,
        exclude: getRoot("src", "index.html"),
        use: [{
          loader: "raw-loader"
        }]
      },
      {
        test: /\.scss$/,
        include: getRoot("src", "app"),
        use: ["raw-loader", "sass-loader"]
      },
      {
        test: /\.scss$/,
        exclude: getRoot("src", "app"),
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".html"]
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.css"
    })
  ],
  devServer: {
    contentBase: "./dist",
    hot: false,
    port: 3000
  }
};

const path = require("path");
const glob = require("glob");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

let entries = glob.sync("./elements/*.ts");
let newEntries = [];

entries.map(res => {
  let name = res.split("/");
  let path = name[name.length - 1];
  let newPath = path.replace(".", "");
  newPath = path.replace(".ts", "");
  newEntries[newPath] = res;
});

console.log(newEntries);

module.exports = {
  entry: {
    ...newEntries,
    angular: [
      "@angular/core",
      "@angular/platform-browser",
      "@angular/common",
      "@angular/common/http",
      "@angular/router"
    ],
    polyfills: ["./lib/src/polyfills.js"]
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
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
          name: "angular",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: []
};

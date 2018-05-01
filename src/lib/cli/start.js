let { exec } = require("child_process");
let path = require("path");
let fs = require("fs");
let basePath = __dirname;
module.exports = element = ({ source }) => {
  // 编译完成后 webpack打包
  exec(`${source}/node_modules/.bin/webpack-dev-server`, err => {
    if (err) {
      console.log("发生了点错误，请联系作者处理，QQ：1037483576", err);
    }
  });
};

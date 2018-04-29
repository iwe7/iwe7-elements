let { exec } = require("child_process");
let path = require("path");
let glob = require("glob");

let fs = require("fs");
let basePath = __dirname;
// 查找所有的module

module.exports = element = ({ source, pre, out }) => {
  // 编译完成后 webpack打包
  let files = [];
  let entries = glob.sync(path.resolve(source, "src/**/*.module.ts"));
  entries.map(entrie => {
    console.log(entrie);
    let pathArrs = entrie.split("/");
    let pathName = pathArrs[pathArrs.length - 1];
    let moduleName = pathName.replace(".module.ts", "");
    let fullPath = source + "/.tmp/src/app/" + moduleName + ".element.js";
    console.log(moduleName);
  });
  exec(
    `${source}/node_modules/.bin/webpack -p --output-path=${source}/${out} --progress=true --watch`,
    err => {
      if (err) {
        console.log("发生了点错误，请联系作者处理，QQ：1037483576", err);
      }
    }
  );
};

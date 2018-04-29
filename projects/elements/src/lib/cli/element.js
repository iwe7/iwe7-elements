let { exec } = require("child_process");
let path = require("path");
let fs = require("fs");
let basePath = __dirname;
let tsconfigPath = basePath + "/../config/tsconfig.json";
let tsconfig = JSON.parse(fs.readFileSync(tsconfigPath));

let webpack = require("./webpack.js");
module.exports = element = ({ source, pre, out }) => {
  tsconfig.compilerOptions.baseUrl = source;
  tsconfig.compilerOptions.outDir = source + "/.tmp";
  tsconfig.include = [source + "/src/**/*"];
  tsconfig.exclude = [source + "/src/**/*.custom.ts"];
  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig));

  exec(
    `${source}/node_modules/.bin/ngc -p ${basePath}/../config/tsconfig.json`,
    err => {
      if (err) {
        console.log("发生了点错误，请联系作者处理，QQ：1037483576");
      } else {
        // 编译完成后 webpack打包
        let isMain = false;
        webpack({ source, pre, out, isMain });
      }
    }
  );
};


let { exec } = require("child_process");
let path = require("path");
let glob = require("glob");

let fs = require("fs");
let basePath = __dirname;
// 查找所有的module

function ucFirst(word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1);
}

let webpackConfig = fs.readFileSync(basePath + "/../config/webpack.config.js");

module.exports = webpack = ({ source, pre, out, isMain }) => {
  fs.mkdir(source + '/' + out);
  fs.writeFileSync(source + "/webpack.config.js", webpackConfig);
  // 编译完成后 webpack打包
  let files = [];
  let entries = glob.sync(path.resolve(source, "src/**/*.module.ts"));
  createIndexHtml(source, out);
  if (isMain) {
    // app.js
    let moduleName = "app";
    let fullPath = source + "/.tmp/src/app/element.app.js";
    let ngfactoryPath = source + "/.tmp/src/app/app.module.ngfactory.js";
    let content = `
        import { AppModuleNgFactory } from "./app.module.ngfactory";
        import { createAotElements } from "iwe7-elements";
        createAotElements(AppModuleNgFactory);
      `;
    fs.writeFileSync(fullPath, content);
    // exec
    let cmd = `${source}/node_modules/.bin/webpack -p`;
    exec(cmd, err => {
      if (err) {
        console.log("发生了点错误，请联系作者处理，QQ：1037483576", err);
      }
    });
  } else {
    entries.map(entrie => {
      let pathArrs = entrie.split("/");
      let ngfactoryPath = entrie.replace(".ts", ".ngfactory.js");
      ngfactoryPath = ngfactoryPath.replace(source + "/src/app/", "./");
      let pathName = pathArrs[pathArrs.length - 1];
      let moduleName = pathName.replace(".module.ts", "");
      let fullPath = source + "/.tmp/src/app/element." + moduleName + ".js";
      if (moduleName === "app") {
        return "";
      }
      let content = `
        import { AppModuleNgFactory } from "./app.module.ngfactory";
        import { ${ucFirst(
          moduleName
        )}ModuleNgFactory } from "${ngfactoryPath}";
        import { createAotElements } from "iwe7-elements";
        createAotElements(AppModuleNgFactory, TestModuleNgFactory);
      `;
      fs.writeFileSync(fullPath, content);
      // .replace(source + "/", "./")
      files.push({ name: moduleName, path: fullPath });
    });
    let cmdStr = "";
    files.map(item => {
      cmdStr += `${item.name}=${item.path} `;
    });
    let cmd = `${source}/node_modules/.bin/webpack -p ${cmdStr} --output-path=${source}/${out}`;
    exec(cmd, err => {
      if (err) {
        console.log("发生了点错误，请联系作者处理，QQ：1037483576", err);
      }
    });
  }
};

function createIndexHtml(source, out) {
  let htmlFile = source + "/" + out + "/index.html";
  let time = new Date().getTime();
  let htmlContent = `
<!doctype html>
<html lang="en">

<head>
<meta charset="utf-8">
<title>Iwe7Elements</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
<app-demo1-test1></app-demo1-test1>
<script src="./polyfills.js?t=${time}"></script>
<script src="./angular.js?t=${time}"></script>
<script src="./app.js?t=${time}"></script>
</body>

</html>
`;
  fs.writeFileSync(htmlFile, htmlContent);
}
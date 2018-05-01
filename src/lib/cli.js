#!/usr/bin/env node

let program = require("commander");
require("shelljs/global");
let element = require("./cli/element.js");
let webpack = require("./cli/webpack.js");
let start = require("./cli/start.js");
let main = require("./cli/main.js");

program
  .command("element")
  .alias("e")
  .description("打包element")
  .option("-s, --source <path>", "指定文件")
  .option("-p, --pre <pre>", "制定后缀名")
  .option("-o, --out <pre>", "指定输入位置")
  .action(program => {
    let source = program.source || process.cwd();
    let pre = program.pre || "element";
    let out = program.out || "dist/addons";
    element({ source, pre, out });
  })
  .on("--hlep", () => {});

program
  .command("webpack")
  .alias("w")
  .description("webpack打包")
  .option("-s, --source <path>", "指定文件")
  .option("-p, --pre <pre>", "制定后缀名")
  .option("-o, --out <pre>", "指定输入位置")
  .action(program => {
    let source = program.source || process.cwd();
    let pre = program.pre || "element";
    let out = program.out || "dist/addons";
    let isMain = false;
    webpack({ source, pre, out, isMain });
  })
  .on("--hlep", () => {});

program
  .command("start")
  .alias("s")
  .option("-s, --source <path>", "指定文件")
  .description("webpack-dev")
  .action(program => {
    let source = program.source || process.cwd();
    start({ source });
  })
  .on("--hlep", () => {});

program
  .command("main")
  .alias("m")
  .option("-s, --source <path>", "指定文件")
  .option("-p, --pre <pre>", "制定后缀名")
  .option("-o, --out <pre>", "指定输入位置")
  .description("main")
  .action(program => {
    let source = program.source || process.cwd();
    let pre = program.pre || "element";
    let out = program.out || "dist";
    main({ source, pre, out });
  })
  .on("--hlep", () => {});

program.parse(process.argv);

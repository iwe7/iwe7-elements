## install

```sh
yarn add iwe7-elements
```

## 一次打包多个 elements

```ts
@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [AppTest1Component, AppTest2Component, AppTest3Component],
  declarations: [AppTest1Component, AppTest2Component, AppTest3Component],
  entryComponents: [AppTest1Component, AppTest2Component, AppTest3Component],
  providers: []
})
export class TestModule {
  ngDoBootstrap() {}
  // 导出所有需要单独打包成element的组件 格式为{select: **, component: Type<any>}
  getElements() {
    return [
      { selector: "app-demo1-test1", component: AppTest1Component },
      { selector: "app-demo1-test2", component: AppTest2Component },
      { selector: "app-demo1-test3", component: AppTest3Component }
    ];
  }
}
```

### webpack 打包
- elements/element.ts
```ts
import { AppModuleNgFactory } from "../lib/src/app/app.module.ngfactory";
import { TestModuleNgFactory } from "../lib/src/app/demos/test.module.ngfactory";
import { createAotElements } from "../projects/elements/src/public_api";
createAotElements(AppModuleNgFactory, TestModuleNgFactory);
```

### webpack配置
```ts
const path = require("path");
const glob = require("glob");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 打包文件存放目录
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
      "@angular/router",
      "@angular/forms"
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
```
## 打包成element
- tsconfig.json
```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "baseUrl": "./",
    "target": "es5",
    "module": "es2015",
    "lib": [
      "dom",
      "es2017"
    ],
    "outDir": "./lib",
    "strict": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "allowJs": true,
    "paths": {
      "elements/*": [
        "projects/elements/src/public_api.ts"
      ]
    }
  },
  "angularCompilerOptions": {
    "debug": false,
    "genDir": "src/ngfactory"
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "src/**/*.custom.ts"
  ]
}
```
- package.sjon
```json
{
  "webpack": "ngc -p tsconfig.json && webpack -p"
}
```
```ts
yarn webpack
```

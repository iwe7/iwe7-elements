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
  // 要导出的组件 添加到entryComponents
  entryComponents: [AppTest1Component, AppTest2Component, AppTest3Component],
  providers: []
})
export class TestModule {
  ngDoBootstrap() {}
}
```

### webpack 要打包的文件

* elements/element.ts

```ts
import { AppModuleNgFactory } from "../lib/src/app/app.module.ngfactory";
import { TestModuleNgFactory } from "../lib/src/app/demos/test.module.ngfactory";
import { createAotElements } from "iwe7-elements";
createAotElements(AppModuleNgFactory, TestModuleNgFactory);
```

### webpack 配置

```ts
const path = require("path");
const glob = require("glob");

const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 打包文件存放目录 /elements/*.ts
let entries = glob.sync("./elements/*.ts");
let newEntries = [];

entries.map(res => {
  let name = res.split("/");
  let path = name[name.length - 1];
  let newPath = path.replace(".", "");
  newPath = path.replace(".ts", "");
  newEntries[newPath] = res;
});

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

## 打包成 element

* tsconfig.json

```json
{
  "compileOnSave": true,
  "compilerOptions": {
    "baseUrl": "./",
    "target": "es5",
    "module": "es2015",
    "lib": ["dom", "es2017"],
    "outDir": "./lib",
    "strict": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "allowJs": true,
    "paths": {
      "elements/*": ["projects/elements/src/public_api.ts"]
    }
  },
  "angularCompilerOptions": {
    "debug": false,
    "genDir": "src/ngfactory"
  },
  "include": ["src/**/*"],
  "exclude": ["src/**/*.custom.ts"]
}
```

* package.sjon

```json
{
  "webpack": "ngc -p tsconfig.json && webpack -p"
}
```

* 运行 webpack

```ts
yarn webpack
```

```ts
// 加载成功后回调
declare const loadModule$: any;
load() {
  if (!this.hasLoad) {
    let script = document.createElement("script");
    script.src = "https://meepo.com.cn/elements/element2.js?t=7";
    script.onload = () => {
      loadModule$.subscribe((res: any) => {
        let demo2Test1 = document.createElement("app-demo2-test1");
        let demo2Test2 = document.createElement("app-demo2-test2");
        let demo2Test3 = document.createElement("app-demo2-test3");
        document.body.appendChild(demo2Test1);
        document.body.appendChild(demo2Test2);
        document.body.appendChild(demo2Test3);
      });
    };
    document.head.appendChild(script);
    this.hasLoad = true;
  } else {
    alert("已加载");
  }
}
```

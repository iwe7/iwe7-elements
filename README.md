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
export class TestModule {}
```

* 配置cli到package.json
```json
"scripts": {
  ## 打包主程序
  "main": "iwe7 m",
  ## 打包插件/模块
  "element": "iwe7 e"
}
```

```ts
// 加载成功后回调
declare const loadModule$: any;
load() {
  if (!this.hasLoad) {
    let script = document.createElement("script");
    script.src = "https://meepo.com.cn/elements/element2.js?t=7";
    script.onload = () => {
      loadModule$.subscribe((res: string[]) => {
        // res 是返回的注册好的web component 的 selector 标识
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

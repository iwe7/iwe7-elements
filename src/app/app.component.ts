import { Component, Injector } from "@angular/core";
import { Observable } from "rxjs";

let map = new Map();
map.set("app-root1", "https://meepo.com.cn/elements/modules/module1/main.js");
map.set("app-root2", "https://meepo.com.cn/elements/modules/module2/main.js");
map.set("app-root3", "https://meepo.com.cn/elements/modules/module3/main.js");
map.set("app-root4", "https://meepo.com.cn/elements/modules/module4/main.js");
map.set("app-root5", "https://meepo.com.cn/elements/modules/module5/main.js");

@Component({
  selector: "app-root",
  template: `
    <h2>{{title}}</h2>
    <button (click)="load('app-root1')">加载模块1</button>
    <button (click)="load('app-root2')">加载模块2</button>
    <button (click)="load('app-root3')">加载模块3</button>
    <button (click)="load('app-root4')">加载模块4</button>
    <button (click)="load('app-root5')">加载模块5</button>
  `
})
export class AppComponent {
  title = "app";

  constructor(
    public injector: Injector
  ) {
    console.log(this.injector);
  }

  ngOnInit() {
    this.title = (<any>window).selector;
  }

  load(selector: string) {
    this.loadObserbvable(selector).subscribe((res: any) => {
      document.body.removeChild((<any>window).appRoot);
      this.createElement(selector);
    });
  }

  createElement(selector: string) {
    customElements.whenDefined(selector).then(res => {
      (<any>window).appRoot = document.createElement(selector);
      document.body.appendChild((<any>window).appRoot);
    });
  }

  loadObserbvable(selector: string) {
    let src = map.get(selector) + "?t=" + new Date().getTime();
    return Observable.create((obser: any) => {
      let script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        obser.next();
        obser.complete();
      };
      document.head.appendChild(script);
    });
  }
}

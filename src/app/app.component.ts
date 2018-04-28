import { Component } from "@angular/core";
import { Observable } from "rxjs";
@Component({
  selector: "app-root1",
  template: `
    <button (click)="load('https://meepo.com.cn/elements/modules/1.js')">加载模块1</button>
    <button (click)="load('https://meepo.com.cn/elements/modules/2.js')">加载模块2</button>
    <button (click)="load('https://meepo.com.cn/elements/modules/3.js')">加载模块3</button>
    <button (click)="load('https://meepo.com.cn/elements/modules/4.js')">加载模块4</button>
    <button (click)="load('https://meepo.com.cn/elements/modules/5.js')">加载模块5</button>
  `
})
export class AppComponent {
  title = "app";

  constructor() {}

  ngOnInit() {}

  load(src: string) {
    this.loadObserbvable(src).subscribe((res: any) => {
      console.log(res);
    });
  }

  loadObserbvable(src: string) {
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

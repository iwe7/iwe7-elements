import { Component, OnInit } from "@angular/core";
declare const loadModule$: any;
@Component({
  selector: "app-demo1-test1",
  templateUrl: "./test1.html",
  styleUrls: ["./test1.scss"]
})
export class AppTest1Component implements OnInit {
  hasLoad: boolean = false;

  constructor() {}

  ngOnInit() {}

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
}

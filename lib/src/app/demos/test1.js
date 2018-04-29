import { Component } from "@angular/core";
var AppTest1Component = /** @class */ (function () {
    function AppTest1Component() {
        this.hasLoad = false;
    }
    AppTest1Component.prototype.ngOnInit = function () { };
    AppTest1Component.prototype.load = function () {
        if (!this.hasLoad) {
            var script = document.createElement("script");
            script.src = "https://meepo.com.cn/elements/demo2.js?t=5";
            script.onload = function () {
                setTimeout(function () {
                    var demo2Test1 = document.createElement("app-demo2-test1");
                    var demo2Test2 = document.createElement("app-demo2-test2");
                    var demo2Test3 = document.createElement("app-demo2-test3");
                    document.body.appendChild(demo2Test1);
                    document.body.appendChild(demo2Test2);
                    document.body.appendChild(demo2Test3);
                }, 3000);
            };
            document.head.appendChild(script);
            this.hasLoad = true;
        }
        else {
            alert("已加载");
        }
    };
    AppTest1Component.decorators = [
        { type: Component, args: [{
                    selector: "app-demo1-test1",
                    template: "app demo1 test1  <br>  <button (click)=\"load()\">\u52A0\u8F7Ddemo2</button>"
                },] },
    ];
    /** @nocollapse */
    AppTest1Component.ctorParameters = function () { return []; };
    return AppTest1Component;
}());
export { AppTest1Component };

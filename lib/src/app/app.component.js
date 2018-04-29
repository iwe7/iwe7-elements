import { Component } from "@angular/core";
import { Observable } from "rxjs";
var map = new Map();
map.set("app-root1", "https://meepo.com.cn/elements/modules/module1/main.js");
map.set("app-root2", "https://meepo.com.cn/elements/modules/module2/main.js");
map.set("app-root3", "https://meepo.com.cn/elements/modules/module3/main.js");
map.set("app-root4", "https://meepo.com.cn/elements/modules/module4/main.js");
map.set("app-root5", "https://meepo.com.cn/elements/modules/module5/main.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = "app";
    }
    AppComponent.prototype.ngOnInit = function () {
        this.title = window.selector;
    };
    AppComponent.prototype.load = function (selector) {
        var _this = this;
        this.loadObserbvable(selector).subscribe(function (res) {
            document.body.removeChild(window.appRoot);
            _this.createElement(selector);
        });
    };
    AppComponent.prototype.createElement = function (selector) {
        customElements.whenDefined(selector).then(function (res) {
            window.appRoot = document.createElement(selector);
            document.body.appendChild(window.appRoot);
        });
    };
    AppComponent.prototype.loadObserbvable = function (selector) {
        var src = map.get(selector) + "?t=" + new Date().getTime();
        return Observable.create(function (obser) {
            var script = document.createElement("script");
            script.src = src;
            script.onload = function () {
                obser.next();
                obser.complete();
            };
            document.head.appendChild(script);
        });
    };
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: "app-root1",
                    template: "\n\n    <h2>{{title}}</h2>\n\n    <button (click)=\"load('app-root1')\">\u52A0\u8F7D\u6A21\u57571</button>\n    <button (click)=\"load('app-root2')\">\u52A0\u8F7D\u6A21\u57572</button>\n    <button (click)=\"load('app-root3')\">\u52A0\u8F7D\u6A21\u57573</button>\n    <button (click)=\"load('app-root4')\">\u52A0\u8F7D\u6A21\u57574</button>\n    <button (click)=\"load('app-root5')\">\u52A0\u8F7D\u6A21\u57575</button>\n  "
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return []; };
    return AppComponent;
}());
export { AppComponent };

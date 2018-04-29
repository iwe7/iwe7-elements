import { NgModule } from "@angular/core";
import { AppTest1Component } from "./test1";
import { AppTest2Component } from "./test2";
import { AppTest3Component } from "./test3";
var Test2Module = /** @class */ (function () {
    function Test2Module() {
    }
    Test2Module.prototype.getElements = function () {
        return [
            { selector: "app-demo2-test1", component: AppTest1Component },
            { selector: "app-demo2-test2", component: AppTest2Component },
            { selector: "app-demo2-test3", component: AppTest3Component }
        ];
    };
    Test2Module.decorators = [
        { type: NgModule, args: [{
                    imports: [],
                    exports: [AppTest1Component, AppTest2Component, AppTest3Component],
                    declarations: [AppTest1Component, AppTest2Component, AppTest3Component],
                    entryComponents: [AppTest1Component, AppTest2Component, AppTest3Component],
                    providers: []
                },] },
    ];
    return Test2Module;
}());
export { Test2Module };

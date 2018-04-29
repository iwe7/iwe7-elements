import { NgModule } from "@angular/core";
import { AppTest1Component } from "./test1";
import { AppTest2Component } from "./test2";
import { AppTest3Component } from "./test3";
import { ɵinitDomAdapter as initDomAdapter } from "@angular/platform-browser";
initDomAdapter();
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
var TestModule = /** @class */ (function () {
    function TestModule() {
    }
    TestModule.prototype.ngDoBootstrap = function () { };
    TestModule.prototype.getElements = function () {
        return [
            { selector: "app-demo1-test1", component: AppTest1Component },
            { selector: "app-demo1-test2", component: AppTest2Component },
            { selector: "app-demo1-test3", component: AppTest3Component }
        ];
    };
    TestModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, RouterModule.forChild([])],
                    exports: [AppTest1Component, AppTest2Component, AppTest3Component],
                    declarations: [AppTest1Component, AppTest2Component, AppTest3Component],
                    entryComponents: [AppTest1Component, AppTest2Component, AppTest3Component],
                    providers: []
                },] },
    ];
    return TestModule;
}());
export { TestModule };

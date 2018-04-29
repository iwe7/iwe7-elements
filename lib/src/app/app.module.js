import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.ngDoBootstrap = function () { };
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [AppComponent],
                    imports: [BrowserModule],
                    entryComponents: [AppComponent]
                },] },
    ];
    return AppModule;
}());
export { AppModule };

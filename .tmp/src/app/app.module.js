import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { APP_BASE_HREF, CommonModule } from "@angular/common";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.prototype.ngDoBootstrap = function () { };
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [AppComponent],
                    imports: [BrowserModule, RouterModule.forRoot([]), CommonModule],
                    entryComponents: [AppComponent],
                    providers: [
                        {
                            provide: APP_BASE_HREF,
                            useValue: ""
                        }
                    ]
                },] },
    ];
    return AppModule;
}());
export { AppModule };

import { NgZone, PLATFORM_ID, Compiler } from "@angular/core";
import { ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from "@angular/common";
import { DOCUMENT, PlatformLocation } from "@angular/common";
import { createCustomElement } from "@angular/elements";
import { ɵBrowserPlatformLocation as BrowserPlatformLocation, ɵinitDomAdapter as initDomAdapter } from "@angular/platform-browser";
initDomAdapter();
var ElementInjector = /** @class */ (function () {
    function ElementInjector() {
    }
    ElementInjector.prototype.get = function (token, notFoundValue) {
        switch (token) {
            case PLATFORM_ID:
                return PLATFORM_BROWSER_ID;
            case PlatformLocation:
                return new BrowserPlatformLocation(this.get(DOCUMENT));
            case NgZone:
                return new NgZone({
                    enableLongStackTrace: false
                });
            case Compiler:
                return new Compiler();
            case DOCUMENT:
                return document;
            default:
                return notFoundValue;
        }
    };
    return ElementInjector;
}());
export { ElementInjector };
export var elementInjector = new ElementInjector();
export function getModuleInjector(appModule) {
    var compiler = elementInjector.get(Compiler);
    var AppModuleNgFactory = compiler.compileModuleSync(appModule);
    return AppModuleNgFactory.create(elementInjector).injector;
}
export function createElement(ngModule, parentInjector) {
    var compiler = elementInjector.get(Compiler);
    var moduleWithComponentFactories = compiler.compileModuleAndAllComponentsSync(ngModule);
    var componentFactorys = moduleWithComponentFactories.componentFactories;
    var ngModuleFactory = moduleWithComponentFactories.ngModuleFactory;
    componentFactorys.map(function (res) {
        customElements.define(res.selector, createCustomElement(res.componentType, {
            injector: ngModuleFactory.create(parentInjector).injector
        }));
    });
}

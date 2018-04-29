import { enableProdMode, destroyPlatform } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { AppComponent } from "./app/app.component";
import { createCustomElement } from "@angular/elements";
if (environment.production) {
    enableProdMode();
}
destroyPlatform();
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(function (res) {
    var appRoot1 = createCustomElement(AppComponent, {
        injector: res.injector
    });
    var selector = 'app-root';
    window.selector = selector;
    customElements.define(selector, appRoot1);
    return customElements.whenDefined(selector).then(function (res) {
        window.appRoot = document.createElement(selector);
        document.body.appendChild(window.appRoot);
    });
})
    .catch(function (err) { return console.log(err); });

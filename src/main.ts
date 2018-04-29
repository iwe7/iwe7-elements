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
  .then(res => {
    let appRoot1 = createCustomElement(AppComponent, {
      injector: res.injector
    });
    let selector = 'app-root';
    (<any>window).selector = selector;
    customElements.define(selector, appRoot1);
    return customElements.whenDefined(selector).then(res=>{
      (<any>window).appRoot = document.createElement(selector);
      document.body.appendChild((<any>window).appRoot);
    })
  })
  .catch(err => console.log(err));

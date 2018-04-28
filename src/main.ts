import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { AppComponent } from "./app/app.component";
import { createCustomElement } from "@angular/elements";
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(res => {
    let appRoot1 = createCustomElement(AppComponent, {
      injector: res.injector
    });
    customElements.define("app-root1", appRoot1);
    return customElements.whenDefined("app-root1").then(res=>{
      (<any>window).appRoot = document.createElement('app-root1');
      document.body.appendChild((<any>window).appRoot);
    })
  })
  .catch(err => console.log(err));

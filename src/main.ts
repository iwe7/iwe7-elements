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
  .catch(err => console.log(err));

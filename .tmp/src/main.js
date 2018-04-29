import { enableProdMode, destroyPlatform } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
if (environment.production) {
    enableProdMode();
}
destroyPlatform();
platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(function (err) { return console.log(err); });
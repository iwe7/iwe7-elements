import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { APP_BASE_HREF } from "@angular/common";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([])],
  entryComponents: [AppComponent],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: ""
    }
  ]
})
export class AppModule {
  ngDoBootstrap() {}
}

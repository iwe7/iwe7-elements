import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { APP_BASE_HREF, CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterModule.forRoot([]), CommonModule],
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

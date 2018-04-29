import { NgModule, Injector, APP_INITIALIZER } from "@angular/core";

import { AppTest1Component } from "./test1";
import { AppTest2Component } from "./test2";
import { AppTest3Component } from "./test3";

import {
  BrowserModule,
  ɵinitDomAdapter as initDomAdapter
} from "@angular/platform-browser";

initDomAdapter();

import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [AppTest1Component, AppTest2Component, AppTest3Component],
  declarations: [AppTest1Component, AppTest2Component, AppTest3Component],
  entryComponents: [AppTest1Component, AppTest2Component, AppTest3Component],
  providers: []
})
export class TestModule {
  ngDoBootstrap() {}
}

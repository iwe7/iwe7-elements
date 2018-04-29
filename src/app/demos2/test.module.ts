import { NgModule } from "@angular/core";

import { AppTest1Component } from "./test1";
import { AppTest2Component } from "./test2";
import { AppTest3Component } from "./test3";

@NgModule({
  imports: [],
  exports: [AppTest1Component, AppTest2Component, AppTest3Component],
  declarations: [AppTest1Component, AppTest2Component, AppTest3Component],
  entryComponents: [AppTest1Component, AppTest2Component, AppTest3Component],
  providers: []
})
export class TestModule {}

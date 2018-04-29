import { AppTest1ComponentNgFactory } from "./lib/src/app/demos/test1.ngfactory.js";
import { AppTest2ComponentNgFactory } from "./lib/src/app/demos/test2.ngfactory.js";
import { AppTest3ComponentNgFactory } from "./lib/src/app/demos/test3.ngfactory.js";
import { TestModuleNgFactory } from "./lib/src/app/demos/test.module.ngfactory.js";

import { createCustomElement } from "@angular/elements";
import { appInjector } from "./app";
let injector = TestModuleNgFactory.create(appInjector).injector;

customElements.define(
  AppTest1ComponentNgFactory.selector,
  createCustomElement(AppTest1ComponentNgFactory.componentType, {
    injector: injector
  })
);
customElements.define(
  AppTest2ComponentNgFactory.selector,
  createCustomElement(AppTest2ComponentNgFactory.componentType, {
    injector: injector
  })
);
customElements.define(
  AppTest3ComponentNgFactory.selector,
  createCustomElement(AppTest3ComponentNgFactory.componentType, {
    injector: injector
  })
);

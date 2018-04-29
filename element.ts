import { AppTest1ComponentNgFactory } from "./lib/src/app/demos/test1.ngfactory.js";
import { AppTest2ComponentNgFactory } from "./lib/src/app/demos/test2.ngfactory.js";
import { AppTest3ComponentNgFactory } from "./lib/src/app/demos/test3.ngfactory.js";
import { TestModuleNgFactory } from "./lib/src/app/demos/test.module.ngfactory.js";

import { createElement } from "./projects/elements/src/public_api";

createElement(AppTest1ComponentNgFactory, TestModuleNgFactory);
createElement(AppTest2ComponentNgFactory, TestModuleNgFactory);
createElement(AppTest3ComponentNgFactory, TestModuleNgFactory);

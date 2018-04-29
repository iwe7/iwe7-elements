import { AppTest1ComponentNgFactory } from "./lib/src/app/demos2/test1.ngfactory.js";
import { AppTest2ComponentNgFactory } from "./lib/src/app/demos2/test2.ngfactory.js";
import { AppTest3ComponentNgFactory } from "./lib/src/app/demos2/test3.ngfactory.js";
import { TestModuleNgFactory } from "./lib/src/app/demos2/test.module.ngfactory.js";

import { createElement } from "./projects/elements/src/public_api";

createElement(AppTest1ComponentNgFactory, TestModuleNgFactory);
createElement(AppTest2ComponentNgFactory, TestModuleNgFactory);
createElement(AppTest3ComponentNgFactory, TestModuleNgFactory);

import { AppModuleNgFactory } from "../.tmp/src/app/app.module.ngfactory";
import { TestModuleNgFactory } from "../.tmp/src/app/demos/test.module.ngfactory";
import { createAotElements } from "../projects/elements/src/public_api";

createAotElements(AppModuleNgFactory, TestModuleNgFactory);

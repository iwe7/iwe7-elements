import { AppModuleNgFactory } from "../lib/src/app/app.module.ngfactory";
import { TestModuleNgFactory } from "../lib/src/app/demos2/test.module.ngfactory";
import { createAotElements } from "../projects/elements/src/public_api";

createAotElements(AppModuleNgFactory, TestModuleNgFactory);

import { AppModuleNgFactory } from "./lib/src/app/app.module.ngfactory.js";
import { getRootInjector } from "./projects/elements/src/public_api";
export const appInjector = getRootInjector(AppModuleNgFactory);

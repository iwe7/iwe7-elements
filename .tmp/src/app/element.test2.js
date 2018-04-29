
        import { AppModuleNgFactory } from "./app.module.ngfactory";
        import { Test2ModuleNgFactory } from "./demos2/test2.module.ngfactory.js";
        import { createAotElements } from "iwe7-elements";
        createAotElements(AppModuleNgFactory, TestModuleNgFactory);
      
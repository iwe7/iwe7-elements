
        import { AppModuleNgFactory } from "./app.module.ngfactory";
        import { TestModuleNgFactory } from "./demos/test.module.ngfactory.js";
        import { createAotElements } from "iwe7-elements";
        createAotElements(AppModuleNgFactory, TestModuleNgFactory);
      
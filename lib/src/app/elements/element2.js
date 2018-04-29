import { TestModule } from "../demos2/test.module";
import { appInjector } from "./app";
import { createElement } from "../../../projects/elements/src/public_api";
createElement(TestModule, appInjector);

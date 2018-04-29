import { TestModule } from "../demos/test.module";
import { appInjector } from "./app.coustom";
import { createElement } from "../../../projects/elements/src/public_api";
createElement(TestModule, appInjector);

import { AppModule } from "../app.module";
import { getModuleInjector } from "../../../projects/elements/src/public_api";
export var appInjector = getModuleInjector(AppModule);

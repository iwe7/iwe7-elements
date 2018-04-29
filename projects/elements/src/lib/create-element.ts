import { ComponentFactory, Injector, NgModuleFactory } from "@angular/core";
import { NgElementModule } from "./ng-element-module";
export function createElement<T>(
  componentFactory: ComponentFactory<T>,
  moduleFactory: NgModuleFactory<T>
) {
  const NgElementCtor = class extends NgElementModule {
    constructor(parentInjector?: Injector) {
      super(componentFactory, moduleFactory, parentInjector);
    }
  };
  customElements.define(componentFactory.selector, NgElementCtor);
  return customElements.whenDefined(componentFactory.selector);
}

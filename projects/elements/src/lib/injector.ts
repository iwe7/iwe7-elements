import {
  Injector,
  NgZone,
  PLATFORM_ID,
  NgModuleFactory,
  Compiler,
  Type,
  ModuleWithComponentFactories,
  ComponentFactory
} from "@angular/core";
import { ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from "@angular/common";
import { DOCUMENT, PlatformLocation } from "@angular/common";
import { createCustomElement } from "@angular/elements";
import {
  ɵBrowserPlatformLocation as BrowserPlatformLocation,
  ɵinitDomAdapter as initDomAdapter
} from "@angular/platform-browser";

import { fromPromise } from "rxjs/observable/fromPromise";
import { forkJoin, Subject } from "rxjs";
initDomAdapter();
import { ElementsLoad, ElementsMap } from "./global";
export class ElementInjector implements Injector {
  get(token: any, notFoundValue?: any): any {
    switch (token) {
      case PLATFORM_ID:
        return PLATFORM_BROWSER_ID;
      case PlatformLocation:
        return new BrowserPlatformLocation(this.get(DOCUMENT));
      case NgZone:
        return new NgZone({
          enableLongStackTrace: false
        });
      case Compiler:
        return new Compiler();
      case DOCUMENT:
        return document;
      default:
        return notFoundValue;
    }
  }
}

export const elementInjector = new ElementInjector();

// 批量解析
export function createAotElements(
  appModuleFactory: NgModuleFactory<any>,
  moduleFactory?: NgModuleFactory<any>,
  parentInjector?: Injector
) {
  // 主
  parentInjector = parentInjector || elementInjector;
  let appModuleRef = appModuleFactory.create(parentInjector);
  let moduleRef: any;
  let moduleType: any;
  if (moduleFactory) {
    moduleRef = moduleFactory.create(appModuleRef.injector);
    moduleType = moduleFactory.moduleType;
  } else {
    moduleRef = appModuleRef;
    moduleType = appModuleFactory.moduleType;
  }

  // 子
  let componentFactoryResolver = moduleRef.componentFactoryResolver;
  let decorators = (<any>moduleType).decorators;
  let obsers: any[] = [];
  decorators.map((res: any) => {
    let args = res.args;
    args.map((arg: any) => {
      let entryComponents = arg.entryComponents;
      if (entryComponents) {
        entryComponents.map((res: Type<any>) => {
          let componentFactory = componentFactoryResolver.resolveComponentFactory(
            res
          );
          const cus = createCustomElement(componentFactory.componentType, {
            injector: moduleRef.injector
          });
          customElements.define(componentFactory.selector, cus);
          (<any>window).ElementsMap.set(componentFactory.selector, cus);
          obsers.push(
            fromPromise(
              customElements
                .whenDefined(componentFactory.selector)
                .then((res: any) => {
                  return componentFactory.selector;
                })
            )
          );
        });
      }
    });
  });
  (<any>window).ElementsLoad = forkJoin(...obsers);
}

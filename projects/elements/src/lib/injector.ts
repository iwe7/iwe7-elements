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
import { forkJoin } from "rxjs";
initDomAdapter();

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

// 运行时
export function getJitModuleInjector(appModule: Type<any>) {
  let compiler: Compiler = elementInjector.get(Compiler);
  let AppModuleNgFactory = compiler.compileModuleSync(appModule);
  return AppModuleNgFactory.create(elementInjector).injector;
}

export function createJitElement(
  ngModule: Type<any>,
  parentInjector: Injector
) {
  let compiler: Compiler = elementInjector.get(Compiler);
  let moduleWithComponentFactories: ModuleWithComponentFactories<
    any
  > = compiler.compileModuleAndAllComponentsSync(ngModule);
  let componentFactorys: ComponentFactory<any>[] =
    moduleWithComponentFactories.componentFactories;
  let ngModuleFactory: NgModuleFactory<any> =
    moduleWithComponentFactories.ngModuleFactory;
  componentFactorys.map((res: ComponentFactory<any>) => {
    customElements.define(
      res.selector,
      createCustomElement(res.componentType, {
        injector: ngModuleFactory.create(parentInjector).injector
      })
    );
  });
}

// 批量解析
export function createAotElements(
  appModuleFactory: NgModuleFactory<any>,
  moduleFactory: NgModuleFactory<any>,
  parentInjector?: Injector
) {
  // 主
  parentInjector = parentInjector || elementInjector;
  let appModuleRef = appModuleFactory.create(parentInjector);
  // 子
  let moduleRef = moduleFactory.create(appModuleRef.injector);
  let instance = moduleRef.instance;
  let allComponent = instance.getElements();
  let obsers: any[] = [];
  allComponent.map((res: any) => {
    customElements.define(
      res.selector,
      createCustomElement(res.component, {
        injector: moduleRef.injector
      })
    );
    obsers.push(fromPromise(customElements.whenDefined(res.selector)));
  });
  (<any>window).loadModule$ = forkJoin(...obsers);
}

// 单个解析
export function createAotElement(
  appModuleFactory: NgModuleFactory<any>,
  moduleFactory: NgModuleFactory<any>,
  componentFactory: ComponentFactory<any>,
  parentInjector?: Injector
) {
  // 主
  parentInjector = parentInjector || elementInjector;
  let appModuleRef = appModuleFactory.create(parentInjector);
  // 子
  let moduleRef = moduleFactory.create(appModuleRef.injector);
  let instance = moduleRef.instance;
  let allComponent = instance.getElements();
  customElements.define(
    componentFactory.selector,
    createCustomElement(componentFactory.componentType, {
      injector: moduleRef.injector
    })
  );
}

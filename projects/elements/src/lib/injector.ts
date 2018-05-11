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

// 定义全局对象
(<any>window).iwe7 = (<any>window).iwe7 || new Map();
(<any>window).loadModules$ = new Subject();

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
          (<any>window).iwe7.set(componentFactory.selector, cus);
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
  (<any>window).loadModules$ = forkJoin(...obsers);
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

// 非element
export function createComponent(
  appModuleFactory: NgModuleFactory<any>,
  moduleFactory: NgModuleFactory<any>,
  componentFactory: ComponentFactory<any>,
  parentInjector?: Injector
) {}

export function createModule(
  appModuleFactory: NgModuleFactory<any>,
  moduleFactory: NgModuleFactory<any>,
  parentInjector?: Injector
) {
  // 主
  parentInjector = parentInjector || elementInjector;
  let appModuleRef = appModuleFactory.create(parentInjector);
  let componentFactoryResolver = appModuleRef.componentFactoryResolver;
  // 子
  let moduleRef = moduleFactory.create(appModuleRef.injector);
  let instance = moduleRef.instance;
  let allComponent = instance.getElements();
  let obsers: any[] = [];
  allComponent.map((res: any) => {});
}

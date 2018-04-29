import { Injector, NgZone, PLATFORM_ID, NgModuleFactory } from "@angular/core";
import { ɵPLATFORM_BROWSER_ID as PLATFORM_BROWSER_ID } from "@angular/common";
import { DOCUMENT, PlatformLocation } from "@angular/common";
import {
  ɵBrowserPlatformLocation as BrowserPlatformLocation,
  ɵinitDomAdapter as initDomAdapter
} from "@angular/platform-browser";

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
      case DOCUMENT:
        return document;
      default:
        return notFoundValue;
    }
  }
}

export const elementInjector = new ElementInjector();

export function getRootInjector(AppModuleNgFactory: NgModuleFactory<any>) {
  return AppModuleNgFactory.create(elementInjector).injector;
}

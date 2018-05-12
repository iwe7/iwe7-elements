import { Observable } from "rxjs";

import { ElementsLoad, ElementsMap } from "./global";
import { ComponentFactory } from "@angular/core";

export interface ElementOption {
  selector: string;
  inputs?: any;
  outputs?: any;
}

export interface ElementMetadata {
  propName: string;
  selector: string;
}

export const ElementMedataKey = "__element_medata_key__";

export function Element(selector: string) {
  return (target, propName) => {
    return setElement(target, {
      propName,
      selector
    });
  };
}

export function setElement(type: any, metadata: ElementMetadata): void {
  let { selector } = metadata;
  let element$: Observable<any> = new Observable((observer: any) => {
    setTimeout(() => {
      ElementsLoad.subscribe(res => {
        observer.next(selector);
        observer.complete();
      });
    }, 0);
  });
  type[metadata.propName] = element$;
}

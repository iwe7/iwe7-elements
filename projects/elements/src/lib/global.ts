import { of, Observable } from "rxjs";
declare const window: any;
(<any>window).ElementsLoad = (<any>window).ElementsLoad || of(null);
(<any>window).ElementsMap = (<any>window).ElementsMap || new Map();

declare let ElementsLoad: Observable<any>;
declare let ElementsMap: Map<string, any>;

export { ElementsLoad, ElementsMap };

import { of, Observable } from "rxjs";
declare const window: any;
(<any>window).ElementsLoad = (<any>window).ElementsLoad || of(null);
(<any>window).ElementsMap = (<any>window).ElementsMap || new Map();

export let ElementsLoad: Observable<any> = (<any>window).ElementsLoad;
export let ElementsMap: Map<string, any> = (<any>window).ElementsMap;

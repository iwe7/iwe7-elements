import {
  Injector,
  NgModuleRef,
  StaticProvider,
  InjectionToken,
  Type,
  InjectFlags,
  RendererFactory2,
  Sanitizer,
  ErrorHandler,
  ComponentFactoryResolver,
  NgModuleFactory,
  ComponentRef,
  ComponentFactory,
  EventEmitter
} from "@angular/core";
import { santizer } from "./santizer";
import { SimpleRendererFactory } from "./simple-renderer-factory";
let renderer: SimpleRendererFactory;

export class NgElementModule extends HTMLElement
  implements Injector, NgModuleRef<any> {
  componentRef: any;
  moduleType: any;
  moduleRef: NgModuleRef<any>;
  get injector(): Injector {
    return this;
  }
  get componentFactoryResolver(): any {
    return this.moduleRef.componentFactoryResolver;
  }
  get instance() {
    return this;
  }
  destroy(): void {
    this.componentRef.destroy();
  }
  onDestroy(callback: () => void): void {}
  constructor(
    public componentFactory: ComponentFactory<any>,
    public moduleFactory: NgModuleFactory<any>,
    private parentInjector?: Injector
  ) {
    super();
    if (!renderer) {
      renderer = new SimpleRendererFactory();
    }
    this.moduleRef = this.moduleFactory.create(this.injector);
  }
  connectedCallback() {
    this.bootstrap();
  }
  disconnectedCallback() {
    this.teardown();
  }
  bootstrap() {
    const element = this;
    if (element.componentRef) {
      return;
    }
    element.componentRef = element.componentFactory.create(
      this.parentInjector ? this.parentInjector : Injector.NULL,
      [Array.of(this.children)],
      this,
      this
    );
    if (!element.componentRef) {
      throw new Error("component could not be created!");
    }
    const listeners = this.componentFactory.outputs.map(output => {
      const emitter: EventEmitter<any> = (element.componentRef!
        .instance as any)[output.templateName];
      return emitter.subscribe((payload: any) =>
        this.dispatchEvent(
          new CustomEvent(output.propName, { detail: payload })
        )
      );
    });
    const inputs = this.componentFactory.inputs.forEach(input => {
      Object.defineProperty(element, input.propName, {
        set(value) {
          (element.componentRef!.instance as any)[input.templateName] = value;
          element.componentRef!.changeDetectorRef.detectChanges();
        },
        get() {
          return (element.componentRef!.instance as any)[input.templateName];
        }
      });
    });
    element.componentRef!.onDestroy(() =>
      listeners.forEach(l => l.unsubscribe())
    );
    requestAnimationFrame(() => this.tick());
  }

  tick() {
    if (this.componentRef) {
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  teardown() {}
  get<T>(
    token: Type<T> | InjectionToken<T>,
    notFoundValue?: T,
    flags?: InjectFlags
  ): T;
  get(token: any, notFoundValue?: any): any {
    switch (token) {
      case RendererFactory2:
        return renderer;
      case Sanitizer:
        return santizer;
      case ErrorHandler:
        return null;
      case NgModuleRef:
        return this;
    }
    if (this.parentInjector) {
      return this.parentInjector.get(token, notFoundValue);
    }
    return Injector.NULL.get(token, notFoundValue);
  }
  create(providers: StaticProvider[], parent?: Injector): Injector {
    return this;
  }
}

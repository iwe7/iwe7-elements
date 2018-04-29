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
  ComponentRef,
  ComponentFactory,
  EventEmitter
} from "@angular/core";
import { santizer } from "./santizer";
import { SimpleRendererFactory } from "./simple-renderer-factory";
let renderer: SimpleRendererFactory;

export class NgElement extends HTMLElement
  implements Injector, NgModuleRef<any> {
  componentRef: ComponentRef<any> | undefined;
  componentFactory: ComponentFactory<any>;
  moduleType: any;
  get injector(): Injector {
    return this;
  }
  get componentFactoryResolver(): any {
    return null!;
  }
  get instance() {
    return this;
  }
  destroy(): void {}
  onDestroy(callback: () => void): void {}
  constructor(
    _factory: ComponentFactory<any>,
    private parentInjector?: Injector
  ) {
    super();
    if (!renderer) {
      renderer = new SimpleRendererFactory();
    }
    this.componentFactory = _factory;
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

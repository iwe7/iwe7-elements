import {
  RendererFactory2,
  Renderer2,
  RendererType2,
  ViewEncapsulation
} from "@angular/core";
import { SimpleRenderer } from "./simple-renderer";
import { ShadowDomRenderer } from "./shadow-dom-renderer";
export class SimpleRendererFactory implements RendererFactory2 {
  private rendererByCompId = new Map<string, Renderer2>();
  private defaultRenderer: Renderer2;
  constructor() {
    this.defaultRenderer = new SimpleRenderer();
  }
  createRenderer(element: any, type: RendererType2 | null): Renderer2 {
    if (type && type.encapsulation === ViewEncapsulation.Native) {
      return new ShadowDomRenderer(element, type);
    }
    return new SimpleRenderer();
  }
}

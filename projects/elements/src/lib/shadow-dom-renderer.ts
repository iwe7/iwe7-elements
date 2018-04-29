import { RendererType2 } from "@angular/core";
import { SimpleRenderer } from "./simple-renderer";
import { flattenStyles } from "./flatten-styles";
export class ShadowDomRenderer extends SimpleRenderer {
  private shadowRoot: any;
  constructor(private hostEl: any, private component: RendererType2) {
    super();
    this.shadowRoot = (hostEl as any).attachShadow({ mode: "open" });
    const styles = flattenStyles(component.id, component.styles, []);
    for (let i = 0; i < styles.length; i++) {
      const styleEl = document.createElement("style");
      styleEl.textContent = styles[i];
      this.shadowRoot.appendChild(styleEl);
    }
  }
  private nodeOrShadowRoot(node: any): any {
    return node === this.hostEl ? this.shadowRoot : node;
  }
  destroy() {
    /**this.sharedStylesHost.removeHost(this.shadowRoot); **/
  }
  appendChild(parent: any, newChild: any): void {
    return super.appendChild(this.nodeOrShadowRoot(parent), newChild);
  }
  insertBefore(parent: any, newChild: any, refChild: any): void {
    return super.insertBefore(
      this.nodeOrShadowRoot(parent),
      newChild,
      refChild
    );
  }
  removeChild(parent: any, oldChild: any): void {
    return super.removeChild(this.nodeOrShadowRoot(parent), oldChild);
  }
  parentNode(node: any): any {
    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(node)));
  }
}

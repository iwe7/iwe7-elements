import { Renderer2, RendererStyleFlags2 } from "@angular/core";

export const NAMESPACE_URIS: { [ns: string]: string } = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};

export class SimpleRenderer implements Renderer2 {
  data: { [key: string]: any } = Object.create(null);
  constructor() {}
  destroy(): void {}
  destroyNode: null;
  createElement(name: string, namespace?: string): any {
    if (namespace) {
      return document.createElementNS(NAMESPACE_URIS[namespace], name);
    }
    return document.createElement(name);
  }
  createComment(value: string): any {
    return document.createComment(value);
  }
  createText(value: string): any {
    return document.createTextNode(value);
  }
  appendChild(parent: any, newChild: any): void {
    parent.appendChild(newChild);
  }
  insertBefore(parent: any, newChild: any, refChild: any): void {
    if (parent) {
      parent.insertBefore(newChild, refChild);
    }
  }
  removeChild(parent: any, oldChild: any): void {
    if (parent) {
      parent.removeChild(oldChild);
    }
  }
  selectRootElement(selectorOrNode: string | any): any {
    let el: any =
      typeof selectorOrNode === "string"
        ? document.querySelector(selectorOrNode)
        : selectorOrNode;
    if (!el) {
      throw new Error(
        `The selector "${selectorOrNode}" did not match any elements`
      );
    }
    el.textContent = "";
    return el;
  }
  parentNode(node: any): any {
    return node.parentNode;
  }
  nextSibling(node: any): any {
    return node.nextSibling;
  }
  setAttribute(el: any, name: string, value: string, namespace?: string): void {
    if (namespace) {
      name = `${namespace}:${name}`;
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.setAttributeNS(namespaceUri, name, value);
      } else {
        el.setAttribute(name, value);
      }
    } else {
      el.setAttribute(name, value);
    }
  }
  removeAttribute(el: any, name: string, namespace?: string): void {
    if (namespace) {
      const namespaceUri = NAMESPACE_URIS[namespace];
      if (namespaceUri) {
        el.removeAttributeNS(namespaceUri, name);
      } else {
        el.removeAttribute(`${namespace}:${name}`);
      }
    } else {
      el.removeAttribute(name);
    }
  }
  addClass(el: any, name: string): void {
    el.classList.add(name);
  }
  removeClass(el: any, name: string): void {
    el.classList.remove(name);
  }
  setStyle(
    el: any,
    style: string,
    value: any,
    flags: RendererStyleFlags2
  ): void {
    if (flags & RendererStyleFlags2.DashCase) {
      el.style.setProperty(
        style,
        value,
        !!(flags & RendererStyleFlags2.Important) ? "important" : ""
      );
    } else {
      el.style[style] = value;
    }
  }
  removeStyle(el: any, style: string, flags: RendererStyleFlags2): void {
    if (flags & RendererStyleFlags2.DashCase) {
      el.style.removeProperty(style);
    } else {
      // IE requires '' instead of null
      // see https://github.com/angular/angular/issues/7916
      el.style[style] = "";
    }
  }

  setProperty(el: any, name: string, value: any): void {
    el[name] = value;
  }

  setValue(node: any, value: string): void {
    node.nodeValue = value;
  }

  listen(
    target: "window" | "document" | "body" | any,
    event: string,
    callback: (event: any) => boolean
  ): () => void {
    // TODO
    target.addEventListener(event, callback);
    return () => target.removeEventListener(event, callback);
  }
}

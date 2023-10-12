import { CssGenerator } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { StyleMap, StyleSet, TagBuilder, TagChild, TagChildren, TagConfig } from './types.js';

export let context: {
  attachedTag: CTag;
  attachedTagStack: CTag[];
  css: CssGenerator;
} = {
  attachedTag: null,
  attachedTagStack: [],
  css: new CssGenerator(),
};

export function attached() {
  return context.attachedTag;
}

function isSelector(str: string) {
  return str.match(/\(.+\)/);
}

function getElementForChild(cl: TagChild): Node {
  if (typeof cl === 'string') return document.createTextNode(cl);
  if (cl instanceof CTag) return cl.element;
  if (cl instanceof HTMLElement) return cl;
  return null;
}

function getElementChildren(element: HTMLElement): Node[] {
  var childNodes = element.childNodes,
    children = [],
    i = childNodes.length;

  while (i--) {
    if (childNodes[i].nodeType == 1) {
      children.unshift(childNodes[i]);
    }
  }

  return children;
}

export class CTag<T extends HTMLElement = HTMLElement> {
  element: T;
  parent: CTag = null;

  /** If set to true, it be appended to the attached tag */
  private attachable: boolean = false;

  get children() {
    return getElementChildren(this.element);
  }

  get value() {
    return (this.element as any).value;
  }

  get id() {
    return this.element.id;
  }

  setId(id: string) {
    this.element.id = id;
    return this;
  }

  setValue(newValue: string) {
    (this.element as any).value = newValue;
    return this;
  }

  constructor(arg0: TagName | HTMLElement, children: TagChildren = [], attachable: boolean = false) {
    this.attachable = attachable;

    if (typeof arg0 == 'string' && isSelector(arg0)) {
      this.attachable = false;
      this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
    } else if (typeof arg0 == 'string') {
      this.element = document.createElement(arg0) as T;
    } else if (arg0 instanceof HTMLElement) {
      this.attachable = false;
      this.element = arg0 as T;
    }

    this.set(children);

    if (context.attachedTag && this.attachable) {
      context.attachedTag.add(this);
    }
  }

  set(children: TagChildren) {
    this.element.replaceChildren(
      ...children.map((cl) => {
        if (cl instanceof CTag) cl.parent = this;
        return getElementForChild(cl);
      }),
    );
  }

  add(...children: TagChildren) {
    this.element.append(
      ...children.map((cl) => {
        if (cl instanceof CTag) cl.parent = this;
        return getElementForChild(cl);
      }),
    );
    return this;
  }

  consume<T>(consumable: Consumable<T>, consumer: (self: CTag, newValue: T) => void) {
    consumable.changed((newValue) => consumer(this, newValue));
    consumer(this, consumable);
    return this;
  }

  listen<K extends keyof HTMLElementEventMap>(
    tag: CTag,
    evt: K,
    consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void,
  ) {
    tag.on(evt, (other, evt) => consumer(this, other, evt));
    return this;
  }

  text(text) {
    this.element.textContent = text;
    return this;
  }

  config(config: TagConfig) {
    if (config.attr) {
      this.setAttrs(config.attr);
    }
    if (config.classList) {
      this.addClass(...config.classList);
    }
    if (config.className) {
      this.className(config.className);
    }
    if (config.style) {
      this.setStyle(config.style);
    }
    if (config.text) {
      this.text(config.text);
    }
    if (config.value) {
      this.setValue(config.value);
    }
    if (config.children) {
      this.add(...config.children);
    }
    if (config.on) {
      for (const key in config.on) {
        this.on(key, config.on[key]);
      }
    }

    return this;
  }

  addClass(...classNames: string[]) {
    this.element.classList.add(...classNames);
    return this;
  }

  className(className: string) {
    this.element.className = className;
    return this;
  }

  rmClass(...classNames: string[]) {
    for (let key of classNames) {
      this.element.classList.remove(key);
    }
    return this;
  }

  hasClass(...classNames: string[]) {
    for (let key of classNames) {
      if (!this.element.classList.contains(key)) {
        return false;
      }
    }
    return true;
  }

  replaceClass(targetClass: string, replaceClass: string) {
    this.element.classList.replace(targetClass, replaceClass);
    return this;
  }

  addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>) {
    this.element.style[property as string] = value;
    return this;
  }

  setStyle(styles: StyleMap) {
    for (let key in styles) {
      this.addStyle(key, styles[key]);
    }
    return this;
  }

  rmStyle(...styleNames: string[]) {
    for (let key of styleNames) {
      this.element.style.removeProperty(key);
    }
    return this;
  }

  hasStyle(...styles: string[]) {
    for (let key of styles) {
      if (!this.element.style.getPropertyValue(key)) {
        return false;
      }
    }
    return true;
  }

  setAttrs(attrs: { [k: string]: string }) {
    for (let key in attrs) {
      this.addAttr(key, attrs[key]);
    }
    return this;
  }

  addAttr(key: string, value: string) {
    this.element.attributes[key] = value;
    this.element.setAttribute(key, value);
    return this;
  }

  rmAttr(...attrs: string[]) {
    for (let key of attrs) {
      this.element.removeAttribute(key);
      delete this.element.attributes[key];
    }
    return this;
  }

  hasAttr(...attr: string[]) {
    for (let key of attr) {
      if (!(key in this.element.attributes)) {
        return false;
      }
    }
    return true;
  }

  getAttr(attr: string) {
    return this.element.attributes[attr];
  }

  on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void) {
    if (fn) {
      this.element.addEventListener(evtName, (evt: HTMLElementEventMap[K]) => {
        return fn(this, evt);
      });
    }
    return this;
  }

  clicked(fn: (tag: CTag, evt: MouseEvent) => void) {
    return this.on('click', fn);
  }

  keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string) {
    if (key) {
      return this.on('keypress', (_, evt) => {
        if (evt.code == key || evt.key == key) {
          fn(this, evt);
        }
      });
    }

    return this.on('keypress', fn);
  }

  changed(fn: (tag: CTag, evt: Event) => void) {
    return this.on('change', fn);
  }

  submited(fn: (tag: CTag, evt: SubmitEvent) => void) {
    return this.on('submit', fn);
  }

  remove() {
    this.element.remove();
    return this;
  }

  clear() {
    (this.element as any).value = '';
    // Trigger input event, so clearing is treated as input!
    this.element.dispatchEvent(new InputEvent('input'));
    return this;
  }

  disable() {
    this.addAttr('disabled', 'disabled');
    return this;
  }

  enable() {
    this.rmAttr('disabled');
    return this;
  }

  q(selector) {
    return new CTag(this.element.querySelector(selector));
  }

  find(test: (el: HTMLElement) => boolean) {
    const actualChildren = [...this.children];
    for (const child of actualChildren) {
      if (test(child as HTMLElement)) return tag(child as HTMLElement);
    }

    return null;
  }
}

export function tag(arg0: string | HTMLElement, children: TagChildren = [], attach: boolean = false) {
  return new CTag(arg0, children, attach);
}

export function attach(tag: CTag) {
  if (context.attachedTag) {
    context.attachedTagStack.push(context.attachedTag);
  }
  context.attachedTag = tag;
}

export function detach() {
  if (context.attachedTagStack.length > 0) {
    context.attachedTag = context.attachedTagStack.pop();
  } else {
    context.attachedTag = null;
  }
}

export function detachAll() {
  context.attachedTag = null;
  context.attachedTagStack = [];
}

export function init(options: { root: string } = { root: 'body' }) {
  const root = new CTag(`(${options.root})`);
  attach(root);
  return root;
}

const interceptors: { [k: string]: TagBuilder | ((styles: StyleSet[]) => CTag) } = {
  ul: (children: TagChildren, attach: boolean = false) => {
    return tag(
      'ul',
      children.map((cl) => {
        return tag('li', [cl], attach);
      }),
    );
  },
  style: (styles: StyleSet[], attach: boolean = false) => {
    return tag('style', [context.css.generateCss(styles)], attach);
  },
};

type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
type AllTags = {
  [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
    attach: (...children: PickArgType<key>) => CTag;
  };
};
export const allTags: AllTags = new Proxy(
  {},
  {
    get: (t, p, r) => {
      const tagName = p.toString();
      const fn = (...children: any[]) => {
        if (interceptors[tagName]) {
          return interceptors[tagName](children, false);
        }
        return tag(tagName, children);
      };

      Object.defineProperty(fn, 'attach', {
        get: () => {
          return (...children: any[]) => {
            if (interceptors[tagName]) {
              return interceptors[tagName](children, true);
            }
            return tag(tagName, children, true);
          };
        },
      });

      return fn;
    },
  },
) as AllTags;

import { CssGenerator } from './css-generator.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { StyleMap, StyleSet, TagBuilder, TagChild, TagChildren, TagConfig } from './types.js';

export let context: {
  attachedTag: HoboTag;
  attachedTagStack: HoboTag[];
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
  if (cl instanceof HoboTag) return cl.element;
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

export class HoboTag<T extends HTMLElement = HTMLElement> {
  element: T;
  parent: HoboTag = null;

  /** If set to true, it will not be appended to it's parent */
  private silent: boolean = false;

  get children() {
    return getElementChildren(this.element);
  }

  get value() {
    if (this.element instanceof HTMLInputElement) return this.element.value;
    return;
  }
  set value(newValue) {
    if (this.element instanceof HTMLInputElement) this.element.value = newValue;
    return;
  }

  constructor(arg0: TagName | HTMLElement, children: TagChildren = [], silent: boolean = false) {
    this.silent = silent;

    if (typeof arg0 == 'string' && isSelector(arg0)) {
      this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
    } else if (typeof arg0 == 'string') {
      this.element = document.createElement(arg0) as T;
    } else if (arg0 instanceof HTMLElement) {
      this.element = arg0 as T;
    }

    children.map((cl) => {
      this.add(cl);
    });

    if (context.attachedTag && !this.silent) {
      context.attachedTag.add(this);
    }
  }

  set(children: TagChildren) {
    this.element.replaceChildren(...children.map((cl) => getElementForChild(cl)));
  }

  add(...children: TagChildren) {
    this.element.append(...children.map((cl) => getElementForChild(cl)));
    return this;
  }

  consume<T>(consumable: Consumable<T>, consumer: (self: HoboTag, newValue: T) => void) {
    consumable.changed((newValue) => consumer(this, newValue));
    consumer(this, consumable);
    return this;
  }

  text(text) {
    this.element.innerText = text;
    return this;
  }

  config(config: TagConfig) {
    if (config.attr) {
      this.addAttrs(config.attr);
    }
    if (config.classList) {
      this.addClass(...config.classList);
    }
    if (config.style) {
      this.addStyle(config.style);
    }
    if (config.text) {
      this.text(config.text);
    }
    if (config.value) {
      this.value = config.value;
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
    for (let key in classNames) {
      this.element.classList.remove(key);
    }
    return this;
  }

  replaceClass(targetClass: string, replaceClass: string) {
    this.element.classList.replace(targetClass, replaceClass);
    return this;
  }

  addStyle(styles: StyleMap) {
    for (let key in styles) {
      this.element.style.setProperty(key, styles[key]);
    }
    return this;
  }

  rmStyle(...styleNames: string[]) {
    for (let key in styleNames) {
      this.element.style.removeProperty(key);
    }
    return this;
  }

  addAttrs(attrs: { [k: string]: string }) {
    for (let key in attrs) {
      this.element.setAttribute(key, attrs[key]);
    }
    return this;
  }

  rmAttr(...attrs: string[]) {
    for (let key in attrs) {
      this.element.removeAttribute(key);
    }
    return this;
  }

  on<K extends keyof HTMLElementEventMap>(
    evtName: K | string,
    fn: (tag: HoboTag, evt: HTMLElementEventMap[K]) => void,
  ) {
    if (fn) {
      this.element.addEventListener(evtName, (evt: HTMLElementEventMap[K]) => {
        return fn(this, evt);
      });
    }
    return this;
  }

  clicked(fn: (tag: HoboTag, evt: MouseEvent) => void) {
    return this.on('click', fn);
  }

  keyPressed(fn: (tag: HoboTag, evt: KeyboardEvent) => void, key?: string) {
    if (key) {
      return this.on('keypress', (_, evt) => {
        if (evt.code == key || evt.key == key) {
          fn(this, evt);
        }
      });
    }

    return this.on('keypress', fn);
  }

  changed(fn: (tag: HoboTag, evt: Event) => void) {
    return this.on('change', fn);
  }

  submited(fn: (tag: HoboTag, evt: SubmitEvent) => void) {
    return this.on('submit', fn);
  }

  remove() {
    this.element.remove();
  }

  clear() {
    if (this.element instanceof HTMLInputElement) this.element.value = '';
  }

  q(selector) {
    return new HoboTag(this.element.querySelector(selector));
  }

  find(test: (el: HTMLElement) => boolean) {
    const actualChildren = [...this.children];
    for (const child of actualChildren) {
      if (test(child as HTMLElement)) return child;
    }

    return null;
  }

  static find(selector: string) {
    return new HoboTag(document.querySelector(selector) as HTMLElement);
  }
}

export function tag(arg0: string | HTMLElement, children: TagChildren = [], silent: boolean = false) {
  return new HoboTag(arg0, children, silent);
}

export function attach(tag: HoboTag) {
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

export function init(options: { root: string } = { root: 'body' }) {
  attach(new HoboTag(`(${options.root})`));
}

const interceptors: { [k: string]: TagBuilder | ((styles: StyleSet[]) => HoboTag) } = {
  ul: (children: TagChildren, silent: boolean = false) => {
    return tag(
      'ul',
      children.map((cl) => {
        return tag('li', [cl], silent);
      }),
    );
  },
  style: (styles: StyleSet[]) => {
    return tag('style', [context.css.generateCss(styles)]);
  },
};

type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;

export const allTags: {
  [key in ValidTagName]?: ((...children: PickArgType<key>) => HoboTag) & {
    silent: (...children: PickArgType<key>) => HoboTag;
  };
} = new Proxy(
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

      Object.defineProperty(fn, 'silent', {
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
);

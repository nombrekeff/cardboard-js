import { CssGenerator } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { StyleMap, StyleSet, TagBuilder, TagChild, TagChildren, TagConfig } from './types.js';
// import { getElementChildren, getElementForChild, getElementIndex, isSelector } from './util.js';

let context: {
  attachedTag: CTag;
  attachedTagStack: CTag[];
  css: CssGenerator;
} = {
  attachedTag: null,
  attachedTagStack: [],
  css: new CssGenerator(),
};

/** Returns the currently attached {CTag}*/
export function attached() {
  return context.attachedTag;
}

/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export class CTag<T extends HTMLElement = HTMLElement> {
  element: T;
  parent: CTag = null;

  /** If set to true, it be appended to the attached tag */
  private attachable: boolean = false;
  private meta = {
    ignoreRender: false,
    childIndex: 0,
  };

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
    } else {
      throw new Error('Invalid argument 0');
    }

    if (children.length > 0) this.setChildren(children);

    if (context.attachedTag && this.attachable) {
      context.attachedTag.append(this);
    }
  }

  /** Sets the children, removes previous children  */
  setChildren(children: TagChildren) {
    this.element.replaceChildren(
      ...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild), //
    );
  }

  append(...children: TagChildren) {
    this.element.append(
      ...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild), //
    );
    return this;
  }

  /** Whenever the consumable changes, it will call the consumer */
  consume<T>(consumable: Consumable<T>, consumer: (self: CTag, newValue: T) => void) {
    consumable.changed((newValue) => consumer(this, newValue));
    consumer(this, consumable);
    return this;
  }

  /**
   * When the consumable changes, it will call {ifTrue} if the consumable is true. Or {ifFalse} if the consumable is false.
   */
  doIf(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void) {
    const callback = (value) => {
      if (value) ifTrue(value);
      else ifFalse(value);
    };
    consumable.changed(callback);
    callback(consumable);
    return this;
  }

  /**
   * The oposite of {this.doIf}
   * When the consumable changes, it will call {ifTrue} if the consumable is false. Or {ifFalse} if the consumable is true.
   */
  doIfNot(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void) {
    return this.doIf(consumable, ifFalse, ifTrue);
  }

  /**
   * If the element is currently hidden it will add this element to the page
   */
  show() {
    if (!this.parent) return false;
    this.parent.element.insertBefore(this.element, this.parent.element.children[this.meta.childIndex]);
    return true;
  }

  /** Hide this element (removed from DOM) */
  hide() {
    this.meta.childIndex = getElementIndex(this.element);
    this.remove();
  }

  /** Hide this element if the consumer is truthy */
  hideIf(consumable: Consumable<boolean | number>) {
    const handleHide = (value: any) => {
      this.meta.ignoreRender = !value;
      if (!this.parent) return;
      if (!value) this.show();
      else this.hide();
    };

    consumable.changed(handleHide);
    this.meta.ignoreRender = !!consumable;
    return this;
  }

  /** Hide this element if the consumer is falsy */
  hideIfNot(consumable: Consumable<boolean | number>) {
    const handleShow = (value: any) => {
      this.meta.ignoreRender = !value;
      if (!this.parent) return;
      if (value) this.show();
      else this.hide();
    };

    consumable.changed(handleShow);
    this.meta.ignoreRender = !consumable;
    return this;
  }

  /** Adds classes to the element if the consumer is truthy */
  classIf(consumable: Consumable<any>, ...classes: string[]) {
    return this.doIf(
      consumable,
      () => this.addClass(...classes),
      () => this.rmClass(...classes),
    );
  }

  /** Adds classes to the element if the consumer is truthy */
  classIfNot(consumable: Consumable<any>, ...classes: string[]) {
    return this.doIfNot(
      consumable,
      () => this.addClass(...classes),
      () => this.rmClass(...classes),
    );
  }

  /** Add attribute to the element if the consumer is truthy */
  attrIf(consumable: Consumable<any>, attr: string, value: string = '') {
    return this.doIf(
      consumable,
      () => this.addAttr(attr, value),
      () => this.rmAttr(attr),
    );
  }

  /** Add attribute to the element if the consumer is truthy */
  attrIfNot(consumable: Consumable<any>, attr: string, value: string = '') {
    return this.doIfNot(
      consumable,
      () => this.addAttr(attr, value),
      () => this.rmAttr(attr),
    );
  }

  /** Disable this element if the consumer is truthy */
  disableIf(consumable: Consumable<any>) {
    return this.attrIf(consumable, 'disabled');
  }

  /** Disable this element if the consumer is truthy */
  disableIfNot(consumable: Consumable<any>) {
    return this.attrIfNot(consumable, 'disabled');
  }

  listen<K extends keyof HTMLElementEventMap>(
    tag: CTag,
    evt: K,
    consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void,
  ) {
    tag.on(evt, (other, evt) => consumer(this, other, evt));
    return this;
  }

  /** Set the `textContent` of the element */
  text(text) {
    this.element.textContent = text;
    return this;
  }

  /**
   * Configure the element in a single call by passing @param {TagConfig} config
   * instead of having to call a method for each property you want to changes
   */
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
      this.append(...config.children);
    }
    if (config.on) {
      for (const key in config.on) {
        this.on(key, config.on[key]);
      }
    }

    return this;
  }

  /** Add classes to the elements class list */
  addClass(...classNames: string[]) {
    this.element.classList.add(...classNames);
    return this;
  }

  /** Set the elements class name */
  className(className: string) {
    this.element.className = className;
    return this;
  }

  /** Remove classes from class list */
  rmClass(...classNames: string[]) {
    for (let key of classNames) {
      this.element.classList.remove(key);
    }
    return this;
  }

  /** Check if classes are present in this element */
  hasClass(...classNames: string[]) {
    for (let key of classNames) {
      if (!this.element.classList.contains(key)) {
        return false;
      }
    }
    return true;
  }

  /** Replace a class with another */
  replaceClass(targetClass: string, replaceClass: string) {
    this.element.classList.replace(targetClass, replaceClass);
    return this;
  }

  /** Toggle a class. If it's present it's removed, if it's not present its added. */
  toggleClass(targetClass: string) {
    if (this.hasClass(targetClass)) {
      this.rmClass(targetClass);
    } else {
      this.addClass(targetClass);
    }
    return this;
  }

  /** Add a single style */
  addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>) {
    this.element.style[property as string] = value;
    return this;
  }

  /** Set multiple styles at once */
  setStyle(styles: StyleMap) {
    for (let key in styles) {
      this.addStyle(key, styles[key]);
    }
    return this;
  }

  /** Remove styles */
  rmStyle(...styleNames: string[]) {
    for (let key of styleNames) {
      this.element.style.removeProperty(key);
    }
    return this;
  }

  /** Check if this element has styles */
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

  /** Add an event listener for a particular event */
  on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void) {
    if (fn) {
      this.element.addEventListener(evtName, (evt: HTMLElementEventMap[K]) => {
        return fn(this, evt);
      });
    }
    return this;
  }

  /** Add an event listener for a particular event that will only fire once */
  once<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void) {
    if (fn) {
      const listener = (evt: HTMLElementEventMap[K]) => {
        fn(this, evt);
        this.element.removeEventListener(evtName, listener);
      };

      this.element.addEventListener(evtName, listener);
    }
    return this;
  }

  /** Add a **click** event listener */
  clicked(fn: (tag: CTag, evt: MouseEvent) => void) {
    return this.on('click', fn);
  }

  /** Add a **keypress** event listener */
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

  /** Add a **change** event listener */
  changed(fn: (tag: CTag, evt: Event) => void) {
    return this.on('change', fn);
  }

  /** Add a **submit** event listener */
  submited(fn: (tag: CTag, evt: SubmitEvent) => void) {
    return this.on('submit', fn);
  }

  /** Remove element from the DOM */
  remove() {
    this.element.remove();
    return this;
  }

  /** Clear the `value` */
  clear() {
    (this.element as any).value = '';
    // Trigger input event, so clearing is treated as input!
    this.element.dispatchEvent(new InputEvent('input'));
    return this;
  }

  /** Disable the element */
  disable() {
    this.setDisabled(true);
    this.addAttr('disabled', 'disabled');
    return this;
  }

  /** Enable the element */
  enable() {
    this.setDisabled(false);
    return this;
  }

  /** Set whether the element should be disabled or not */
  setDisabled(disabled: boolean) {
    if (disabled) {
      this.addAttr('disabled', 'disabled');
    } else {
      this.rmAttr('disabled');
    }
  }

  /** Query a child in this element */
  q(selector): CTag | undefined {
    const element = this.element.querySelector(selector);
    if (element) {
      return new CTag(element);
    }
  }

  private _childrenFilterPredicate(item, index) {
    if (item instanceof CTag) item.parent = this;
    if (item instanceof CTag && item.meta.ignoreRender) {
      item.meta.childIndex = index;
      return false;
    }
    return true;
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

export function getElementIndex(node: Element) {
  var index = 0;
  while ((node = node.previousElementSibling)) {
    index++;
  }
  return index;
}
export function isSelector(str: string) {
  return str.match(/\(.+\)/);
}
export function getElementForChild(cl: TagChild): Node {
  if (typeof cl === 'string') return document.createTextNode(cl);
  if (cl instanceof CTag) return cl.element;
  if (cl instanceof HTMLElement) return cl;
  return null;
}
export function getElementChildren(element: HTMLElement): Node[] {
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

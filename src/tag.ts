import { CssGenerator } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { AllTags, StyleMap, StyleSet, TagBuilder, TagChild, TagChildren, TagConfig } from './types.js';

let context: {
  attachedTag: CTag;
  attachedTagStack: CTag[];
  css: CssGenerator;
} = {
  attachedTag: null,
  attachedTagStack: [],
  css: new CssGenerator(),
};

/**
 * Returns the currently attached {@link CTag}. See {@link attach} for more information.
 */
export function attached() {
  return context.attachedTag;
}

/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export class CTag {
  /** Reference to the HTMLElement that this @type {CTag} represents */
  element: HTMLElement;

  /** Reference to the parent @type {CTag} of this element */
  parent: CTag = null;

  /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
  private _children: TagChild[] = [];

  /** If set to true, it be appended to the attached tag */
  private attachable: boolean = false;
  private meta = {
    isHidden: false,
    nextSiblingID: null,
  };

  get children() {
    return this._getElementChildren(this.element);
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
    const isSelector = typeof arg0 == 'string' && arg0.match(/\(.+\)/);

    if (isSelector) {
      this.attachable = false;
      this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
    } else if (typeof arg0 == 'string') {
      this.element = document.createElement(arg0);
    } else if (arg0 instanceof HTMLElement) {
      this.attachable = false;
      this.element = arg0;
    } else {
      throw new Error('Invalid argument 0');
    }

    if (context.attachedTag && this.attachable) {
      context.attachedTag.append(this);
    }

    if (children.length > 0) this.setChildren(children);
  }

  /** Sets the children, removes previous children  */
  setChildren(children: TagChildren) {
    this.element.replaceChildren(
      ...children.filter(this._childrenFilterPredicate.bind(this)).map(this._getElementForChild), //
    );
    this._children = children;
  }

  append(...children: TagChildren) {
    this.element.append(
      ...children.filter(this._childrenFilterPredicate.bind(this)).map(this._getElementForChild), //
    );
    this._children.push(...children);
    return this;
  }

  prepend(...children: TagChildren) {
    this.element.prepend(
      ...children.filter(this._childrenFilterPredicate.bind(this)).map(this._getElementForChild), //
    );
    this._children.unshift(...children);
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
   * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
   * I will be placed exactly in the correct position, even if there are other elements hidden.
   *
   */
  show() {
    if (!this.parent.children.includes(this.element)) {
      // Get's the position of the element if all the children are visible
      const expectedIndex = this.parent._children.indexOf(this);

      // If the element should be the first child in the parent
      if (expectedIndex == 0) {
        this.parent.element.prepend(this.element);
      }
      // If the element should be the last child in the parent
      else if (expectedIndex == this.parent._children.length - 1) {
        this.parent.element.append(this.element);
      }
      // If the element should be the nth child in the parent
      else {
        // Calculate how many hidden children are before this element
        let hiddenBefore = 0;
        for (let i = expectedIndex - 1; i >= 0; i--) {
          const child = this.parent._children[i];
          if (child instanceof CTag) {
            if (child.meta.isHidden) {
              hiddenBefore++;
            }
          }
        }

        // Get the "real" children in the dom.
        // The index takes into account the items that are hidden
        const nextEl = this.parent.element.childNodes[expectedIndex - hiddenBefore];

        this.parent.element.insertBefore(this.element, nextEl);
      }
    }
    this.meta.isHidden = false;
    return true;
  }

  /** Hide this element (removed from DOM) */
  hide() {
    if (this.parent.children.includes(this.element)) {
      this.remove();
      this.meta.isHidden = true;
    }
  }

  /** Hide this element if the consumer is truthy */
  hideIf(consumable: Consumable<boolean | number>) {
    const handleHide = (value: any) => {
      this.meta.isHidden = !value;
      if (!this.parent) return;
      if (!value) this.show();
      else this.hide();
    };

    consumable.changed(handleHide);
    this.meta.isHidden = !!consumable;
    return this;
  }

  /** Hide this element if the consumer is falsy */
  hideIfNot(consumable: Consumable<boolean | number>) {
    const handleShow = (value: any) => {
      this.meta.isHidden = !value;
      if (!this.parent) return;
      if (value) this.show();
      else this.hide();
    };

    consumable.changed(handleShow);
    this.meta.isHidden = !consumable;
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

  /** Query a child in this element (in the DOM) */
  q(selector): CTag | undefined {
    const element = this.element.querySelector(selector);
    if (element) {
      return new CTag(element);
    }
  }

  /** Find a child in this element (in the DOM or NOT) */
  find(predicate: (el: TagChild) => boolean) {
    for (const child of this._children) {
      if (predicate(child)) {
        return child;
      }
    }
  }

  findTag(predicate: (el: CTag) => boolean) {
    for (const child of this._children) {
      if (child instanceof CTag && predicate(child)) {
        return child;
      }
    }
  }

  private _childrenFilterPredicate(item, index, items) {
    if (item instanceof CTag) item.parent = this;
    if (item instanceof CTag && item.meta.isHidden) {
      return false;
    }
    return true;
  }

  private _getElementForChild(cl: TagChild): Node {
    if (typeof cl === 'string') return document.createTextNode(cl);
    if (cl instanceof CTag) return cl.element;
    if (cl instanceof HTMLElement) return cl;
    return null;
  }

  private _getElementChildren(element: HTMLElement): Node[] {
    let childNodes = element.childNodes;
    let children = [];
    let i = childNodes.length;

    while (i--) {
      if (childNodes[i].nodeType == 1) {
        children.unshift(childNodes[i]);
      }
    }

    return children;
  }
}

/**
 * This function can do the following based on the first argument:
 * * create a tag if you provide a tag name: (`div`, `abbr`, `custom-tag`, ...),
 * * wrap around an existing element in the page if you pass in a selector: (`'(body)'`, `'(#id)'`, `'(.class)'`), any selector is allowed.
 * * wrap around an element passed in
 *
 * Then it can receive a list of children to be added.
 * And receives a third argument for attaching this tag to the currently attach tag ({@link attach})
 *
 * @example
 * ```ts
 * tag('div');
 * tag('(body)');
 * tag('(.someclass)');
 * tag(document.querySelector('#something'));
 * ```
 */
export function tag(arg0: string | HTMLElement, children: TagChildren = [], attach: boolean = false) {
  return new CTag(arg0, children, attach);
}

/**
 * Attach the given tag. This means that when other tags are created marked as attachable (using `<tag_name>.attach()`, `tag('<tag_name>', [], true)`),
 * they will be added as children of this tag.
 * You can call attach multiple times, and the last attach tag will be used.
 * Then when you've finished, you can call {@link detach} to go back to the previously attached tag if there is one, or clear the attached tag.
 *
 * @example
 * ```ts
 * attach(div());
 * div.attach();  // added as child of div
 * p.attach();    // added as child of div
 *
 * attach(div()); // New div
 * div.attach();  // added as child of new div
 * p.attach();    // added as child of new div
 *
 * detach();      // Back to previous div
 * detach();      // No attached tag
 * ```
 */
export function attach(tag: CTag) {
  if (context.attachedTag) {
    context.attachedTagStack.push(context.attachedTag);
  }
  context.attachedTag = tag;
}

/**
 * Detach the currently attached tag ({@link attach}). If there was another attached tag before it will become the currently attached tag.
 * If there are no previous attached tags, it will clear the attached tag.
 */
export function detach() {
  if (context.attachedTagStack.length > 0) {
    context.attachedTag = context.attachedTagStack.pop();
  } else {
    context.attachedTag = null;
  }
}

/**
 * Detaches all attached tags. There will be no attached tag after calling this function.
 */
export function detachAll() {
  context.attachedTag = null;
  context.attachedTagStack = [];
}

/**
 * It makes the body the attached tag ({@link attach}).
 * You can pass in a selector for an element you want to be the default attached tag.
 */
export function init(options: { root: string } = { root: 'body' }) {
  const root = new CTag(`(${options.root})`);
  attach(root);
  return root;
}

/** Override any tag function we want, to give it some custom behaviour, process the children, etc... */
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

/**
 * List of all HTML tag functions. From `div` to `abbr` :)
 * If you want to create any other tag, use the {@link tag} function.
 *
 * @example
 * ```ts
 * const { div, p, abbr, img, style, ... } = allTags;
 * ```
 */
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

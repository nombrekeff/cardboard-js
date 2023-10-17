import { CssGenerator } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { TagName } from './tag-names.js';
import { callOrReturn, camelToDash } from './util.js';
import { text } from './text.js';
import type {
  AllTags,
  Consumable,
  State,
  StyleMap,
  StyleSet,
  TagBuilder,
  TagChild,
  TagChildren,
  TagConfig,
} from './types.js';

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

  /** @param parent Reference to the parent @type {CTag} of this element */
  private _parent: CTag = null;
  get parent() {
    return this._parent;
  }
  set parent(newParent: CTag) {
    this._parent = newParent;
  }

  /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
  private _children: TagChild[] = [];

  private _cachedChildren: Node[] = [];
  get children() {
    this._getElementChildren(this.element);
    return this._cachedChildren;
  }

  /** If set to true, it be appended to the attached tag */
  private _attachable: boolean = false;
  private _meta = {
    isHidden: false,
    nextSiblingID: null,
  };

  get value() {
    return (this.element as any).value;
  }

  get style() {
    return this.element.style;
  }

  setValue(newValue: string) {
    (this.element as any).value = newValue;
    return this;
  }

  /** Gets the value of the element and clears the value */
  get consumeValue() {
    const value = this.value;
    this.clear();
    return value;
  }

  get id() {
    return this.element.id;
  }

  setId(id: string) {
    this.element.id = id;
    return this;
  }

  constructor(
    arg0: TagName | HTMLElement,
    children: TagChildren = [],
    attachable: boolean = false,
  ) {
    this._attachable = attachable;
    const isSelector = typeof arg0 == 'string' && arg0.match(/\(.+\)/);

    if (isSelector) {
      this._attachable = false;
      this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
    } else if (typeof arg0 == 'string') {
      this.element = document.createElement(arg0);
    } else if (arg0 instanceof HTMLElement) {
      this._attachable = false;
      this.element = arg0;
    } else {
      throw new Error('Invalid argument 0');
    }

    if (context.attachedTag && this._attachable) {
      context.attachedTag.append(this);
    }

    if (children.length > 0) this.setChildren(children);
  }

  /** Sets the children, removes previous children  */
  setChildren(children: TagChildren) {
    this.element.replaceChildren(
      ...children
        .map(this._setChildrenParent.bind(this))
        .filter(this._childrenFilterPredicate.bind(this))
        .map(this._getElementForChild), //
    );
    this._children = children;
    return this;
  }

  append(...children: TagChildren) {
    this.element.append(
      ...children
        .map(this._setChildrenParent.bind(this))
        .filter(this._childrenFilterPredicate.bind(this))
        .map(this._getElementForChild), //
    );
    this._children.push(...children);
    return this;
  }

  prepend(...children: TagChildren) {
    this.element.prepend(
      ...children
        .filter(this._childrenFilterPredicate.bind(this))
        .map(this._getElementForChild), //
    );
    this._children.unshift(...children);
    return this;
  }

  /** Whenever the consumable changes, it will call the consumer */
  consume<T>(
    consumable: Consumable<T>,
    consumer: (self: CTag, newValue: T) => void,
  ) {
    consumable.changed((newValue) => consumer(this, newValue));
    consumer(this, consumable);
    return this;
  }

  /**
   * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
   * I will be placed exactly in the correct position, even if there are other elements hidden.
   */
  async show() {
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
            if (child._meta.isHidden) {
              hiddenBefore++;
            }
          }
        }

        // Get the "real" children in the dom.
        // The index takes into account the items that are hidden
        const nextEl =
          this.parent.element.childNodes[expectedIndex - hiddenBefore];

        this.parent.element.insertBefore(this.element, nextEl);
      }
    }
    this._meta.isHidden = false;
    return true;
  }

  /** Hide this element (removed from DOM) */
  async hide() {
    if (this.parent.children.includes(this.element)) {
      console.log(this.remove);
      await this.remove();
      this._meta.isHidden = true;
    }
  }

  /**
   * When the consumable changes, it will call {ifTrue} when the consumable is true. Or {ifFalse} when the consumable is false.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
   */
  doIf(
    consumable: Consumable<any>,
    ifTrue: (value: any) => void,
    ifFalse: (value: any) => void,
    invert = false,
  ) {
    if (invert) {
      let temp = ifTrue;
      ifTrue = ifFalse;
      ifFalse = temp;
    }

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
  doIfNot(
    consumable: Consumable<any>,
    ifTrue: (value: any) => void,
    ifFalse: (value: any) => void,
  ) {
    return this.doIf(consumable, ifTrue, ifFalse, true);
  }

  /**
   * Hide this element when the consumer is truthy. Updates whenever the consumable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
   */
  hideIf(consumable: Consumable<boolean | number>, invert = false) {
    const handleHide = (value: any) => {
      const correctedValue = invert ? !value : !!value;
      this._meta.isHidden = correctedValue;

      if (!this.parent) return;
      if (!correctedValue) this.show();
      else this.hide();
    };

    consumable.changed(handleHide);
    handleHide(consumable);
    return this;
  }

  /** Hide this element when the consumer is falsy. Updates whenever the consumable changes. */
  hideIfNot(consumable: Consumable<boolean | number>) {
    return this.hideIf(consumable, true);
  }

  /**
   * Adds classes to the element when the consumer is truthy. Updates whenever the consumable changes.
   * You can pass in an array of classes, or a function that returns a list of classes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
   */
  classIf(
    consumable: Consumable<any>,
    classes: string[] | ((self: CTag) => string[]),
    invert = false,
  ) {
    return this.doIf(
      consumable,
      () => this.addClass(...callOrReturn(classes, this)),
      () => this.rmClass(...callOrReturn(classes, this)),
      invert,
    );
  }

  /**
   * Adds classes to the element when the consumer is falsy. Updates whenever the consumable changes.
   * You can pass in an array of classes, or a function that returns a list of classes.
   * For the oposite you can also use {@link classIf}
   */
  classIfNot(
    consumable: Consumable<any>,
    classes: string[] | ((self: CTag) => string[]),
  ) {
    return this.classIf(consumable, classes, true);
  }

  /**
   * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
   * Both {text} and {elseText} can be a string or a function that returns a string.
   * Updates whenever the consumable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
   */
  textIf(
    consumable: Consumable<any>,
    text: string | ((self: CTag) => string),
    elseText: string | ((self: CTag) => string) = '',
    invert = false,
  ) {
    return this.doIf(
      consumable,
      () => this.text(callOrReturn(text, this)),
      () => this.text(callOrReturn(elseText, this)),
      invert,
    );
  }

  /**
   * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
   * Both {text} and {elseText} can be a string or a function that returns a string.
   * Updates whenever the consumable changes.
   */
  textIfNot(
    consumable: Consumable<any>,
    text: string | ((self: CTag) => string),
    elseText: string | ((self: CTag) => string) = '',
  ) {
    return this.textIf(consumable, text, elseText, true);
  }

  /**
   * Add attribute to the element when the consumer is truthy. Updates whenever the consumable changes.
   * {value} can be a string or a function that returns a string.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
   */
  attrIf(
    consumable: Consumable<any>,
    attr: string,
    value: string | ((self: CTag) => string) = '',
    invert = false,
  ) {
    return this.doIf(
      consumable,
      () => this.addAttr(attr, callOrReturn(value, this)),
      () => this.rmAttr(attr),
      invert,
    );
  }

  /**
   * Add attribute to the element when the consumer is falsy. Updates whenever the consumable changes.
   * {value} can be a string or a function that returns a string.
   * If {invert} is set to true, the condition will be inversed
   */
  attrIfNot(
    consumable: Consumable<any>,
    attr: string,
    value: string | ((self: CTag) => string) = '',
  ) {
    return this.attrIf(consumable, attr, value, true);
  }

  /**
   * Disable this element when the consumer is truthy. Updates whenever the consumable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
   */
  disableIf(consumable: Consumable<any>, invert = false) {
    return this.attrIf(consumable, 'disabled', '', invert);
  }

  /** Disable this element when the consumer is falsy. Updates whenever the consumable changes. */
  disableIfNot(consumable: Consumable<any>) {
    return this.disableIf(consumable, true);
  }

  /**
   * Add style to the element when the consumer is truthy. Updates whenever the consumable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
   * {value} can be a string or a function that returns a string.
   */
  styleIf(
    consumable: Consumable<any>,
    style: string,
    value: string | ((self: CTag) => string) = '',
    invert = false,
  ) {
    return this.doIf(
      consumable,
      () => this.addStyle(style, callOrReturn(value, this)),
      () => this.rmStyle(style),
      invert,
    );
  }

  /**
   * Add style to the element when the consumer is falsy. Updates whenever the consumable changes.
   * {value} can be a string or a function that returns a string.
   */
  styleIfNot(
    consumable: Consumable<any>,
    style: string,
    value: string | ((self: CTag) => string) = '',
  ) {
    return this.styleIf(consumable, style, value, true);
  }

  /**
   * Add multiple styles to the element when the consumer is truthy. Updates whenever the consumable changes.
   * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
   */
  stylesIf(
    consumable: Consumable<any>,
    styles: StyleMap | ((self: CTag) => StyleMap),
    invert = false,
  ) {
    return this.doIf(
      consumable,
      () => this.setStyle(callOrReturn(styles, this)),
      () => this.rmStyle(...Object.keys(styles)),
      invert,
    );
  }

  /**
   * Add multiple styles to the element when the consumer is falsy. Updates whenever the consumable changes.
   * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
   * For the oposite use  {@link stylesIf}
   */
  stylesIfNot(
    consumable: Consumable<any>,
    styles: StyleMap | ((self: CTag) => StyleMap),
  ) {
    return this.stylesIf(consumable, styles, true);
  }

  /**
   * Listen to an event on the element. Like addEventListener.
   */
  listen<K extends keyof HTMLElementEventMap>(
    tag: CTag,
    evt: K,
    consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void,
  ) {
    tag.on(evt, (other, evt) => consumer(this, other, evt));
    return this;
  }

  /**
   * If {newText} is provided, it sets the `textContent` of the element.
   * If {newText} is provided, and a state is provided. It will use the {newText} as a template,
   * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
   *
   * If no argument is provided, it returns the `textContent` of the element
   */
  text<T = string | null>(
    newText?: T,
    st?: State<any>,
  ): T extends string ? CTag : string {
    if (newText == null) {
      return this.element.textContent as any;
    }

    if (st && newText) {
      return this.setChildren([text(newText as string, st)]) as any;
    }

    this.element.textContent = newText as string;

    return this as any;
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
  hasStyle<K extends CssProperty>(...styles: K[]) {
    for (let key of styles) {
      if (!this.element.style.getPropertyValue(camelToDash(key))) {
        return false;
      }
    }
    return true;
  }

  /** Adds a set of attributes to the element */
  setAttrs(attrs: { [k: string]: string }) {
    for (let key in attrs) {
      this.addAttr(key, attrs[key]);
    }
    return this;
  }

  /** Adds a single attribute to the element */
  addAttr(key: string, value: string) {
    this.element.attributes[key] = value;
    this.element.setAttribute(key, value);
    return this;
  }

  /** Remove attributes from the element */
  rmAttr(...attrs: string[]) {
    for (let key of attrs) {
      this.element.removeAttribute(key);
      delete this.element.attributes[key];
    }
    return this;
  }

  /** Check if this element has attributes */
  hasAttr(...attr: string[]) {
    for (let key of attr) {
      if (!(key in this.element.attributes)) {
        return false;
      }
    }
    return true;
  }

  /** Get an attributes value */
  getAttr(attr: string) {
    return this.element.attributes[attr];
  }

  /**
   * Returns a {@link Consumable} that fires when the Event {@param evtName} is fired in this element
   *
   * The return value of {@link fn} will be passed to the listeners of the {@link Consumable}
   */
  when<K extends keyof HTMLElementEventMap>(
    evtName: K | string,
    fn: (self: CTag) => any,
  ): Consumable {
    return {
      changed: (listener) => {
        this.on(evtName, () => {
          listener(fn(this));
        });
      },
    };
  }

  /** Add an event listener for a particular event */
  on<K extends keyof HTMLElementEventMap>(
    evtName: K | string,
    fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void,
  ) {
    if (fn) {
      this.element.addEventListener(evtName, (evt: HTMLElementEventMap[K]) => {
        return fn(this, evt);
      });
    }
    return this;
  }

  /** Add an event listener for a particular event that will only fire once */
  once<K extends keyof HTMLElementEventMap>(
    evtName: K | string,
    fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void,
  ) {
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
  async remove() {
    await this.element.remove();
    return this;
  }

  /**
   * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
   */
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

  private _setChildrenParent(item) {
    if (item instanceof CTag) item.parent = this;
    return item;
  }

  private _childrenFilterPredicate(item) {
    if (item instanceof CTag && item._meta.isHidden) {
      return false;
    }
    return true;
  }

  private _getElementForChild(cl: TagChild): Node {
    if (typeof cl === 'string') return document.createTextNode(cl);
    if (cl instanceof CTag) return cl.element;
    if (cl instanceof Node) return cl;
    return null;
  }

  // Update cached child nodes whenever this elements childs change
  // This makes it a lot faster to get children.
  // If the children have not changed, there's no need to set the children, use the previous ones
  private _mutationObserver: MutationObserver;
  private _getElementChildren(element: HTMLElement) {
    if (!this._mutationObserver) {
      this._mutationObserver = new MutationObserver((mutations, observer) => {
        this._setCachedChildren(element);
      });
      this._mutationObserver.observe(this.element, { childList: true });
      this._setCachedChildren(element);
    }
  }

  private _setCachedChildren(element: HTMLElement) {
    let childNodes = element.childNodes;

    let children = [];
    let i = childNodes.length;

    while (i--) {
      if (childNodes[i].nodeType == 1) {
        children.unshift(childNodes[i]);
      }
    }

    this._cachedChildren = children;
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
export function tag(
  arg0: string | HTMLElement,
  children: TagChildren = [],
  attach: boolean = false,
) {
  return new CTag(arg0, children, attach);
}

/**
 * Will call {onStart} when the element is added to the DOM.
 * And will call {onRemove} when the element is removed from the DOM.
 */
export function onLifecycle(
  tag: CTag,
  onStart: (tag: CTag, observer: MutationObserver) => Promise<any> | void,
  onRemove: (tag: CTag, observer: MutationObserver) => void,
  beforeRemove?: (tag: CTag) => Promise<boolean> | void,
) {
  let observingParent = false;

  if (beforeRemove) {
    const tempElRemove = tag.element.remove;
    tag.element.remove = async () => {
      console.log('element.remove');
      const result = beforeRemove(tag);
      if (!result || (result instanceof Promise && (await result))) {
        tempElRemove.call(tag.element);
      }
      console.log('element.remove end');
    };
  }
  if (onStart) {
    const tempOnStart = tag.show;
    tag.show = async () => {
      console.log('element.show');
      const result = tempOnStart.call(tag);
      if (result instanceof Promise) {
        return await result;
      }

      return result;
    };
  }

  const observer = new MutationObserver(async (mutations, observer) => {
    let hasBeenAdded = false;
    let hasBeenRemoved = false;

    for (let mut of mutations) {
      if (onStart && Array.from(mut.addedNodes).includes(tag.element)) {
        hasBeenAdded = true;
      }
      if (onRemove && Array.from(mut.removedNodes).includes(tag.element)) {
        hasBeenRemoved = true;
      }
    }

    if (hasBeenAdded && onStart) {
      const result = onStart(tag, observer);
      if (result instanceof Promise) {
        await result;
      }


      // When element is added, change observer to observe parent instead of body
      // Improve performance, as we just need to know if it's added or removed from the parent!
      if (!observingParent) {
        observer.disconnect();
        observer.observe(tag.element.parentElement, { childList: true });
        observingParent = true;
      }
    }

    if (hasBeenRemoved && onRemove) {
      onRemove(tag, observer);
    }
  });

  observer.observe(tag.parent?.element ?? document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

/**
 * Will call {handler.onStart} when the element is added to the DOM.
 * And will call {handler.onRemove} when the element is removed from the DOM.
 */
export const withLifecycle = (
  tag: CTag,
  handler: {
    start?: (tag: CTag) => Promise<boolean> | void;
    removed?: (tag: CTag) => void;
    beforeRemove?: (tag: CTag) => Promise<boolean> | void;
  },
): CTag => {
  onLifecycle(tag, handler.start, handler.removed, handler.beforeRemove);
  return tag;
};

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
  return tag;
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
const interceptors: {
  [k: string]: TagBuilder | ((styles: StyleSet[]) => CTag);
} = {
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
 * @type {AllTags}
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

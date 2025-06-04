import type {
  AllTags,
  IObservable,
  NoOp,
  Primitive,
  StyleMap,
  StyleSet,
  TagBuilder,
  TagChild,
  TagChildren,
  TagConfig,
  TextObj,
} from './types';
import { type CEvent } from './events.js';
import { genCss } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { TagName } from './tag-names.js';
import { val, camelToDash } from './util.js';
import { text } from './text.js';
import { createObservable, isObservable } from './observables.js';
import { createGlobalObserver } from './lifecycle.js';
import { CommonAttributes } from './attributes.js';

export const context: {
  attached?: CTag;
  stack: CTag[];
  observer?: {
    onAdded: CEvent<Node>;
    onRemoved: CEvent<Node>;
  };
} = {
  attached: undefined,
  stack: [],
};

/**
 * Returns the currently attached {@link CTag}. See {@link attach} for more information.
 */
export const attached = () => context.attached;

/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export class CTag {
  /** Reference to the HTMLElement that this @type {CTag} represents */
  el: HTMLElement & { remove: () => (Promise<boolean> | any) };

  /**
   * Any function inside this array, will be called whenever the CTag is {@link destroy}ed
   * Used to remove HTML Event Listeners and Observable listeners
   */
  private readonly _destroyers: NoOp[] = [];

  /** @param parent Reference to the parent @type {CTag} of this element */
  private _parent?: CTag;

  get parent(): CTag | undefined {
    return this._parent;
  }

  set parent(newParent: CTag) {
    this._parent = newParent;
  }

  /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
  private _children: TagChild[] = [];

  private _cachedChildren: Node[] = [];
  get children() {
    return this._getChildren(this.el);
  }

  /** If set to true, it be appended to the attached tag */
  private readonly _attachable: boolean = false;

  private readonly _meta = {
    isHidden: false,
    nextSiblingID: null,
  };

  get value() {
    return (this.el as any).value;
  }

  setValue(newValue: string) {
    (this.el as any).value = newValue;
    return this;
  }

  get checked() {
    return (this.el as any).checked;
  }

  setChecked(checked: boolean) {
    (this.el as any).checked = checked;
    return this;
  }

  get style() {
    return this.el.style;
  }

  get className() {
    return this.el.className;
  }

  get classList() {
    return this.el.classList;
  }

  /** Gets the value of the element and clears the value */
  get consumeValue() {
    const value = this.value;
    this.clear();
    return value;
  }

  get id() {
    return this.el.id;
  }

  setId(id: string) {
    this.el.id = id;
    return this;
  }

  constructor(arg0: TagName | HTMLElement, children: TagChildren = [], attachable: boolean = false) {
    this._attachable = false;
    const isSelector = typeof arg0 === 'string' && arg0.match(/\(.+\)/);

    if (isSelector) {
      const match = arg0.match(/\((.+)\)/);
      const selector = match ? match[1] : null;
      if (!selector) {
        throw new Error('Invalid selector: ' + arg0);
      }

      const element = document.querySelector(selector);

      if (!element) {
        throw new Error("Can't find element for selector: " + arg0);
      }

      this.el = element as HTMLElement;
    }
    else if (typeof arg0 === 'string') {
      this._attachable = attachable;
      this.el = document.createElement(arg0);
    }
    else if (arg0 instanceof HTMLElement) {
      this.el = arg0;
    }
    else {
      throw new Error('Invalid argument 0');
    }

    if (context.attached && this._attachable) {
      context.attached.append(this);
    }

    if (children.length > 0) this.setChildren(children);
  }

  /** Sets the children, removes previous children  */
  setChildren(children: TagChildren) {
    this.el.replaceChildren(...this._mapChildren(children));
    this._children = children;
    return this;
  }

  append(...children: TagChildren) {
    this.el.append(...this._mapChildren(children));
    this._children.push(...children);
    return this;
  }

  prepend(...children: TagChildren) {
    this.el.prepend(...this._mapChildren(children));
    this._children.unshift(...children);
    return this;
  }

  /**
   * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
   * I will be placed exactly in the correct position, even if there are other elements hidden.
   */
  async show() {
    if (this.parent && !this.parent.children.includes(this.el)) {
      const parentEl = this.parent.el;
      // Get's the position of the element if all the children are visible
      const expectedIndex = this.parent._children.indexOf(this);

      // If the element should be the first child in the parent
      if (expectedIndex === 0) {
        parentEl.prepend(this.el);
      }
      // If the element should be the last child in the parent
      else if (expectedIndex === this.parent._children.length - 1) {
        parentEl.append(this.el);
      }
      // If the element should be the nth child in the parent
      else {
        // Calculate how many hidden children are before this element
        let hiddenBefore = 0;
        for (let i = expectedIndex - 1; i >= 0; i--) {
          const child = this.parent._children[i];
          if (child instanceof CTag && child._meta.isHidden) {
            hiddenBefore++;
          }
        }

        // Get the "real" children in the dom.
        // The index takes into account the items that are hidden
        const nextEl = parentEl.childNodes[expectedIndex - hiddenBefore];
        parentEl.insertBefore(this.el, nextEl);
      }
    }
    this._meta.isHidden = false;
    return true;
  }

  /** Hide this element (removed from DOM) */
  async hide() {
    if (this.parent && this.parent.children.includes(this.el)) {
      await this.remove();
      this._meta.isHidden = true;
    }
  }

  /** Whenever the observable changes, it will call the consumer */
  consume<T>(observable: IObservable<T>, consumer: (self: CTag, newValue?: T) => void) {
    if (observable.changed) {
      const cb = (newValue) => consumer(this, newValue);
      observable.changed(cb);

      this._destroyers.push(() => {
        // Destroy reference to the observable, we don't need it anymore
        observable.remove(cb);
        (observable as any) = null;
      });
    }
    else {
      console.warn('An invalid Observable was supplied to `tag.consume`');
    }

    consumer(this, ('value' in observable) ? observable.value : observable);
    return this;
  }

  /**
   * When the observable changes, it will call {ifTrue} when the observable is true. Or {ifFalse} when the observable is false.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
   */
  doIf<T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void, invert = false) {
    if (invert) {
      const temp = ifTrue;
      ifTrue = ifFalse;
      ifFalse = temp;
    }

    const callback = (_, value) => {
      // eslint-disable-next-line no-extra-boolean-cast
      if (!!value) ifTrue(value);
      else ifFalse(value);
    };

    return this.consume(observable, callback);
  }

  /**
   * The oposite of {this.doIf}
   * When the observable changes, it will call {ifTrue} if the observable is false. Or {ifFalse} if the observable is true.
   */
  doIfNot<T>(observable: IObservable<T>, ifTrue: (value: T) => void, ifFalse: (value: T) => void) {
    return this.doIf(observable, ifTrue, ifFalse, true);
  }

  /**
   * Hide this element when the consumer is truthy. Updates whenever the observable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
   */
  hideIf<T>(observable: IObservable<T>, invert = false) {
    const handleHide = (_, value: any) => {
      const correctedValue = invert ? !value : !!value;
      this._meta.isHidden = correctedValue;

      if (!this.parent) return;
      if (!correctedValue) void this.show();
      else void this.hide();
    };

    return this.consume(observable, handleHide);
  }

  /** Hide this element when the consumer is falsy. Updates whenever the observable changes. */
  hideIfNot<T>(observable: IObservable<T>) {
    return this.hideIf(observable, true);
  }

  /**
   * Adds classes to the element when the consumer is truthy. Updates whenever the observable changes.
   * You can pass in an array of classes, or a function that returns a list of classes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
   */
  classIf<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[]), invert = false) {
    return this.doIf(
      observable,
      () => this.addClass(...val(classes, this)),
      () => this.rmClass(...val(classes, this)),
      invert,
    );
  }

  /**
   * Adds classes to the element when the consumer is falsy. Updates whenever the observable changes.
   * You can pass in an array of classes, or a function that returns a list of classes.
   * For the oposite you can also use {@link classIf}
   */
  classIfNot<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[])) {
    return this.classIf(observable, classes, true);
  }

  /**
   * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
   * Both {text} and {elseText} can be a string or a function that returns a string.
   * Updates whenever the observable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
   */
  textIf<T>(
    observable: IObservable<T>,
    text: string | ((self: CTag) => string),
    elseText: string | ((self: CTag) => string) = '',
    invert = false,
  ) {
    return this.doIf(
      observable,
      () => this.text(val(text, this)),
      () => this.text(val(elseText, this)),
      invert,
    );
  }

  /**
   * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
   * Both {text} and {elseText} can be a string or a function that returns a string.
   * Updates whenever the observable changes.
   */
  textIfNot<T>(
    observable: IObservable<T>,
    text: string | ((self: CTag) => string),
    elseText: string | ((self: CTag) => string) = '',
  ) {
    return this.textIf(observable, text, elseText, true);
  }

  /**
   * Add attribute to the element when the consumer is truthy. Updates whenever the observable changes.
   * {value} can be a string or a function that returns a string.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
   */
  attrIf<T>(observable: IObservable<T>, attr: CommonAttributes, value: string | ((self: CTag) => string) = '', invert = false) {
    return this.doIf(
      observable,
      () => this.addAttr(attr, val(value, this)),
      () => this.rmAttr(attr),
      invert,
    );
  }

  /**
   * Add attribute to the element when the consumer is falsy. Updates whenever the observable changes.
   * {value} can be a string or a function that returns a string.
   * If {invert} is set to true, the condition will be inversed
   */
  attrIfNot<T>(observable: IObservable<T>, attr: CommonAttributes, value: string | ((self: CTag) => string) = '') {
    return this.attrIf(observable, attr, value, true);
  }

  /**
   * Disable this element when the consumer is truthy. Updates whenever the observable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
   */
  disableIf<T>(observable: IObservable<T>, invert = false) {
    return this.attrIf(observable, 'disabled', '', invert);
  }

  /** Disable this element when the consumer is falsy. Updates whenever the observable changes. */
  disableIfNot<T>(observable: IObservable<T>) {
    return this.disableIf(observable, true);
  }

  /**
   * Add style to the element when the consumer is truthy. Updates whenever the observable changes.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
   * {value} can be a string or a function that returns a string.
   */
  styleIf<T>(observable: IObservable<T>, style: string, value: string | ((self: CTag) => string) = '', invert = false) {
    return this.doIf(
      observable,
      () => this.addStyle(style, val(value, this)),
      () => this.rmStyle(style),
      invert,
    );
  }

  /**
   * Add style to the element when the consumer is falsy. Updates whenever the observable changes.
   * {value} can be a string or a function that returns a string.
   */
  styleIfNot<T>(observable: IObservable<T>, style: string, value: string | ((self: CTag) => string) = '') {
    return this.styleIf(observable, style, value, true);
  }

  /**
   * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
   * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
   * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
   */
  stylesIf<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap), invert = false) {
    return this.doIf(
      observable,
      () => this.setStyle(val(styles, this)),
      () => this.rmStyle(...Object.keys(styles)),
      invert,
    );
  }

  /**
   * Add multiple styles to the element when the consumer is falsy. Updates whenever the observable changes.
   * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
   * For the oposite use  {@link stylesIf}
   */
  stylesIfNot<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap)) {
    return this.stylesIf(observable, styles, true);
  }

  /**
   * Listen to an event on the element. Like addEventListener.
   */
  listen<K extends keyof HTMLElementEventMap>(
    tag: CTag,
    evt: K,
    consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void,
  ) {
    return tag.on(evt, (other, evt) => {
      consumer(this, other, evt);
    });
  }

  /**
   * If {newText} is provided, it sets the `textContent` of the element.
   * If {newText} is provided, and a state is provided. It will use the {newText} as a template,
   * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
   *
   * If no argument is provided, it returns the `textContent` of the element.
   * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
   */
  text<T extends Record<string, Primitive>, K extends TextObj, J extends string>(textTemplate?: string, obj?: IObservable<T> | K): J extends string ? CTag : string {
    if (textTemplate == null) {
      return this.el.textContent as any;
    }

    if (obj && textTemplate) {
      return this.setChildren([text(textTemplate, obj)]) as any;
    }

    this.el.textContent = textTemplate;

    return this as any;
  }

  /**
   * Configure the element in a single call by passing @param {TagConfig} c
   * instead of having to call a method for each property you want to changes
   */
  config(c: TagConfig) {
    if (c.attr) this.setAttrs(c.attr);
    if (c.classList) this.addClass(...c.classList);
    if (c.className) this.setClassName(c.className);
    if (c.style) this.setStyle(c.style);
    if (c.text) this.text(c.text);
    if (c.value) this.setValue(c.value);
    if (c.children) this.append(...c.children);
    if (c.on) {
      for (const key of Object.keys(c.on)) {
        this.on(key, c.on[key]);
      }
    }

    return this;
  }

  /** Add classes to the elements class list */
  addClass(...classes: string[]) {
    this.classList.add(...classes);
    return this;
  }

  /** Set the elements class name */
  setClassName(className: string) {
    this.el.className = className;
    return this;
  }

  /** Remove classes from class list */
  rmClass(...classes: string[]) {
    for (const key of classes) {
      this.classList.remove(key);
    }
    return this;
  }

  /** Check if classes are present in this element */
  hasClass(...classes: string[]) {
    for (const key of classes) {
      if (!this.classList.contains(key)) {
        return false;
      }
    }
    return true;
  }

  /** Replace a class with another */
  replaceClass(targetClass: string, replaceClass: string) {
    this.classList.replace(targetClass, replaceClass);
    return this;
  }

  /** Toggle a class. If it's present it's removed, if it's not present its added. */
  toggleClass(targetClass: string): CTag {
    return this.hasClass(targetClass) ? this.rmClass(targetClass) : this.addClass(targetClass);
  }

  /** Add a single style */
  addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>) {
    this.el.style[property as string] = value;
    return this;
  }

  /** Set multiple styles at once */
  setStyle(styles: StyleMap) {
    for (const key in styles) {
      this.addStyle(key, styles[key] ?? '');
    }
    return this;
  }

  /** Remove styles */
  rmStyle(...styleNames: string[]) {
    for (const key of styleNames) {
      this.style.removeProperty(camelToDash(key));
    }
    return this;
  }

  /** Check if this element has styles */
  hasStyle(...styles: CssProperty[]) {
    for (const key of styles) {
      if (!this.style.getPropertyValue(camelToDash(key))) {
        return false;
      }
    }
    return true;
  }

  /** Adds a set of attributes to the element */
  setAttrs(attrs: Record<string, string | undefined>) {
    for (const key in attrs) {
      this.addAttr(key, attrs[key]);
    }
    return this;
  }

  /** Adds a single attribute to the element */
  addAttr(key: CommonAttributes, value: string = '') {
    this.el.attributes[key as string] = value;
    this.el.setAttribute(key, value);
    return this;
  }

  /** Remove attributes from the element */
  rmAttr(...attrs: CommonAttributes[]) {
    for (const key of attrs) {
      this.el.removeAttribute(key);
      delete this.el.attributes[key];
    }
    return this;
  }

  /** Check if this element has attributes */
  hasAttr(...attr: CommonAttributes[]) {
    for (const key of attr) {
      if (!(key in this.el.attributes)) {
        return false;
      }
    }
    return true;
  }

  /** Get an attributes value */
  getAttr(attr: CommonAttributes) {
    return this.el.attributes[attr];
  }

  /**
   * Returns a {@link IObservable} that fires when the Event {@link evtName} is fired in this element
   *
   * The return value of {@link fn} will be passed to the listeners of the {@link IObservable}
   */
  when<K extends keyof HTMLElementEventMap>(
    evtName: K | string,
    fn: (self: CTag, evt: HTMLElementEventMap[K]) => any,
  ): IObservable<any> {
    const cons = createObservable<any>({});
    this.on(evtName, (t, evt) => {
      cons.dispatch(fn(t, evt));
    });
    return cons;
  }

  /** Add an event listener for a particular event */
  on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void) {
    if (fn) {
      const cb = (evt: any) => fn(this, evt);
      this.el.addEventListener(evtName, cb);
      this._destroyers.push(() => {
        this.el.removeEventListener(evtName, cb);
      });
    }
    return this;
  }

  /** Add an event listener for a particular event that will only fire once */
  once<K extends keyof HTMLElementEventMap>(evtName: K & string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void) {
    const listener = (evt) => {
      fn(this, evt);
      this.el.removeEventListener(evtName, listener);
    };
    this.el.addEventListener(evtName, listener);
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
        if (evt.code === key || evt.key === key) {
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

  /**
   * Remove element from the DOM, but keep data as is. Can then be added again.
   * To fully remove the element use {@link destroy}
   */
  async remove() {
    // Might be a promise (it's overriden by `withLifecycle`)
    const result: any = this.el.remove();
    if (result instanceof Promise) {
      await result;
    }

    await (this.el as any).remove();
    return this;
  }

  /**
   * Destroy the element, should not be used afterwards
   */
  destroy() {
    this._children.forEach((cl) => {
      if (cl instanceof CTag) {
        cl.destroy();
      }
    });

    this._destroyers.forEach(listener => listener());
    this._children = [];
    this._cachedChildren = [];
    void this.remove();
  }

  /**
   * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
   */
  clear() {
    (this.el as any).value = '';
    // Trigger input event, so clearing is treated as input!
    this.el.dispatchEvent(new InputEvent('input'));
    return this;
  }

  /** Disable the element */
  disable() {
    return this.setDisabled(true);
  }

  /** Enable the element */
  enable() {
    return this.setDisabled(false);
  }

  /** Set whether the element should be disabled or not */
  setDisabled(disabled: boolean) {
    return disabled ? this.addAttr('disabled') : this.rmAttr('disabled');
  }

  /** Query a child in this element (in the DOM) */
  q(selector): CTag | undefined {
    const element = this.el.querySelector(selector);
    if (element) return new CTag(element);
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

  private _childrenFilterPredicate(item) {
    if (item instanceof CTag && item._meta.isHidden) {
      return false;
    }
    return true;
  }

  private _getElementForChild(cl: TagChild): Node | null {
    if (typeof cl === 'string') return document.createTextNode(cl);
    if (isObservable(cl)) {
      return text('$val', { val: (cl as IObservable) });
    }
    if (cl instanceof CTag) return cl.el;
    if (cl instanceof Node) return cl;
    return null;
  }

  // Update cached child nodes whenever this elements childs change
  // This makes it a lot faster to get children.
  // If the children have not changed, there's no need to set the children, use the previous ones
  private _observer: MutationObserver;
  private _getChildren(element: HTMLElement) {
    if (!this._observer) {
      this._observer = new MutationObserver(() => {
        this._cacheChildren(element);
      });
      this._observer.observe(this.el, { childList: true });
      this._cacheChildren(element);
    }
    return this._cachedChildren;
  }

  private _cacheChildren(element: HTMLElement) {
    const nodes = element.childNodes,
      children: Node[] = [];
    let i = nodes.length;

    while (i--) {
      if (nodes[i].nodeType === 1) {
        children.unshift(nodes[i]);
      }
    }

    this._cachedChildren = children;
  }

  private _mapChildren(children: TagChildren): Node[] {
    const mapped: Node[] = [];
    for (const child of children) {
      if (child instanceof CTag) {
        child.parent = this;
      }

      if (this._childrenFilterPredicate(child)) {
        const element = this._getElementForChild(child);
        if (element != null) mapped.push(element);
      }
    }
    return mapped;
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
export const tag = (arg0: string | HTMLElement, children: TagChildren = [], attach: boolean = false) => {
  return new CTag(arg0, children, attach);
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
export const attach = (tag: CTag) => {
  if (context.attached) {
    context.stack.push(context.attached);
  }
  context.attached = tag;
  return tag;
};

/**
 * Detach the currently attached tag ({@link attach}). If there was another attached tag before it will become the currently attached tag.
 * If there are no previous attached tags, it will clear the attached tag.
 */
export const detach = () => {
  context.attached = context.stack.pop();
};

/**
 * Detaches all attached tags. There will be no attached tag after calling this function.
 */
export const detachAll = () => {
  context.attached = undefined;
  context.stack = [];
};

/**
 * It makes the body the attached tag ({@link attach}).
 * You can pass in a selector for an element you want to be the default attached tag.
 */
export const init = (options: { root: string } = { root: 'body' }) => {
  const root = new CTag(`(${options.root})`);
  context.observer = createGlobalObserver();
  return attach(root);
};

/** Override any tag function we want, to give it some custom behaviour, process the children, etc... */
const interceptors: Record<string, TagBuilder | ((styles: StyleSet[]) => CTag)> = {
  ul: (children: TagChildren, attach: boolean = false) => {
    return tag(
      'ul',
      children.map((cl) => {
        return tag('li', [cl], attach);
      }),
    );
  },
  style: (styles: StyleSet[], attach: boolean = false) => {
    return tag('style', [genCss(styles)], attach);
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
        return interceptors[tagName] ? interceptors[tagName](children, false) : tag(tagName, children);
      };

      Object.defineProperty(fn, 'attach', {
        get: () => {
          return (...children: any[]) => {
            return interceptors[tagName] ? interceptors[tagName](children, true) : tag(tagName, children, true);
          };
        },
      });

      return fn;
    },
  },
) as AllTags;

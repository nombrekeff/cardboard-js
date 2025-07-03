import type {
  IObservable,
  NestedStyleMap,
  NoOp,
  Primitive,
  StyleMap,
  TagChild,
  TagChildren,
  TagConfig,
  TextObj,
} from './types';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { TagName } from './tag-names.js';
import { val, camelToDash, uuidv4 } from './util.js';
import { text } from './text.js';
import { createObservable, isObservable } from './observables.js';
import { CommonAttributes } from './attributes.js';
import { checkInitialized, context } from './context.js';


/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export class CTag {
  /** Reference to the HTMLElement that this @type {CTag} represents */
  el: HTMLElement & { remove: () => (Promise<boolean> | any) };


  private _visible = false;
  get visible() {
    return this._visible;
  }

  set visible(newValue: boolean) {
    this._visible = newValue;
    this.el.dispatchEvent(new CustomEvent('visible', {
      detail: {
        visible: newValue,
        tag: this,
      },
      bubbles: true,
      composed: true,
    }));
  }

  /**
   * Any function inside this array, will be called whenever the CTag is {@link destroy}ed
   * Used to remove HTML Event Listeners and Observable listeners
   * @hidden
   */
  private readonly _destroyers: NoOp[] = [];

  /** @param parent Reference to the parent @type {CTag} of this element. */
  private _parent?: CTag;

  get parent(): CTag | undefined {
    return this._parent;
  }

  set parent(newParent: CTag) {
    this._parent = newParent;
  }

  /** Holds the list of all children, the ones that are currently in the DOM and those that are not. */
  private _children: TagChild[] = [];

  private _cachedChildren: Node[] = [];
  get children() {
    return this._getChildren(this.el);
  }

  private readonly _meta = {
    isHidden: false,
    nextSiblingID: null,
  };

  /**
   * Gets the value of the `HTMLElement` that this CTag represents, if it has a value.
   */
  get value() {
    return (this.el as any).value;
  }

  /**
   * Sets the value of the `HTMLElement` that this CTag represents.
   */
  setValue(newValue?: string) {
    (this.el as any).value = newValue;
    return this;
  }

  /** 
   * Gets the checked state of the `HTMLElement` that this CTag represents, 
   * if it is a checkbox or radio button.
   */
  get checked() {
    return (this.el as any).checked;
  }

  /** 
   * Sets the checked state of the element, if it is a checkbox or radio button.
   */
  setChecked(checked: boolean) {
    (this.el as any).checked = checked;
    return this;
  }

  /** 
   * Gets the style of the `HTMLElement` that this CTag represents.
   */
  get style() {
    return this.el.style;
  }

  /** 
  * Gets the classname of the `HTMLElement` that this CTag represents.
  */
  get className() {
    return this.el.className;
  }

  /** 
   * Gets the classlist of the `HTMLElement` that this CTag represents.
   */
  get classList() {
    return this.el.classList;
  }

  /** Gets the value of the element and clears the value */
  get consumeValue() {
    const value = this.value;
    this.clear();
    return value;
  }

  /**
   * Get's the id of the `HTMLElement` that this CTag represents.
   */
  get id() {
    return this.el.id;
  }

  /**
   * Set's the id of the `HTMLElement` that this CTag represents.
   */
  setId(id: string) {
    this.el.id = id;
    return this;
  }

  constructor(arg0: TagName | HTMLElement, children: TagChildren = [], mountToParent: boolean = false) {
    const isSelector = typeof arg0 === 'string' && arg0.match(/\(.+\)/);

    if (isSelector) {
      const match = arg0.match(/\(([\.\#]?[a-zA-Z][a-zA-Z0-9_$]+)\)/);
      const selector = match ? match[1] : null;
      if (!selector) {
        throw new Error(`'${arg0}' is not a valid selector`);
      }

      const element = document.querySelector(selector);

      if (!element) {
        throw new Error('Can\'t find element for selector: ' + arg0);
      }

      this.el = element as HTMLElement;
    }
    else if (typeof arg0 === 'string') {
      this.el = document.createElement(arg0);

      if (context.mp && mountToParent) {
        context.mp.append(this);
      }
    }
    else if (arg0 instanceof HTMLElement) {
      this.el = arg0;
    }
    else {
      throw new Error('Invalid argument: ' + arg0);
    }

    if (children.length > 0) this.setChildren(children);

    // Used by other parts of Cardboard to identify this tag
    (this.el as any).tag = this;
  }

  /** 
   * Sets the children, removes previous children  
   */
  setChildren(children: TagChildren) {
    this.el.replaceChildren(...this._mapChildren(children));
    this._children = children;
    return this;
  }

  // TODO: Consider if passing `children` as a single argument is better than spreading it.
  /**
   * Appends the given `children` to the element.
   * 
   * @param {...TagChildren} children - The children to append to the element.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   * @example
   * ```ts
   * const tag = new CTag('div');
   * tag.append(
   *   new CTag('span', ['Child 1']),
   *   new CTag('span', ['Child 2']),
   * );
   * ```
   */
  append(...children: TagChildren) {
    this.el.append(...this._mapChildren(children));
    this._children.push(...children);
    return this;
  }

  /**
   * Prepends the given `children` to the element.
   * 
   * @param {...TagChildren} children - The children to append to the element.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   * @example
   * ```ts
   * const tag = new CTag('div');
   * tag.prepend(
   *   new CTag('span', ['Child 1']),
   *   new CTag('span', ['Child 2']),
   * );
   * ```
   */
  prepend(...children: TagChildren) {
    this.el.prepend(...this._mapChildren(children));
    this._children.unshift(...children);
    return this;
  }

  /**
   * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
   * I will be placed exactly in the correct position, even if there are other elements hidden.
   * **USE WITH CAUTION**: Not intended to be used in most cases.
   * @hidden
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

  /** 
   * Hide this element (removed from DOM) 
   * **USE WITH CAUTION**: Not intended to be used in most cases.
   * @hidden
   */
  async hide() {
    if (this.parent?.children.includes(this.el)) {
      this.parent.el.insertBefore(document.createComment(this.el.id), this.el as any);
      await this.remove();
      this._meta.isHidden = true;
    }
  }

  /** 
   * Whenever the `observable` changes, it will call the `callback`.
   * This is helpful to react to changes in observables and update the tag accordingly.
   * 
   * You can also do it directly, although you need to keep a reference to the tag yourself.
   * 
   * @param observable - The observable to listen to.
   * @param callback - The callback to call when the observable changes.
   * @returns {CTag} - The current CTag instance, allowing for method chaining.
   * 
   * @example
   * ```ts
   * const disabled = createObservable(false);
   * const tag = new CTag('div');
   * tag.consume(disabled, (self, isDisabled) => {
   *   console.log('New value:', isDisabled);
   *   self.setDisabled(isDisabled);
   * });
   * ```
   */
  consume<T>(observable: IObservable<T>, callback: (self: CTag, newValue?: T) => void) {
    if (observable.changed) {
      const cb = (newValue) => callback(this, newValue);
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

    callback(this, ('value' in observable) ? observable.value : observable);
    return this;
  }

  /**
   * When the observable changes, it will call `ifTrue` when the observable is true. Or `ifFalse` when the observable is false.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link doIfNot}
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @param {function} ifTrue - The function to call when the observable is truey.
   * @param {function} ifFalse - The function to call when the observable is falsey.
   * @param {boolean} [invert=false] - If true, the condition will be inversed.
   * @returns {CTag} - The current CTag instance, allowing for method chaining.
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
   * The oposite of {@link doIf}
   * When the observable changes, it will call `ifTrue` if the observable is false. Or `ifFalse` if the observable is true.
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @param {function} ifTrue - The function to call when the observable is falsy.
   * @param {function} ifFalse - The function to call when the observable is truthy.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   */
  doIfNot<T>(observable: IObservable<T>, ifTrue: (value: T) => void, ifFalse: (value: T) => void) {
    return this.doIf(observable, ifTrue, ifFalse, true);
  }

  /**
   * Hide this element when the consumer is truthy. Updates whenever the observable changes.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @param {boolean} [invert=false] - If true, the condition will be inversed.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   * 
   * @example
   * ```ts
   * const isHidden = createObservable(false);
   * const tag = new CTag('div');
   * tag.hideIf(isHidden); // Hides the tag when isHidden is true
   * ```
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

  /** 
   * Hide this element when the `observable` is falsy. Updates whenever the `observable` changes. 
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   * 
   * @example
   * ```ts
   * const isVisible = createObservable(false);
   * const tag = new CTag('div');
   * tag.hideIfNot(isVisible); // Hides the tag when isVisible is false
   * ```
   */
  hideIfNot<T>(observable: IObservable<T>) {
    return this.hideIf(observable, true);
  }

  /**
   * Adds classes to the element when the `observable` is truthy, and removes them when it is falsy.
   * Updates whenever the `observable` changes.
   * You can pass in an array of classes, or a function that returns a list of classes.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link classIfNot}
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @param {string[] | ((self: CTag) => string[])} classes - The classes to add to the element. Can be an array of strings or a function that returns an array of strings.
   * @param {boolean} [invert=false] - If true, the condition will be inversed.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   * 
   * @example
   * ```ts
   * const isActive = createObservable(true);
   * const tag = new CTag('div');
   * 
   * // Adds 'active' and 'highlighted' classes when isActive is true
   * tag.classIf(isActive, ['active', 'highlighted']); 
   * ```
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
   * Adds classes to the element when the `observable` is falsy, and removes them when it is truthy.
   * Updates whenever the `observable` changes.
   * You can pass in an array of classes, or a function that returns a list of classes.
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @param {string[] | ((self: CTag) => string[])} classes - The classes to add to the element. Can be an array of strings or a function that returns an array of strings.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   * 
   * @example
   * ```ts
   * const isActive = createObservable(true);
   * const tag = new CTag('div');
   * 
   * // Adds 'inactive' classes when isActive is false
   * tag.classIfNot(isActive, ['inactive']); 
   * ```
   */
  classIfNot<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[])) {
    return this.classIf(observable, classes, true);
  }

  /**
   * Sets `text` when the consumer is true, and sets `elseText (default='')` when the consumer is false.
   * Both `text` and `elseText` can be a string or a function that returns a string.
   * Updates whenever the observable changes.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link textIfNot}
   * 
   * @param {IObservable} observable - The observable to listen to.
   * @param {string | ((self: CTag) => string)} text - The text to set when the observable is truthy. Can be a string or a function that returns a string.
   * @param {string | ((self: CTag) => string)} [elseText=''] - The text to set when the observable is falsy. Can be a string or a function that returns a string. Defaults to an empty string.
   * @param {boolean} [invert=false] - If true, the condition will be inversed.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
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
   * Sets text when the consumer is falsy, and sets `elseText (default='')` when the consumer is truthy.
   * Both text and `elseText` can be a string or a function that returns a string.
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
   * `value` can be a string or a function that returns a string.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
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
   * `value` can be a string or a function that returns a string.
   * If `invert` is set to true, the condition will be inversed
   */
  attrIfNot<T>(observable: IObservable<T>, attr: CommonAttributes, value: string | ((self: CTag) => string) = '') {
    return this.attrIf(observable, attr, value, true);
  }

  /**
   * Disable this element when the consumer is truthy. Updates whenever the observable changes.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
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
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
   * `value` can be a string or a function that returns a string.
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
   * `value` can be a string or a function that returns a string.
   */
  styleIfNot<T>(observable: IObservable<T>, style: string, value: string | ((self: CTag) => string) = '') {
    return this.styleIf(observable, style, value, true);
  }

  /**
   * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
   * `styles` can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
   * If `invert` is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
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
   * `styles` can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
   * For the oposite use  {@link stylesIf}
   */
  stylesIfNot<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap)) {
    return this.stylesIf(observable, styles, true);
  }

  /**
   * Adds a `stylesheet` to main style manager, and adds the `className` to the element.
   * This is useful for adding styles to the element that are not inline styles.
   * By doing this we can have just one style definition for tags that will have the same styles.
   * 
   * @see https://github.com/nombrekeff/cardboard-js/wiki/Styling#6-advanced-styling-child-elements
   * 
   * @param {NestedStyleMap} stylesheet - The stylesheet to add to the style manager.
   * @param {string} [className] - The class name to add to the element. If not provided, a random UUID will be generated.
   * @return {CTag} - The current CTag instance, allowing for method chaining.
   */
  styled(stylesheet: NestedStyleMap | undefined, className?: string): this {
    // TODO(nombrekeff): sanitizing className might be a good idea
    className ??= uuidv4();

    if (stylesheet) {
      context.styleManager?.add({
        [`.${className}`]: stylesheet,
      });
    }

    return this.addClass(className);
  }

  /**
   * If {textTemplate} is provided, it sets the `textContent` of the element.
   * If {textTemplate} is provided, and a state is provided. It will use the {textTemplate} as a template,
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
   * instead of having to call a method for each property you want to change
   * 
   * @param {TagConfig} c - The configuration object containing properties to set on the element.
   * @returns {CTag} - The current CTag instance, allowing for method chaining
   * 
   * @example
   * ```ts
   * const tag = new CTag('div');
   * tag.config({
   *   attr: { id: 'my-div', 'data-custom': 'value' },
   *   classList: ['class1', 'class2'],
   *   className: 'my-class',
   *   style: { color: 'red', backgroundColor: 'blue' },
   *   text: 'Hello World',
   *   value: 'Initial Value',
   *   children: [new CTag('span', ['Child Text'])],
   *   on: {
   *     click: (self, evt) => console.log('Clicked!', self),
   *   },
   * });
   * ```
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

  /** 
   * Add classes to the elements class list.
   * 
   * @param {...string} classes - The classes to add to the element's class list.
   * @returns {CTag} - The current CTag instance, allowing for method chaining
   * 
   * @example
   * ```ts
   * const tag = new CTag('div');
   * tag.addClass('class1', 'class2');
   * ```
   */
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

  // TODO: Might be a good idea to return the listener so it can be removed later
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
   * Returns a {@link IObservable} that fires when the Event `evtName` is fired in this element
   * The return value of `fn` will be passed to the listeners of the {@link IObservable}
   * 
   * @param {K} evtName - The name of the event to listen for. For a list of valid event names, see {@link HTMLElementEventMap "available event names"}.
   * @param {fn} fn - The callback function to execute when the event is triggered.
   * @returns {IObservable<any>} - An observable that emits the return value of the callback function when the event is triggered.
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

  // TODO: Might be a good idea to return the listener so it can be removed later
  /** 
   * Add an event listener for a particular HTMLElement event 
   * 
   * @param {K} evtName - The name of the event to listen for. For a list of valid event names, see {@link HTMLElementEventMap "available event names"}.
   * @param {fn} fn - The callback function to execute when the event is triggered.
   * @returns {CTag} - The current CTag instance, allowing for method chaining
   */
  on<K extends keyof HTMLElementEventMap>(
    evtName: K | string,
    fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void
  ): CTag {
    if (fn) {
      const cb = (evt: any) => fn(this, evt);
      this.el.addEventListener(evtName, cb);
      this._destroyers.push(() => {
        this.el.removeEventListener(evtName, cb);
      });
    }
    return this;
  }

  /** 
   * Add an event listener for a particular event that will only fire once
   * @param {K} evtName - The name of the event to listen for. For a list of valid event names, see {@link HTMLElementEventMap "available event names"}.
   * @param {fn} fn - The callback function to execute when the event is triggered.
   * @returns {CTag} - The current CTag instance, allowing for method chaining
   */
  once<K extends keyof HTMLElementEventMap>(
    evtName: K & string,
    fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void
  ): CTag {
    const listener = (evt) => {
      fn(this, evt);
      this.el.removeEventListener(evtName, listener);
    };
    this.el.addEventListener(evtName, listener);
    return this;
  }

  // TODO: nombrekeff: maybe remove these convenience methods. Would free some space in the bundle
  /** Add a **click** event listener */
  clicked(fn: (tag: CTag, evt: MouseEvent) => void): CTag {
    return this.on('click', fn);
  }

  /** Add a **keypress** event listener */
  keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): CTag {
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
  changed(fn: (tag: CTag, evt: Event) => void): CTag {
    return this.on('change', fn);
  }

  /** Add a **submit** event listener */
  submited(fn: (tag: CTag, evt: SubmitEvent) => void): CTag {
    return this.on('submit', fn);
  }

  /**
   * Remove element from the DOM, but keep data as is. Can then be added again.
   * To fully remove the element use {@link destroy}
   * 
   * **USE WITH CAUTION!** Not intended to be used in most cases.
   */
  async remove(): Promise<CTag> {
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
   * 
   * **USE WITH CAUTION!** Not intended to be used in most cases.
   */
  destroy(): void {
    context.intObs?.unobserve(this.el);
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
  clear(): CTag {
    (this.el as any).value = '';
    // Trigger input event, so clearing is treated as input!
    this.el.dispatchEvent(new InputEvent('input'));
    return this;
  }

  /** Disable the element */
  disable(): CTag {
    return this.setDisabled(true);
  }

  /** Enable the element */
  enable(): CTag {
    return this.setDisabled(false);
  }

  /** 
   * Set whether the element should be disabled or not. It sets the `disabled` attribute.
   */
  setDisabled(disabled: boolean): CTag {
    return disabled ? this.addAttr('disabled') : this.rmAttr('disabled');
  }

  /** 
   * Query a child in this element (in the DOM)
   * 
   * @param {string} selector - The CSS selector to query the child element.
   * @returns {CTag | undefined} - Returns a CTag instance if the element is found, or undefined if not found.
   * 
   * @example
   * ```ts
   * const childTag = parentTag.q('.child-class');
   * ```
   */
  q(selector): CTag | undefined {
    const element = this.el.querySelector(selector);
    if (element) return new CTag(element);
  }

  /** 
   * Find a child in this element (in the DOM or NOT)
   * @param {function} predicate - A function that takes a TagChild and returns true if it matches the condition.
   * @returns {TagChild | undefined} - Returns the first TagChild that matches the predicate, or undefined if no match is found.
   */
  find(predicate: (el: TagChild) => boolean): TagChild | undefined {
    for (const child of this._children) {
      if (predicate(child)) {
        return child;
      }
    }
  }

  /**
   * Find a CTag child in this element (in the DOM or NOT)
   * @param {function} predicate - A function that takes a CTag and returns true if it matches the condition.
   * @returns {CTag | undefined} - Returns the first CTag that matches the predicate, or undefined if no match is found.
   */
  findTag(predicate: (el: CTag) => boolean): CTag | undefined {
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
      this._observer = new window.MutationObserver(() => {
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
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      // for (const child of children) {
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
 * Receives a third argument for mounting this tag to the currently mounted tag ({@link context.mp}).
 *
 * @example
 * ```ts
 * tag('div');
 * tag('(body)');
 * tag('(.someclass)');
 * tag(document.querySelector('#something'));
 * ```
 */
export const tag = (arg0: string | HTMLElement, children: TagChildren = [], mountToParent: boolean = false) => {
  checkInitialized();
  return new CTag(arg0, children, mountToParent);
};

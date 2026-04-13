import type {
  ChildTransformer,
  IObservable,
  Primitive,
  TagChild,
  TagChildren,
  TagConfig,
  TextObj,
} from "./types.js";
import { TagName } from "./tag-names.js";
import { text } from "./text.js";
import { CommonAttributes } from "./attributes.js";
import { checkInitialized, context } from "./context.js";
import {
  onLifecycle,
  triggerAttached,
  triggerDetached,
  triggerTeardown,
} from "./lifecycle.js";

/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export class CTag {
  public static childTransformers: ChildTransformer[] = [];

  /** Reference to the HTMLElement that this @type {CTag} represents */
  public el: HTMLElement & { remove: () => Promise<boolean> | any };
  public parent: CTag | null = null;

  private _visible = false;
  get visible() {
    return this._visible;
  }

  set visible(newValue: boolean) {
    this._visible = newValue;
    this.el.dispatchEvent(
      new CustomEvent("visible", {
        detail: {
          visible: newValue,
          tag: this,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  /** Holds the list of all children, the ones that are currently in the DOM and those that are not. */
  private _children: TagChild[] = [];

  get children() {
    return this._children;
  }

  private readonly _meta = {
    isHidden: false,
    anchorNode: null as Comment | null,
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

  constructor(
    arg0: TagName | HTMLElement,
    children: TagChildren = [],
    mountToParent: boolean = false,
  ) {
    const isSelector = typeof arg0 === "string" && arg0.match(/\(.+\)/);

    if (isSelector) {
      const match = arg0.match(/\(([.#]?[a-zA-Z][a-zA-Z0-9_$]+)\)/);
      const selector = match ? match[1] : null;
      if (!selector) {
        throw new Error(`'${arg0}' is not a valid selector`);
      }

      const element = document.querySelector(selector);

      if (!element) {
        throw new Error("Can't find element for selector: " + arg0);
      }

      this.el = element as HTMLElement;
    } else if (typeof arg0 === "string") {
      this.el = document.createElement(arg0);

      if (context.mp && mountToParent) {
        context.mp.append(this);
      }
    } else if (arg0 instanceof HTMLElement) {
      this.el = arg0;
    } else {
      const invalidArg = arg0 as unknown;
      throw new Error("Invalid argument: " + String(invalidArg));
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
  append(...children: TagChildren): this {
    for (let child of children) {
      if (!child) continue;

      child = this._resolveChild(child);
      this._children.push(child);
      const node = this._getElementForChild(child);

      if (node) {
        this.el.appendChild(node);
        if (child instanceof CTag) {
          child.parent = this;
          triggerAttached(child.el);
        }
      }
    }

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
    for (let child of children) {
      if (!child) continue;

      child = this._resolveChild(child);
      this._children.unshift(child);
      const node = this._getElementForChild(child);

      if (node) {
        this.el.prepend(node);
        if (child instanceof CTag) {
          child.parent = this;
          triggerAttached(child.el);
        }
      }
    }

    return this;
  }

  /**
   * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
   * I will be placed exactly in the correct position, even if there are other elements hidden.
   */
  hide(): this {
    if (this._meta.isHidden) return this;

    this._meta.isHidden = true;
    // Always create the anchor so the layout engine knows what to use during append()
    this._meta.anchorNode = document.createComment(
      `cardboard-hidden:${this.el.tagName.toLowerCase()}`,
    );

    if (this.el.parentNode) {
      this.el.replaceWith(this._meta.anchorNode);
      triggerDetached(this.el);
    }
    return this;
  }

  /**
   * Shows a hidden element. Can be called even if the element is not yet in the DOM.
   */
  show(): this {
    if (!this._meta.isHidden) return this;

    if (this._meta.anchorNode && this._meta.anchorNode.parentNode) {
      this._meta.anchorNode.replaceWith(this.el);
      triggerAttached(this.el);
    }

    this._meta.anchorNode = null;
    this._meta.isHidden = false;
    return this;
  }

  /**
   * Applies a plugin function to this tag and continues the chain.
   */
  use<T extends CTag>(this: T, plugin: (tag: T) => void): T {
    plugin(this);
    return this;
  }

  /**
   * If {textTemplate} is provided, it sets the `textContent` of the element.
   * If {textTemplate} is provided, and a state is provided. It will use the {textTemplate} as a template,
   * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
   *
   * If no argument is provided, it returns the `textContent` of the element.
   * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
   */
  text<
    T extends Record<string, Primitive>,
    K extends TextObj,
    J extends string,
  >(
    textTemplate?: string,
    obj?: IObservable<T> | K,
  ): J extends string ? CTag : string {
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
      for (const key of Object.keys(c.on) as Array<keyof typeof c.on>) {
        const callback = c.on[key];
        if (callback) {
          this.on(key, callback as any);
        }
      }
    }

    return this;
  }

  /** Adds a set of attributes to the element */
  setAttrs(attrs: Record<string, string | undefined>) {
    for (const key in attrs) {
      this.addAttr(key, attrs[key]);
    }
    return this;
  }

  /** Adds a single attribute to the element */
  addAttr(key: CommonAttributes, value: string = "") {
    this.el.setAttribute(key, value);
    return this;
  }

  /** Remove attributes from the element */
  rmAttr(...attrs: CommonAttributes[]) {
    for (const key of attrs) {
      this.el.removeAttribute(key);
    }
    return this;
  }

  /** Check if this element has attributes */
  hasAttr(...attr: CommonAttributes[]) {
    for (const key of attr) {
      if (!this.el.hasAttribute(key)) {
        return false;
      }
    }
    return true;
  }

  /** Get an attributes value */
  getAttr(attr: CommonAttributes) {
    return this.el.getAttribute(attr);
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
    fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void,
  ): CTag {
    const cb = (evt: Event) => fn(this, evt as HTMLElementEventMap[K]);
    this.el.addEventListener(evtName, cb);
    this.onTeardown(() => this.el.removeEventListener(evtName, cb));
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
    fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void,
  ): CTag {
    const listener = (evt: HTMLElementEventMap[K]) => {
      fn(this, evt);
      this.el.removeEventListener(evtName, listener);
    };
    this.el.addEventListener(evtName, listener);
    return this;
  }

  /**
   * Registers a hook that runs when the element is attached to the DOM.
   * This is useful for running code that depends on the element being in the document, such as measuring its size or position.
   */
  onAttached(fn: () => void): this {
    onLifecycle(this, "attached", fn);
    return this;
  }

  /**
   * Registers a hook that runs when the element is detached from the DOM.
   * This is useful for running cleanup code that depends on the element being in the document, such as clearing timers or intervals.
   * Note that this is not the same as `destroy()`, which is a more comprehensive teardown method. `onDetached` is specifically for handling DOM detachment events.
   */
  onDetached(fn: () => void): this {
    onLifecycle(this, "detached", fn);
    return this;
  }

  /**
   * Registers a hook that runs before the element is removed from the DOM.
   * This is useful for running cleanup code or preventing removal by returning false.
   */
  onBeforeRemove(fn: () => boolean | Promise<boolean>): this {
    onLifecycle(this, "beforeRemove", fn);
    return this;
  }

  /**
   * Registers a teardown function (e.g., for clearing observables or event listeners).
   * These are fired during `destroy()`.
   */
  onTeardown(fn: () => void): this {
    onLifecycle(this, "teardowns", fn);
    return this;
  }

  /** Add a **click** event listener */
  clicked(fn: (tag: CTag, evt: MouseEvent) => void): CTag {
    return this.on("click", fn);
  }

  /** Add a **keypress** event listener */
  keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): CTag {
    if (key) {
      return this.on("keypress", (_, evt) => {
        if (evt.code === key || evt.key === key) {
          fn(this, evt);
        }
      });
    }

    return this.on("keypress", fn);
  }

  /** Add a **change** event listener */
  changed(fn: (tag: CTag, evt: Event) => void): CTag {
    return this.on("change", fn);
  }

  /** Add a **submit** event listener */
  submited(fn: (tag: CTag, evt: SubmitEvent) => void): CTag {
    return this.on("submit", fn);
  }

  /**
   * Remove this tag from the DOM and unlink it from its parent children list.
   * The tag instance remains reusable and can be appended again later.
   * To fully teardown the element use {@link destroy}.
   */
  remove() {
    // Unlink this instance from its parent's logical children list.
    if (this.parent) {
      let index = this.parent._children.indexOf(this);
      while (index >= 0) {
        this.parent._children.splice(index, 1);
        index = this.parent._children.indexOf(this);
      }
      this.parent = null;
    }

    // If this tag is currently hidden, remove the anchor as well.
    if (this._meta.anchorNode?.parentNode) {
      this._meta.anchorNode.parentNode.removeChild(this._meta.anchorNode);
    }

    this._meta.anchorNode = null;
    this._meta.isHidden = false;
    this.el.remove();
    return this;
  }

  /**
   * Performs a full recursive destruction of the component and its logical children.
   * This calls remove() to handle DOM detachment and then severs all internal
   * references to ensure memory is reclaimed.
   */
  destroy(): void {
    this.remove();
    triggerTeardown(this.el);

    // Recursively destroy all logical children in the tree
    for (const child of this._children) {
      if (child instanceof CTag) {
        child.destroy();
      }
    }

    // Sever internal references
    this._children = [];
    this.parent = null;
  }

  /**
   * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
   */
  clear(): CTag {
    (this.el as any).value = "";
    // Trigger input event, so clearing is treated as input!
    this.el.dispatchEvent(new InputEvent("input"));
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
    return disabled ? this.addAttr("disabled") : this.rmAttr("disabled");
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
  q(selector: any): CTag | undefined {
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

  private _resolveChild(cl: any): any {
    let resolved = cl;
    for (const transformer of CTag.childTransformers) {
      const transformed = transformer(resolved);
      if (transformed !== undefined) {
        resolved = transformed;
      }
    }
    return resolved;
  }

  private _getElementForChild(resolvedChild: any): Node | null {
    if (typeof resolvedChild === "string")
      return document.createTextNode(resolvedChild);

    if (resolvedChild instanceof CTag) {
      return resolvedChild._meta.isHidden && resolvedChild._meta.anchorNode
        ? resolvedChild._meta.anchorNode
        : resolvedChild.el;
    }

    if (resolvedChild instanceof Node) return resolvedChild;
    return null;
  }

  private _mapChildren(children: TagChildren): Node[] {
    const mapped: Node[] = [];

    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (!child) continue;

      child = this._resolveChild(child);
      children[i] = child;

      if (child instanceof CTag) {
        child.parent = this;
      }

      // We unconditionally extract the node.
      // _getElementForChild will return either the element, or the tracked anchor if hidden.
      const element = this._getElementForChild(child);
      if (element != null) {
        mapped.push(element);
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
export const tag = (
  arg0: string | HTMLElement,
  children: TagChildren = [],
  mountToParent: boolean = false,
) => {
  checkInitialized();
  return new CTag(arg0, children, mountToParent);
};

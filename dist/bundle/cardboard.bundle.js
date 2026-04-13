var Cardboard = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/cardboard.ts
  var cardboard_exports = {};
  __export(cardboard_exports, {
    CEvent: () => CEvent,
    CMappedEvent: () => CMappedEvent,
    CTag: () => CTag,
    DiffState: () => DiffState,
    Observable: () => Observable,
    addClass: () => addClass,
    addStyle: () => addStyle,
    allTags: () => allTags,
    arraysEqual: () => arraysEqual,
    attrIf: () => attrIf,
    attrIfNot: () => attrIfNot,
    camelToDash: () => camelToDash,
    checkInitialized: () => checkInitialized,
    classIf: () => classIf,
    classIfNot: () => classIfNot,
    clearMountPoints: () => clearMountPoints,
    compute: () => compute,
    computeMultiple: () => computeMultiple,
    consume: () => consume,
    context: () => context,
    createGlobalObserver: () => createGlobalObserver,
    createObservable: () => createObservable,
    deepEquals: () => deepEquals,
    diffList: () => diffList,
    disableIf: () => disableIf,
    disableIfNot: () => disableIfNot,
    doIf: () => doIf,
    doIfNot: () => doIfNot,
    each: () => each,
    equalTo: () => equalTo,
    event: () => event,
    genBlock: () => genBlock,
    genBlockContent: () => genBlockContent,
    genCss: () => genCss,
    generateUID: () => generateUID,
    getMountPoint: () => getMountPoint,
    getValue: () => getValue,
    grab: () => grab,
    greaterThan: () => greaterThan,
    greaterThanOr: () => greaterThanOr,
    hasClass: () => hasClass,
    hasStyle: () => hasStyle,
    hideIf: () => hideIf,
    hideIfNot: () => hideIfNot,
    init: () => init,
    intersection: () => intersection,
    isArray: () => isArray,
    isEmpty: () => isEmpty,
    isInitialized: () => isInitialized,
    isObject: () => isObject,
    isObservable: () => isObservable,
    lessThan: () => lessThan,
    lessThanOr: () => lessThanOr,
    listState: () => listState,
    mappedEvent: () => mappedEvent,
    mountPoint: () => mountPoint,
    notEmpty: () => notEmpty,
    notEqualTo: () => notEqualTo,
    observe: () => observe,
    onLifecycle: () => onLifecycle,
    orchestrateRemoval: () => orchestrateRemoval,
    removeFromList: () => removeFromList,
    replaceClass: () => replaceClass,
    resetMountPoints: () => resetMountPoints,
    restoreMountPoint: () => restoreMountPoint,
    rmClass: () => rmClass,
    rmStyle: () => rmStyle,
    setClassName: () => setClassName,
    setStyle: () => setStyle,
    singleEvent: () => singleEvent,
    state: () => state,
    stateAdd: () => stateAdd,
    stateAddAt: () => stateAddAt,
    stateRemove: () => stateRemove,
    stateRemoveWhere: () => stateRemoveWhere,
    styleIf: () => styleIf,
    styleIfNot: () => styleIfNot,
    styled: () => styled,
    stylesIf: () => stylesIf,
    stylesIfNot: () => stylesIfNot,
    swapItems: () => swapItems,
    tag: () => tag,
    template: () => template,
    text: () => text,
    textIf: () => textIf,
    textIfNot: () => textIfNot,
    timer: () => timer,
    toggleClass: () => toggleClass,
    triggerAttached: () => triggerAttached,
    triggerDetached: () => triggerDetached,
    triggerTeardown: () => triggerTeardown,
    uuidv4: () => uuidv4,
    val: () => val,
    version: () => version,
    withMountPoint: () => withMountPoint
  });

  // src/util.ts
  var removeFromList = (item, list) => {
    if (!list)
      return false;
    const index = list.indexOf(item);
    if (index !== -1) {
      list.splice(index, 1);
      return true;
    }
    return false;
  };
  var camelToDash = (str) => str.replace(/([A-Z])/g, (val2) => `-${val2.toLowerCase()}`);
  var isObject = (obj) => {
    return typeof obj === "object" && !(obj instanceof Array);
  };
  var isArray = (obj) => {
    return Object.prototype.toString.call(obj) === "[object Array]";
  };
  var val = (val2, ...args) => {
    if (typeof val2 === "function") {
      return val2(...args);
    }
    return val2;
  };
  var swapItems = (array, from, to) => {
    const temp = array[from];
    array[from] = array[to];
    array[to] = temp;
    return array;
  };
  var arraysEqual = (a, b) => {
    if (a === b)
      return true;
    if (a == null || b == null)
      return false;
    if (a.length !== b.length)
      return false;
    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i])
        return false;
    }
    return true;
  };
  var deepEquals = (a, b) => {
    if (a === b)
      return true;
    if (a && b && a.length !== b.length)
      return false;
    if (a && b && typeof a == "object" && typeof b == "object") {
      if (a.constructor !== b.constructor)
        return false;
      var length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!deepEquals(a[i], b[i]))
            return false;
        return true;
      }
      if (a.constructor === RegExp)
        return a.source === b.source && a.flags === b.flags;
      if (a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        var key = keys[i];
        if (!deepEquals(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  };
  function generateUID(idNumber) {
    if (!idNumber)
      return uuidv4();
    return `c_${idNumber}`;
  }
  function uuidv4() {
    return "c_1000000010".replace(
      /[018]/g,
      (c) => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  // src/events.ts
  var CEvent = class {
    constructor() {
      this._lstrs = [];
    }
    listen(fn) {
      this._lstrs.push(fn);
    }
    remove(fn) {
      removeFromList(fn, this._lstrs);
    }
    dispatch(data) {
      this._lstrs.forEach((el) => el(data));
    }
    destroy() {
      this._lstrs = [];
    }
  };
  var CMappedEvent = class {
    constructor() {
      this._lstrs = {};
    }
    listen(evt, fn) {
      if (!(evt in this._lstrs)) {
        this._lstrs[evt] = [fn];
      } else if (this._lstrs[evt]) {
        this._lstrs[evt].push(fn);
      }
    }
    remove(evt, fn) {
      removeFromList(fn, this._lstrs[evt]);
    }
    dispatch(evt, data) {
      if (evt in this._lstrs) {
        this._lstrs[evt].forEach((el) => el(data));
      }
    }
    destroy() {
      this._lstrs = {};
    }
  };
  var singleEvent = () => {
    return new CEvent();
  };
  var mappedEvent = () => {
    return new CMappedEvent();
  };

  // src/context.ts
  var context = {
    mp: void 0,
    mpHistory: [],
    styleManager: void 0,
    intObs: void 0,
    obs: void 0,
    init: false
  };
  var isInitialized = () => context.init === true;
  var checkInitialized = () => {
    if (!isInitialized()) {
      throw new Error("Cardboard is not initialized. Please call `init()`, as some features will not work.");
    }
  };
  var getMountPoint = () => context.mp;
  var mountPoint = (tag2) => {
    if (context.mp) {
      context.mpHistory.push(context.mp);
    }
    context.mp = tag2;
    return tag2;
  };
  var restoreMountPoint = () => {
    context.mp = context.mpHistory.pop();
  };
  var clearMountPoints = () => {
    context.mp = void 0;
    context.mpHistory = [];
  };
  var resetMountPoints = () => {
    let first = context.mpHistory.shift();
    context.mp = first;
    context.mpHistory = [];
  };
  var withMountPoint = (tag2, scopedCallback) => {
    mountPoint(tag2);
    scopedCallback(tag2);
    restoreMountPoint();
  };
  var createGlobalObserver = () => {
    const _addedEvt = singleEvent();
    const _removedEvt = singleEvent();
    const observer2 = new window.MutationObserver((mutations, observer3) => {
      for (const mut of mutations) {
        for (const n of Array.from(mut.addedNodes)) {
          _addedEvt.dispatch(n);
        }
        for (const n of Array.from(mut.removedNodes)) {
          _removedEvt.dispatch(n);
        }
      }
    });
    observer2.observe(window.document.body, {
      childList: true,
      subtree: true
    });
    return {
      onAdded: _addedEvt,
      onRemoved: _removedEvt
    };
  };

  // src/lifecycle.ts
  var lifecycleRegistry = /* @__PURE__ */ new WeakMap();
  var observer = new window.MutationObserver((mutations) => {
    for (const mut of mutations) {
      for (let i = 0; i < mut.removedNodes.length; i++) {
        const node = mut.removedNodes[i];
        if (node.nodeType === Node.ELEMENT_NODE)
          traverse(node, "detached");
      }
      for (let i = 0; i < mut.addedNodes.length; i++) {
        const node = mut.addedNodes[i];
        if (node.nodeType === Node.ELEMENT_NODE)
          traverse(node, "attached");
      }
    }
  });
  if (typeof document !== "undefined") {
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }
  function traverse(root, type) {
    if (typeof document === "undefined" || !document.createTreeWalker) {
      return;
    }
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    let curr = walker.currentNode;
    while (curr) {
      const el = curr;
      if (type === "detached") {
        triggerDetached(el);
      } else {
        triggerAttached(el);
      }
      curr = walker.nextNode();
    }
  }
  function onLifecycle(tag2, type, fn) {
    let entry = lifecycleRegistry.get(tag2.el);
    if (!entry) {
      entry = { _fired: { attached: false, detached: false } };
      lifecycleRegistry.set(tag2.el, entry);
    }
    let hooksForType = entry[type];
    if (!hooksForType) {
      hooksForType = /* @__PURE__ */ new Set();
      entry[type] = hooksForType;
    }
    hooksForType.add(fn);
    if (type === "beforeRemove" && !tag2._isLifecycleUpgraded) {
      upgradeInstance(tag2);
    }
  }
  function upgradeInstance(tag2) {
    const originalRemove = tag2.remove.bind(tag2);
    tag2.remove = function() {
      orchestrateRemoval(tag2, () => originalRemove());
      return this;
    };
    tag2._isLifecycleUpgraded = true;
  }
  function orchestrateRemoval(tag2, physicalRemoval) {
    const hooks = lifecycleRegistry.get(tag2.el);
    const finalize = () => {
      physicalRemoval();
      triggerDetached(tag2.el);
    };
    if (hooks?.beforeRemove) {
      const results = Array.from(hooks.beforeRemove).map((fn) => fn());
      if (results.some((res) => res === false))
        return;
      const promises = results.filter(
        (r) => r instanceof Promise
      );
      if (promises.length > 0) {
        Promise.all(promises).then(finalize);
        return;
      }
    }
    finalize();
  }
  function triggerAttached(el) {
    const hooks = lifecycleRegistry.get(el);
    if (hooks && !hooks._fired?.attached) {
      hooks.attached?.forEach((fn) => fn());
      if (hooks._fired) {
        hooks._fired.attached = true;
        hooks._fired.detached = false;
      }
    }
  }
  function triggerDetached(el) {
    const hooks = lifecycleRegistry.get(el);
    if (hooks && !hooks._fired?.detached) {
      hooks.detached?.forEach((fn) => fn());
      if (hooks._fired) {
        hooks._fired.detached = true;
        hooks._fired.attached = false;
      }
    }
  }
  function triggerTeardown(el) {
    const hooks = lifecycleRegistry.get(el);
    hooks?.teardowns?.forEach((fn) => fn());
    hooks?.teardowns?.clear();
  }

  // src/tag.ts
  var CTag = class _CTag {
    constructor(arg0, children = [], mountToParent = false) {
      this.parent = null;
      this._visible = false;
      /** Holds the list of all children, the ones that are currently in the DOM and those that are not. */
      this._children = [];
      this._meta = {
        isHidden: false,
        anchorNode: null
      };
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
        this.el = element;
      } else if (typeof arg0 === "string") {
        this.el = document.createElement(arg0);
        if (context.mp && mountToParent) {
          context.mp.append(this);
        }
      } else if (arg0 instanceof HTMLElement) {
        this.el = arg0;
      } else {
        const invalidArg = arg0;
        throw new Error("Invalid argument: " + String(invalidArg));
      }
      if (children.length > 0)
        this.setChildren(children);
      this.el.tag = this;
    }
    static {
      this.childTransformers = [];
    }
    get visible() {
      return this._visible;
    }
    set visible(newValue) {
      this._visible = newValue;
      this.el.dispatchEvent(
        new CustomEvent("visible", {
          detail: {
            visible: newValue,
            tag: this
          },
          bubbles: true,
          composed: true
        })
      );
    }
    get children() {
      return this._children;
    }
    /**
     * Gets the value of the `HTMLElement` that this CTag represents, if it has a value.
     */
    get value() {
      return this.el.value;
    }
    /**
     * Sets the value of the `HTMLElement` that this CTag represents.
     */
    setValue(newValue) {
      this.el.value = newValue;
      return this;
    }
    /**
     * Gets the checked state of the `HTMLElement` that this CTag represents,
     * if it is a checkbox or radio button.
     */
    get checked() {
      return this.el.checked;
    }
    /**
     * Sets the checked state of the element, if it is a checkbox or radio button.
     */
    setChecked(checked) {
      this.el.checked = checked;
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
    setId(id) {
      this.el.id = id;
      return this;
    }
    /**
     * Sets the children, removes previous children
     */
    setChildren(children) {
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
    append(...children) {
      for (let child of children) {
        if (!child)
          continue;
        child = this._resolveChild(child);
        this._children.push(child);
        const node = this._getElementForChild(child);
        if (node) {
          this.el.appendChild(node);
          if (child instanceof _CTag) {
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
    prepend(...children) {
      for (let child of children) {
        if (!child)
          continue;
        child = this._resolveChild(child);
        this._children.unshift(child);
        const node = this._getElementForChild(child);
        if (node) {
          this.el.prepend(node);
          if (child instanceof _CTag) {
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
    hide() {
      if (this._meta.isHidden)
        return this;
      this._meta.isHidden = true;
      this._meta.anchorNode = document.createComment(
        `cardboard-hidden:${this.el.tagName.toLowerCase()}`
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
    show() {
      if (!this._meta.isHidden)
        return this;
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
    use(plugin) {
      plugin(this);
      return this;
    }
    /**
     * If no argument is provided, returns the `textContent` of the element.
     * If a string is provided, sets the `textContent`.
     */
    text(text2) {
      if (text2 == null) {
        return this.el.textContent || "";
      }
      this.el.textContent = text2;
      return this;
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
    config(c) {
      if (c.attr)
        this.setAttrs(c.attr);
      if (c.classList)
        this.addClass(...c.classList);
      if (c.className)
        this.setClassName(c.className);
      if (c.style)
        this.setStyle(c.style);
      if (c.text)
        this.text(c.text);
      if (c.value)
        this.setValue(c.value);
      if (c.children)
        this.append(...c.children);
      if (c.on) {
        for (const key of Object.keys(c.on)) {
          const callback = c.on[key];
          if (callback) {
            this.on(key, callback);
          }
        }
      }
      return this;
    }
    /** Adds a set of attributes to the element */
    setAttrs(attrs) {
      for (const key in attrs) {
        this.addAttr(key, attrs[key]);
      }
      return this;
    }
    /** Adds a single attribute to the element */
    addAttr(key, value = "") {
      this.el.setAttribute(key, value);
      return this;
    }
    /** Remove attributes from the element */
    rmAttr(...attrs) {
      for (const key of attrs) {
        this.el.removeAttribute(key);
      }
      return this;
    }
    /** Check if this element has attributes */
    hasAttr(...attr) {
      for (const key of attr) {
        if (!this.el.hasAttribute(key)) {
          return false;
        }
      }
      return true;
    }
    /** Get an attributes value */
    getAttr(attr) {
      return this.el.getAttribute(attr);
    }
    // TODO: Might be a good idea to return the listener so it can be removed later
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen(tag2, evt, consumer) {
      return tag2.on(evt, (other, evt2) => {
        consumer(this, other, evt2);
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
    on(evtName, fn) {
      const cb = (evt) => fn(this, evt);
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
    once(evtName, fn) {
      const listener = (evt) => {
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
    onAttached(fn) {
      onLifecycle(this, "attached", fn);
      return this;
    }
    /**
     * Registers a hook that runs when the element is detached from the DOM.
     * This is useful for running cleanup code that depends on the element being in the document, such as clearing timers or intervals.
     * Note that this is not the same as `destroy()`, which is a more comprehensive teardown method. `onDetached` is specifically for handling DOM detachment events.
     */
    onDetached(fn) {
      onLifecycle(this, "detached", fn);
      return this;
    }
    /**
     * Registers a hook that runs before the element is removed from the DOM.
     * This is useful for running cleanup code or preventing removal by returning false.
     */
    onBeforeRemove(fn) {
      onLifecycle(this, "beforeRemove", fn);
      return this;
    }
    /**
     * Registers a teardown function (e.g., for clearing observables or event listeners).
     * These are fired during `destroy()`.
     */
    onTeardown(fn) {
      onLifecycle(this, "teardowns", fn);
      return this;
    }
    /** Add a **click** event listener */
    clicked(fn) {
      return this.on("click", fn);
    }
    /** Add a **keypress** event listener */
    keyPressed(fn, key) {
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
    changed(fn) {
      return this.on("change", fn);
    }
    /** Add a **submit** event listener */
    submited(fn) {
      return this.on("submit", fn);
    }
    /**
     * Remove this tag from the DOM and unlink it from its parent children list.
     * The tag instance remains reusable and can be appended again later.
     * To fully teardown the element use {@link destroy}.
     */
    remove() {
      if (this.parent) {
        let index = this.parent._children.indexOf(this);
        while (index >= 0) {
          this.parent._children.splice(index, 1);
          index = this.parent._children.indexOf(this);
        }
        this.parent = null;
      }
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
    destroy() {
      this.remove();
      triggerTeardown(this.el);
      for (const child of this._children) {
        if (child instanceof _CTag) {
          child.destroy();
        }
      }
      this._children = [];
      this.parent = null;
    }
    /**
     * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
     */
    clear() {
      this.el.value = "";
      this.el.dispatchEvent(new InputEvent("input"));
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
    /**
     * Set whether the element should be disabled or not. It sets the `disabled` attribute.
     */
    setDisabled(disabled) {
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
    q(selector) {
      const element = this.el.querySelector(selector);
      if (element)
        return new _CTag(element);
    }
    /**
     * Find a child in this element (in the DOM or NOT)
     * @param {function} predicate - A function that takes a TagChild and returns true if it matches the condition.
     * @returns {TagChild | undefined} - Returns the first TagChild that matches the predicate, or undefined if no match is found.
     */
    find(predicate) {
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
    findTag(predicate) {
      for (const child of this._children) {
        if (child instanceof _CTag && predicate(child)) {
          return child;
        }
      }
    }
    _resolveChild(cl) {
      let resolved = cl;
      for (const transformer of _CTag.childTransformers) {
        const transformed = transformer(resolved);
        if (transformed !== void 0) {
          resolved = transformed;
        }
      }
      return resolved;
    }
    _getElementForChild(resolvedChild) {
      if (typeof resolvedChild === "string")
        return document.createTextNode(resolvedChild);
      if (resolvedChild instanceof _CTag) {
        return resolvedChild._meta.isHidden && resolvedChild._meta.anchorNode ? resolvedChild._meta.anchorNode : resolvedChild.el;
      }
      if (resolvedChild instanceof Node)
        return resolvedChild;
      return null;
    }
    _mapChildren(children) {
      const mapped = [];
      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (!child)
          continue;
        child = this._resolveChild(child);
        children[i] = child;
        if (child instanceof _CTag) {
          child.parent = this;
        }
        const element = this._getElementForChild(child);
        if (element != null) {
          mapped.push(element);
        }
      }
      return mapped;
    }
  };
  var tag = (arg0, children = [], mountToParent = false) => {
    checkInitialized();
    return new CTag(arg0, children, mountToParent);
  };

  // src/css-generator.ts
  var genCss = (styleSheet) => {
    const stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
    let generatedCss = "";
    for (const sheet of stylesheets) {
      for (const key in sheet) {
        generatedCss += genBlock(key, sheet[key]);
      }
    }
    return generatedCss;
  };
  var genBlock = (selector, style) => {
    return genBlockContent(selector, style).join("");
  };
  var genBlockContent = (selector, style) => {
    let inside = "";
    const blocks = [];
    for (const key in style) {
      if (isObject(style[key])) {
        let newSelector = selector;
        newSelector += key;
        blocks.push(...genBlockContent(newSelector, style[key]));
      } else if (style[key]) {
        inside += `${camelToDash(key)}:${style[key]};`;
      }
    }
    blocks.unshift(`${selector}{${inside}}`);
    return blocks;
  };

  // src/style-manager.ts
  var STYLE_TAG_ID = "cardboard-styles";
  var StyleManager = class {
    constructor() {
      this.rules = /* @__PURE__ */ new Set();
    }
    // Lazy load the style tag ONLY when needed
    get styleTag() {
      if (!this._styleTag) {
        try {
          this._styleTag = tag(`(#${STYLE_TAG_ID})`);
        } catch (error) {
          this._styleTag = tag("style").setId(STYLE_TAG_ID);
          if (document.head) {
            tag(document.head).append(this._styleTag);
          } else {
            console.warn("Cardboard-JS: document.head not found. Styles may not apply correctly.");
          }
        }
      }
      return this._styleTag;
    }
    add(styleSheet) {
      const css = genCss(styleSheet);
      if (!this.rules.has(css)) {
        this.rules.add(css);
        this.styleTag.append(css);
      }
    }
  };

  // src/observables.ts
  var Observable = class extends CEvent {
    constructor(val2, destroyer) {
      super();
      /**
       * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
       * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
       *
       * @example
       * ```ts
       * const value = createObservable(2);
       * const isGreater = value.computed((value) => value > 5);
       * // > isGreater == false;
       * value.dispatch(6);
       * // > isGreater == true;
       * ```
       */
      this.computed = (transform) => compute(this, transform);
      /** @see {@link greaterThan} */
      this.greaterThan = (val2 = 0) => greaterThan(this, val2);
      /** @see {@link greaterThanOr} */
      this.greaterThanOr = (val2 = 0) => greaterThanOr(this, val2);
      /** @see {@link lessThan} */
      this.lessThan = (val2 = 0) => lessThan(this, val2);
      /** @see {@link lessThanOr} */
      this.lessThanOr = (val2 = 0) => lessThanOr(this, val2);
      /** @see {@link equalTo} */
      this.equalTo = (val2) => equalTo(this, val2);
      /** @see {@link notEqualTo} */
      this.notEqualTo = (val2) => notEqualTo(this, val2);
      /** @see {@link isEmpty} */
      this.isEmpty = () => isEmpty(this);
      /** @see {@link notEmpty} */
      this.notEmpty = () => notEmpty(this);
      /** @see {@link grab} */
      this.grab = (key, defaultVal) => grab(this, key, defaultVal);
      if (val2 && (isObject(val2) || isArray(val2))) {
        val2 = new Proxy(val2, {
          get(target, p, receiver) {
            return target[p];
          },
          set: (target, p, newValue, receiver) => {
            if (target[p] === newValue)
              return true;
            target[p] = newValue;
            super.dispatch(target);
            return true;
          },
          deleteProperty: (target, p) => {
            delete target[p];
            super.dispatch(target);
            return true;
          }
        });
      }
      this._value = val2;
      this._destroyer = destroyer;
    }
    get value() {
      return this._value;
    }
    /** Set the value, and dispatch to all listeners. */
    set value(val2) {
      this.dispatch(val2);
    }
    valueOf() {
      return this._value;
    }
    toString() {
      return this._value.toString();
    }
    /**
     * Add a listener for when this Observable changes.
     */
    changed(callback) {
      this.listen(callback);
      return this;
    }
    /**
     * Remove a listener for when this Observable changes.
     */
    remove(callback) {
      super.remove(callback);
      return this;
    }
    /**
     * Set's the new value, and calls all the listeners.
     * You can additionaly set the {@link value} directly.
     */
    dispatch(val2) {
      if (val2 === this._value) {
        return this;
      }
      this._value = val2;
      super.dispatch(val2);
      return this;
    }
    destroy() {
      if (this._destroyer)
        this._destroyer();
      this._value = null;
      super.destroy();
    }
  };
  var isObservable = (obj) => {
    return obj instanceof Observable;
  };
  var createObservable = (val2, destroyer) => {
    return new Observable(val2, destroyer);
  };
  var compute = (other, transform) => {
    let observable;
    const cb = (val2) => observable?.dispatch(transform(val2));
    observable = createObservable(transform(other.value), () => {
      other.remove(cb);
      observable = null;
      other = null;
    });
    other.changed(cb);
    return observable;
  };
  var computeMultiple = (observables, transform) => {
    const cons = createObservable(
      transform(...observables.map((c) => c.value))
    );
    for (const other of observables) {
      other.changed(
        () => cons.dispatch(transform(...observables.map((c) => c.value)))
      );
    }
    return cons;
  };
  var observe = (blueprint, initialValue, context2 = {}) => {
    const stream = createObservable(initialValue);
    const setup = blueprint(context2);
    const teardown = setup((val2) => stream.dispatch(val2));
    const originalDestroy = stream.destroy;
    stream.destroy = () => {
      teardown();
      if (originalDestroy)
        originalDestroy.call(stream);
    };
    return stream;
  };
  var getValue = (val2) => {
    return isObservable(val2) ? val2.value : val2;
  };
  var greaterThan = (observable, val2 = 0) => {
    return compute(observable, (newVal) => newVal > getValue(val2));
  };
  var greaterThanOr = (observable, val2 = 0) => {
    return compute(observable, (newVal) => newVal >= getValue(val2));
  };
  var lessThan = (observable, val2 = 0) => {
    return compute(observable, (newVal) => newVal < getValue(val2));
  };
  var lessThanOr = (observable, val2 = 0) => {
    return compute(observable, (newVal) => newVal <= getValue(val2));
  };
  var equalTo = (observable, val2) => {
    return compute(observable, (newVal) => newVal === getValue(val2));
  };
  var notEqualTo = (observable, val2) => {
    return compute(observable, (newVal) => newVal !== getValue(val2));
  };
  var isEmpty = (observable) => {
    return compute(observable, (newVal) => newVal.length <= 0);
  };
  var notEmpty = (observable) => {
    return compute(observable, (newVal) => newVal.length > 0);
  };
  var grab = (observable, key, defaultVal) => {
    return compute(
      observable,
      (newVal) => newVal ? newVal[key] ? newVal[key] : defaultVal : defaultVal
    );
  };

  // src/state.ts
  var state = (initialValue) => {
    return createObservable(initialValue);
  };
  var listState = (initialData) => {
    const _list = state(
      initialData.map((d) => createObservable(d))
    );
    const add = (item) => {
      stateAdd(_list, createObservable(item));
    };
    const addAt = (item, index) => {
      stateAddAt(_list, createObservable(item), index);
    };
    const remove = (item) => {
      const itemIndex = _list.value.findIndex((listItem) => {
        return getValue(listItem) === getValue(item);
      });
      stateRemoveWhere(_list, (_, index) => {
        return itemIndex === index;
      });
    };
    const removeWhere = (cb) => {
      stateRemoveWhere(_list, (listItem, index) => cb(getValue(listItem), index));
    };
    return {
      /**
       * The reactive list of items.
       * Each item is wrapped in a {@link State} to allow for individual reactivity.
       */
      get list() {
        return _list;
      },
      /**
       * The raw list of items.
       */
      get listValue() {
        return _list.value;
      },
      add,
      addAt,
      remove,
      removeWhere,
      length: _list.computed((_list2) => _list2.length)
    };
  };
  var stateAdd = (state2, item) => {
    state2.value = [...state2.value, item];
  };
  var stateAddAt = (state2, item, index) => {
    let newData = [...state2.value];
    newData.splice(index, 0, item);
    state2.value = newData;
  };
  var stateRemoveWhere = (state2, cb) => {
    state2.value = state2.value.filter((el, i) => !cb(el, i));
  };
  var stateRemove = (state2, item) => {
    const index = state2.value.findIndex((state3) => getValue(state3) === getValue(item));
    stateRemoveWhere(state2, (_, i) => {
      return index === i;
    });
  };

  // src/text.ts
  var text = (textTemplate, obj) => {
    const node = document.createTextNode(""), interpolatePattern = /\B\$([0-9]+|[a-z][a-z0-9_$]*)/gi;
    if (!obj) {
      node.nodeValue = textTemplate;
      return node;
    }
    const updateNode = (data) => {
      node.nodeValue = !data ? textTemplate : textTemplate.replace(
        interpolatePattern,
        (m, g1) => (data?.[g1] ?? m).toString()
      );
    };
    if (isObservable(obj)) {
      const observableObj = obj;
      observableObj.changed((val2) => updateNode(val2));
      updateNode(observableObj.value);
    } else if (isObject(obj)) {
      const textObj = obj;
      for (const key of Object.getOwnPropertyNames(textObj)) {
        if (textTemplate.includes(`$${key}`) && isObservable(textObj[key])) {
          textObj[key].changed(() => updateNode(textObj));
        }
      }
      updateNode(textObj);
    }
    return node;
  };

  // src/each.ts
  var DiffState = /* @__PURE__ */ ((DiffState2) => {
    DiffState2["unchanged"] = "unchanged";
    DiffState2["added"] = "added";
    DiffState2["removed"] = "removed";
    DiffState2["swap"] = "swap";
    return DiffState2;
  })(DiffState || {});
  function each(observable, builder, key) {
    const node = document.createTextNode(""), elements = [];
    let oldData = [], nodeParentIndex = 0, elementsCopy = [];
    const actionAdd = (entry) => {
      if (entry.index >= 0) {
        const el = builder(entry.entry, entry.index);
        const elAt = elements[entry.index];
        elements.splice(entry.index, 0, el);
        node.parentElement?.insertBefore(el.el, elAt ? elAt.el : node);
      }
    };
    const actionRemove = (entry) => {
      node.parentElement?.removeChild(elementsCopy[entry.index].el);
      elementsCopy[entry.index].destroy();
      const i = elements.indexOf(elementsCopy[entry.index]);
      elements.splice(i, 1);
    };
    const actionSwap = (entry) => {
      const fromIndex = entry.index, toIndex = entry.targetIndex ?? 0;
      if (fromIndex >= 0 && toIndex >= 0) {
        const elementFrom = elementsCopy[fromIndex];
        const elementTo = elementsCopy[toIndex];
        const parentNode = elementFrom.el.parentNode;
        const nextSiblingNode = elementFrom.el.nextSibling;
        if (parentNode && nextSiblingNode === elementTo.el) {
          parentNode.insertBefore(elementTo.el, elementFrom.el);
        } else if (elementTo.el.parentNode) {
          elementTo.el.parentNode.insertBefore(elementFrom.el, elementTo.el);
          if (nextSiblingNode && parentNode) {
            parentNode.insertBefore(elementTo.el, nextSiblingNode);
          } else if (parentNode) {
            parentNode.appendChild(elementTo.el);
          }
        }
        const tempCopy = elementsCopy[fromIndex];
        elementsCopy[fromIndex] = elementsCopy[toIndex];
        elementsCopy[toIndex] = tempCopy;
        const temp = elements[fromIndex];
        elements[fromIndex] = elements[toIndex];
        elements[toIndex] = temp;
      }
    };
    const actionMap = {
      ["added" /* added */]: actionAdd,
      ["removed" /* removed */]: actionRemove,
      ["swap" /* swap */]: actionSwap
    };
    const MAX_UPDATE_TRIES = 100;
    const updateList = (newData, tries = 0) => {
      console.debug(`[each]: Updating list with ${newData.length} items`);
      if (!node.parentElement) {
        if (tries < MAX_UPDATE_TRIES) {
          setTimeout(() => updateList(newData, tries + 1), 1);
        } else {
          console.warn(`[each]: parentElement not found after max retries`);
        }
        console.debug(`[each]: max tries reached, not updating list`);
        return;
      }
      if (!nodeParentIndex) {
        const children = Array.from(node.parentElement?.childNodes ?? []);
        nodeParentIndex = children.indexOf(node);
      }
      const diff = diffList(newData, oldData, key);
      console.debug(`[each]: diff`, diff);
      if (diff.length <= 0) {
        return;
      }
      for (let index = 0; index < diff.length; index++) {
        const data = diff[index];
        const nextIndex = diff[index + 1] ? diff[index + 1].index : null;
        const nextState = diff[index + 1] ? diff[index + 1].state : null;
        actionMap[data.state](data);
        if (nextState === "swap" /* swap */ && nextIndex === data.targetIndex) {
          index++;
        }
      }
      oldData = [...newData].slice(0);
      elementsCopy = elements.slice(0);
    };
    updateList("value" in observable ? observable.value : observable);
    if (isObservable(observable)) {
      observable.changed(updateList);
    }
    return node;
  }
  function diffList(newData, oldData, key = (item) => item) {
    const diff = [], newLength = newData.length, oldLength = oldData.length;
    if (newLength === oldLength && newData == oldData) {
      console.debug(`[diffList]: No changes detected, returning empty diff`);
      return diff;
    }
    if (newLength <= 0) {
      for (let i = 0; i < oldLength; i++) {
        diff[i] = {
          entry: oldData[i],
          state: "removed" /* removed */,
          index: i
        };
      }
      console.debug(`[diffList]: All items removed, returning diff with removed items`);
      return diff;
    }
    if (!oldLength) {
      for (let i = 0; i < newLength; i++) {
        diff[i] = {
          entry: newData[i],
          state: "added" /* added */,
          index: i
        };
      }
      console.debug(`[diffList]: No old data, adding all new items`);
      return diff;
    }
    let removedCount = 0;
    console.debug(`[diffList]: Comparing old data with new data`, { oldData, newData });
    for (let oi = 0; oi < oldLength; oi++) {
      const newEntry = newData[oi - removedCount], oldEntry = oldData[oi], areEqual = key(oldEntry, oi) == key(newEntry, oi - removedCount);
      if (areEqual) {
        console.debug(`[diffList]: Entry at index ${oi} is unchanged`, { oldEntry, newEntry });
        continue;
      }
      const existsNew = !!newData.find((item) => key(oldEntry, oi) == key(item, oi)), existsOld = !!oldData.find((item) => key(newEntry, oi - removedCount) == key(item, oi - removedCount));
      if (!existsOld && existsNew) {
        console.debug(`[diffList]: New entry at index ${oi - removedCount} added`, { newEntry });
        diff.push({
          entry: newEntry,
          state: "added" /* added */,
          index: oi - removedCount
        });
        removedCount--;
        continue;
      }
      if (existsOld && !existsNew || newEntry == null) {
        console.debug(`[diffList]: Old entry at index ${oi} removed`, { oldEntry });
        diff.push({
          entry: oldEntry,
          state: "removed" /* removed */,
          index: oi
        });
        removedCount++;
        continue;
      }
      if (newData.indexOf(oldEntry) >= 0) {
        console.debug(`[diffList]: Entry at index ${oi} swapped`, { newEntry, oldEntry });
        diff.push({
          entry: newEntry,
          targetEntry: oldEntry,
          state: "swap" /* swap */,
          index: oldData.indexOf(newData[oi - removedCount]),
          targetIndex: oldData.indexOf(oldData[oi])
        });
        const oldIndex = oldData.indexOf(newEntry);
        const temp = oldData[oi];
        oldData[oi] = newData[oi - removedCount];
        oldData[oldIndex] = temp;
      }
    }
    if (removedCount != oldLength) {
      for (let i = oldLength - removedCount; i < newLength; i++) {
        const newEntry = newData[i];
        diff.push({
          entry: newEntry,
          state: "added" /* added */,
          index: i
        });
      }
    }
    return diff;
  }

  // src/all-tags.ts
  var interceptors = {
    ul: (children, mountToParent = false) => {
      return tag(
        "ul",
        children.map((cl) => {
          return tag("li", [cl], mountToParent);
        })
      );
    },
    style: (styles, mountToParent = false) => {
      return tag("style", [genCss(styles)], mountToParent);
    }
  };
  var allTags = new Proxy(
    {},
    {
      get: (t, p, r) => {
        const tagName = p.toString();
        const fn = (...children) => {
          return interceptors[tagName] ? interceptors[tagName](children, false) : tag(tagName, children);
        };
        Object.defineProperty(fn, "mount", {
          get: () => {
            return (...children) => {
              return interceptors[tagName] ? interceptors[tagName](children, true) : tag(tagName, children, true);
            };
          }
        });
        return fn;
      }
    }
  );

  // src/core.ts
  var init = (options = { selector: "body" }) => {
    context.init = true;
    context.obs = createGlobalObserver();
    context.styleManager = new StyleManager();
    const tag2 = new CTag(`(${options.selector})`);
    return mountPoint(tag2);
  };
  var version = "0.1.0";

  // src/ext/reactivity/reactivity.ts
  CTag.childTransformers.push((child) => {
    if (isObservable(child)) {
      return text("$val", { val: child });
    }
    return void 0;
  });
  var event = (evtName, mapFn) => {
    return (ctx) => (dispatch) => {
      if (!ctx.tag)
        throw new Error(`event('${evtName}') requires a CTag context.`);
      const handler = (e) => dispatch(mapFn(e));
      ctx.tag.el.addEventListener(evtName, handler);
      return () => ctx.tag.el.removeEventListener(evtName, handler);
    };
  };
  var timer = (ms, mapFn = (t) => t) => {
    return (ctx) => (dispatch) => {
      let ticks = 0;
      const id = setInterval(() => dispatch(mapFn(++ticks)), ms);
      return () => clearInterval(id);
    };
  };
  var intersection = (options) => {
    return (ctx) => (dispatch) => {
      if (!ctx.tag)
        throw new Error(`intersection() requires a CTag context.`);
      const observer2 = new IntersectionObserver(([entry]) => {
        dispatch(entry.isIntersecting);
      }, options);
      observer2.observe(ctx.tag.el);
      return () => observer2.disconnect();
    };
  };
  var consume = (observable, onChange) => {
    return (tag2) => {
      if (observable?.changed) {
        const listener = (newValue) => onChange(tag2, newValue);
        observable.changed(listener);
        listener(observable.value);
        tag2.onTeardown(() => {
          observable.remove(listener);
        });
        return;
      }
      console.warn("An invalid Observable was supplied to `tag.consume`");
    };
  };
  var classIf = (observable, classes, invert = false) => {
    return (tag2) => {
      tag2.use(
        consume(observable, (self, value) => {
          const shouldApply = invert ? !value : !!value;
          const classList = val(classes, self);
          if (shouldApply)
            self.addClass(...classList);
          else
            self.rmClass(...classList);
        })
      );
    };
  };
  var classIfNot = (observable, classes) => {
    return (tag2) => {
      tag2.use(classIf(observable, classes, true));
    };
  };
  var doIf = (observable, ifTrue, ifFalse, invert = false) => {
    return (tag2) => {
      let whenTrue = ifTrue;
      let whenFalse = ifFalse;
      if (invert) {
        const temp = whenTrue;
        whenTrue = whenFalse;
        whenFalse = temp;
      }
      const callback = (_, value) => {
        if (!!value)
          whenTrue(value);
        else
          whenFalse(value);
      };
      tag2.use(consume(observable, callback));
    };
  };
  var doIfNot = (observable, ifTrue, ifFalse) => {
    return (tag2) => {
      tag2.use(doIf(observable, ifTrue, ifFalse, true));
    };
  };
  var hideIf = (observable, invert = false) => {
    return (tag2) => {
      const handleHide = (_, value) => {
        const hide = !!value;
        const shouldHide = invert ? !hide : hide;
        if (shouldHide) {
          void tag2.hide();
        } else {
          void tag2.show();
        }
      };
      tag2.use(consume(observable, handleHide));
    };
  };
  var hideIfNot = (observable) => {
    return (tag2) => {
      tag2.use(hideIf(observable, true));
    };
  };
  var textIf = (observable, textValue, elseText = "", invert = false) => {
    return (tag2) => {
      tag2.use(
        doIf(
          observable,
          () => tag2.text(val(textValue, tag2)),
          () => tag2.text(val(elseText, tag2)),
          invert
        )
      );
    };
  };
  var textIfNot = (observable, textValue, elseText = "") => {
    return (tag2) => {
      tag2.use(textIf(observable, textValue, elseText, true));
    };
  };
  var attrIf = (observable, attr, value = "", invert = false) => {
    return (tag2) => {
      tag2.use(
        doIf(
          observable,
          () => tag2.addAttr(attr, val(value, tag2)),
          () => tag2.rmAttr(attr),
          invert
        )
      );
    };
  };
  var attrIfNot = (observable, attr, value = "") => {
    return (tag2) => {
      tag2.use(attrIf(observable, attr, value, true));
    };
  };
  var disableIf = (observable, invert = false) => {
    return (tag2) => {
      tag2.use(attrIf(observable, "disabled", "", invert));
    };
  };
  var disableIfNot = (observable) => {
    return (tag2) => {
      tag2.use(disableIf(observable, true));
    };
  };
  var styleIf = (observable, style, value = "", invert = false) => {
    return (tag2) => {
      tag2.use(
        doIf(
          observable,
          () => tag2.addStyle(style, val(value, tag2)),
          () => tag2.rmStyle(style),
          invert
        )
      );
    };
  };
  var styleIfNot = (observable, style, value = "") => {
    return (tag2) => {
      tag2.use(styleIf(observable, style, value, true));
    };
  };
  var stylesIf = (observable, styles, invert = false) => {
    return (tag2) => {
      tag2.use(
        doIf(
          observable,
          () => tag2.setStyle(val(styles, tag2)),
          () => tag2.rmStyle(...Object.keys(styles)),
          invert
        )
      );
    };
  };
  var stylesIfNot = (observable, styles) => {
    return (tag2) => {
      tag2.use(stylesIf(observable, styles, true));
    };
  };
  var template = (textTemplate, obj) => {
    return (tag2) => {
      tag2.setChildren([text(textTemplate, obj)]);
    };
  };

  // src/ext/reactivity/chaining.ts
  CTag.prototype.observe = function(blueprint, initialValue) {
    const stream = observe(blueprint, initialValue, { tag: this });
    this.onTeardown(() => stream.destroy());
    return stream;
  };
  CTag.prototype.consume = function(observable, onChange) {
    return this.use(consume(observable, onChange));
  };
  CTag.prototype.classIf = function(observable, classes, invert = false) {
    return this.use(classIf(observable, classes, invert));
  };
  CTag.prototype.classIfNot = function(observable, classes) {
    return this.use(classIfNot(observable, classes));
  };
  CTag.prototype.doIf = function(observable, ifTrue, ifFalse, invert = false) {
    return this.use(doIf(observable, ifTrue, ifFalse, invert));
  };
  CTag.prototype.doIfNot = function(observable, ifTrue, ifFalse) {
    return this.use(doIfNot(observable, ifTrue, ifFalse));
  };
  CTag.prototype.hideIf = function(observable, invert = false) {
    return this.use(hideIf(observable, invert));
  };
  CTag.prototype.hideIfNot = function(observable) {
    return this.use(hideIfNot(observable));
  };
  CTag.prototype.textIf = function(observable, text2, elseText = "", invert = false) {
    return this.use(textIf(observable, text2, elseText, invert));
  };
  CTag.prototype.textIfNot = function(observable, text2, elseText = "") {
    return this.use(textIfNot(observable, text2, elseText));
  };
  CTag.prototype.attrIf = function(observable, attr, value = "", invert = false) {
    return this.use(attrIf(observable, attr, value, invert));
  };
  CTag.prototype.attrIfNot = function(observable, attr, value = "") {
    return this.use(attrIfNot(observable, attr, value));
  };
  CTag.prototype.disableIf = function(observable, invert = false) {
    return this.use(disableIf(observable, invert));
  };
  CTag.prototype.disableIfNot = function(observable) {
    return this.use(disableIfNot(observable));
  };
  CTag.prototype.styleIf = function(observable, style, value = "", invert = false) {
    return this.use(styleIf(observable, style, value, invert));
  };
  CTag.prototype.styleIfNot = function(observable, style, value = "") {
    return this.use(styleIfNot(observable, style, value));
  };
  CTag.prototype.stylesIf = function(observable, styles, invert = false) {
    return this.use(stylesIf(observable, styles, invert));
  };
  CTag.prototype.stylesIfNot = function(observable, styles) {
    return this.use(stylesIfNot(observable, styles));
  };
  var originalText = CTag.prototype.text;
  CTag.prototype.text = function(textTemplate, obj) {
    if (obj && textTemplate) {
      return this.setChildren([text(textTemplate, obj)]);
    }
    return originalText.call(this, textTemplate);
  };

  // src/ext/css/styling.ts
  function addClass(...classes) {
    this.classList.add(...classes);
    return this;
  }
  function setClassName(className) {
    this.el.className = className;
    return this;
  }
  function rmClass(...classes) {
    this.classList.remove(...classes);
    return this;
  }
  function hasClass(...classes) {
    return classes.every((cls) => this.classList.contains(cls));
  }
  function replaceClass(targetClass, replaceClass2) {
    if (this.classList.contains(targetClass)) {
      this.classList.replace(targetClass, replaceClass2);
    }
    return this;
  }
  function toggleClass(targetClass) {
    this.classList.toggle(targetClass);
    return this;
  }
  function addStyle(styleName, value) {
    this.el.style.setProperty(camelToDash(styleName), value);
    return this;
  }
  function rmStyle(...styleNames) {
    for (const key of styleNames) {
      this.el.style.removeProperty(camelToDash(key));
    }
    return this;
  }
  function hasStyle(styleName) {
    return this.el.style.getPropertyValue(camelToDash(styleName)) !== "";
  }
  function setStyle(styles) {
    for (const key in styles) {
      const value = styles[key] ?? "";
      this.el.style.setProperty(camelToDash(key), String(value));
    }
    return this;
  }
  function styled(stylesheet, className) {
    className ??= uuidv4();
    if (stylesheet) {
      context.styleManager?.add({ [`.${className}`]: stylesheet });
    }
    return addClass.call(this, className);
  }

  // src/ext/css/chaining.ts
  CTag.prototype.setStyle = setStyle;
  CTag.prototype.styled = styled;
  CTag.prototype.addStyle = addStyle;
  CTag.prototype.rmStyle = rmStyle;
  CTag.prototype.hasStyle = hasStyle;
  CTag.prototype.addClass = addClass;
  CTag.prototype.setClassName = setClassName;
  CTag.prototype.rmClass = rmClass;
  CTag.prototype.toggleClass = toggleClass;
  CTag.prototype.hasClass = hasClass;
  CTag.prototype.replaceClass = replaceClass;
  return __toCommonJS(cardboard_exports);
})();

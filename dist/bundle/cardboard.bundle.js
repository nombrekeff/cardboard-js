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
    Cardboard: () => Cardboard,
    DiffState: () => DiffState,
    Observable: () => Observable,
    allTags: () => allTags,
    arraysEqual: () => arraysEqual,
    camelToDash: () => camelToDash,
    checkInitialized: () => checkInitialized,
    clearMountPoints: () => clearMountPoints,
    compute: () => compute,
    computeMultiple: () => computeMultiple,
    context: () => context,
    createGlobalObserver: () => createGlobalObserver,
    createObservable: () => createObservable,
    deepEquals: () => deepEquals,
    diffList: () => diffList,
    each: () => each,
    equalTo: () => equalTo,
    genBlock: () => genBlock,
    genBlockContent: () => genBlockContent,
    genCss: () => genCss,
    generateUID: () => generateUID,
    getMountPoint: () => getMountPoint,
    getValue: () => getValue,
    grab: () => grab,
    greaterThan: () => greaterThan,
    greaterThanOr: () => greaterThanOr,
    init: () => init,
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
    onLifecycle: () => onLifecycle,
    removeFromList: () => removeFromList,
    resetMountPoints: () => resetMountPoints,
    restoreMountPoint: () => restoreMountPoint,
    singleEvent: () => singleEvent,
    state: () => state,
    stateAdd: () => stateAdd,
    stateAddAt: () => stateAddAt,
    stateRemove: () => stateRemove,
    stateRemoveWhere: () => stateRemoveWhere,
    swapItems: () => swapItems,
    tag: () => tag,
    text: () => text,
    uuidv4: () => uuidv4,
    val: () => val,
    withLifecycle: () => withLifecycle,
    withMountPoint: () => withMountPoint
  });

  // src/context.ts
  var context_exports = {};
  __export(context_exports, {
    checkInitialized: () => checkInitialized,
    clearMountPoints: () => clearMountPoints,
    context: () => context,
    createGlobalObserver: () => createGlobalObserver,
    getMountPoint: () => getMountPoint,
    isInitialized: () => isInitialized,
    mountPoint: () => mountPoint,
    resetMountPoints: () => resetMountPoints,
    restoreMountPoint: () => restoreMountPoint,
    withMountPoint: () => withMountPoint
  });

  // src/events.ts
  var events_exports = {};
  __export(events_exports, {
    CEvent: () => CEvent,
    CMappedEvent: () => CMappedEvent,
    mappedEvent: () => mappedEvent,
    singleEvent: () => singleEvent
  });

  // src/util.ts
  var util_exports = {};
  __export(util_exports, {
    arraysEqual: () => arraysEqual,
    camelToDash: () => camelToDash,
    deepEquals: () => deepEquals,
    generateUID: () => generateUID,
    isArray: () => isArray,
    isObject: () => isObject,
    removeFromList: () => removeFromList,
    swapItems: () => swapItems,
    uuidv4: () => uuidv4,
    val: () => val
  });
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
      this._listeners = [];
    }
    listen(fn) {
      this._listeners.push(fn);
    }
    remove(fn) {
      removeFromList(fn, this._listeners);
    }
    dispatch(data) {
      this._listeners.forEach((el) => el(data));
    }
    destroy() {
      this._listeners = [];
    }
  };
  var CMappedEvent = class {
    constructor() {
      this._listeners = {};
    }
    listen(evt, fn) {
      if (!(evt in this._listeners)) {
        this._listeners[evt] = [fn];
      } else if (this._listeners[evt]) {
        this._listeners[evt].push(fn);
      }
    }
    remove(evt, fn) {
      removeFromList(fn, this._listeners[evt]);
    }
    dispatch(evt, data) {
      if (evt in this._listeners) {
        this._listeners[evt].forEach((el) => el(data));
      }
    }
    destroy() {
      this._listeners = {};
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
    mountPoint: void 0,
    mountPointHistory: [],
    styleManager: void 0,
    intersectionObserver: void 0,
    observer: void 0,
    initialized: false
  };
  var isInitialized = () => context.initialized === true;
  var checkInitialized = () => {
    if (!isInitialized()) {
      throw new Error("Cardboard is not initialized. Please call `init()`, as some features will not work.");
    }
  };
  var getMountPoint = () => context.mountPoint;
  var mountPoint = (tag2) => {
    if (context.mountPoint) {
      context.mountPointHistory.push(context.mountPoint);
    }
    context.mountPoint = tag2;
    return tag2;
  };
  var restoreMountPoint = () => {
    context.mountPoint = context.mountPointHistory.pop();
  };
  var clearMountPoints = () => {
    context.mountPoint = void 0;
    context.mountPointHistory = [];
  };
  var resetMountPoints = () => {
    let first = context.mountPointHistory.shift();
    context.mountPoint = first;
    context.mountPointHistory = [];
  };
  var withMountPoint = (tag2, scopedCallback) => {
    mountPoint(tag2);
    scopedCallback(tag2);
    restoreMountPoint();
  };
  var createGlobalObserver = () => {
    const _addedEvt = singleEvent();
    const _removedEvt = singleEvent();
    const observer = new window.MutationObserver((mutations, observer2) => {
      for (const mut of mutations) {
        for (const n of Array.from(mut.addedNodes)) {
          _addedEvt.dispatch(n);
        }
        for (const n of Array.from(mut.removedNodes)) {
          _removedEvt.dispatch(n);
        }
      }
    });
    observer.observe(window.document.body, {
      childList: true,
      subtree: true
    });
    return {
      onAdded: _addedEvt,
      onRemoved: _removedEvt
    };
  };

  // src/tag.ts
  var tag_exports = {};
  __export(tag_exports, {
    CTag: () => CTag,
    tag: () => tag
  });

  // src/text.ts
  var text_exports = {};
  __export(text_exports, {
    text: () => text
  });

  // src/observables.ts
  var observables_exports = {};
  __export(observables_exports, {
    Observable: () => Observable,
    compute: () => compute,
    computeMultiple: () => computeMultiple,
    createObservable: () => createObservable,
    equalTo: () => equalTo,
    getValue: () => getValue,
    grab: () => grab,
    greaterThan: () => greaterThan,
    greaterThanOr: () => greaterThanOr,
    isEmpty: () => isEmpty,
    isObservable: () => isObservable,
    lessThan: () => lessThan,
    lessThanOr: () => lessThanOr,
    notEmpty: () => notEmpty,
    notEqualTo: () => notEqualTo
  });
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
    const cons = createObservable(transform(...observables.map((c) => c.value)));
    for (const other of observables) {
      other.changed(() => cons.dispatch(
        transform(...observables.map((c) => c.value))
      ));
    }
    return cons;
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
    return compute(observable, (newVal) => newVal ? newVal[key] ? newVal[key] : defaultVal : defaultVal);
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
        (m, g1) => (data[g1] ?? m).toString()
      );
    };
    if (isObservable(obj)) {
      obj.changed((val2) => updateNode(val2));
      updateNode(obj.value);
    } else if (isObject(obj)) {
      for (const key of Object.getOwnPropertyNames(obj)) {
        if (textTemplate.includes(`$${key}`) && isObservable(obj[key])) {
          obj[key].changed(() => updateNode(obj));
        }
      }
      updateNode(obj);
    }
    return node;
  };

  // src/tag.ts
  var CTag = class _CTag {
    constructor(arg0, children = [], mountToParent = false) {
      this._visible = false;
      /**
       * Any function inside this array, will be called whenever the CTag is {@link destroy}ed
       * Used to remove HTML Event Listeners and Observable listeners
       */
      this._destroyers = [];
      /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
      this._children = [];
      this._cachedChildren = [];
      this._meta = {
        isHidden: false,
        nextSiblingID: null
      };
      const isSelector = typeof arg0 === "string" && arg0.match(/\(.+\)/);
      if (isSelector) {
        const match = arg0.match(/\(([\.\#]?[a-zA-Z][a-zA-Z0-9_$]+)\)/);
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
        if (context.mountPoint && mountToParent) {
          context.mountPoint.append(this);
        }
      } else if (arg0 instanceof HTMLElement) {
        this.el = arg0;
      } else {
        throw new Error("Invalid argument: " + arg0);
      }
      if (children.length > 0)
        this.setChildren(children);
      this.el.tag = this;
    }
    get visible() {
      return this._visible;
    }
    set visible(newValue) {
      this._visible = newValue;
      this.el.dispatchEvent(new CustomEvent("visible", {
        detail: {
          visible: newValue,
          tag: this
        },
        bubbles: true,
        composed: true
      }));
    }
    get parent() {
      return this._parent;
    }
    set parent(newParent) {
      this._parent = newParent;
    }
    get children() {
      return this._getChildren(this.el);
    }
    get value() {
      return this.el.value;
    }
    setValue(newValue) {
      this.el.value = newValue;
      return this;
    }
    get checked() {
      return this.el.checked;
    }
    setChecked(checked) {
      this.el.checked = checked;
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
    setId(id) {
      this.el.id = id;
      return this;
    }
    /** Sets the children, removes previous children  */
    setChildren(children) {
      this.el.replaceChildren(...this._mapChildren(children));
      this._children = children;
      return this;
    }
    append(...children) {
      this.el.append(...this._mapChildren(children));
      this._children.push(...children);
      return this;
    }
    prepend(...children) {
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
        const expectedIndex = this.parent._children.indexOf(this);
        if (expectedIndex === 0) {
          parentEl.prepend(this.el);
        } else if (expectedIndex === this.parent._children.length - 1) {
          parentEl.append(this.el);
        } else {
          let hiddenBefore = 0;
          for (let i = expectedIndex - 1; i >= 0; i--) {
            const child = this.parent._children[i];
            if (child instanceof _CTag && child._meta.isHidden) {
              hiddenBefore++;
            }
          }
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
        this.parent.el.insertBefore(document.createComment(this.el.id), this.el);
        await this.remove();
        this._meta.isHidden = true;
      }
    }
    /** Whenever the observable changes, it will call the consumer */
    consume(observable, consumer) {
      if (observable.changed) {
        const cb = (newValue) => consumer(this, newValue);
        observable.changed(cb);
        this._destroyers.push(() => {
          observable.remove(cb);
          observable = null;
        });
      } else {
        console.warn("An invalid Observable was supplied to `tag.consume`");
      }
      consumer(this, "value" in observable ? observable.value : observable);
      return this;
    }
    /**
     * When the observable changes, it will call {ifTrue} when the observable is true. Or {ifFalse} when the observable is false.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
     */
    doIf(observable, ifTrue, ifFalse, invert = false) {
      if (invert) {
        const temp = ifTrue;
        ifTrue = ifFalse;
        ifFalse = temp;
      }
      const callback = (_, value) => {
        if (!!value)
          ifTrue(value);
        else
          ifFalse(value);
      };
      return this.consume(observable, callback);
    }
    /**
     * The oposite of {this.doIf}
     * When the observable changes, it will call {ifTrue} if the observable is false. Or {ifFalse} if the observable is true.
     */
    doIfNot(observable, ifTrue, ifFalse) {
      return this.doIf(observable, ifTrue, ifFalse, true);
    }
    /**
     * Hide this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
     */
    hideIf(observable, invert = false) {
      const handleHide = (_, value) => {
        const correctedValue = invert ? !value : !!value;
        this._meta.isHidden = correctedValue;
        if (!this.parent)
          return;
        if (!correctedValue)
          void this.show();
        else
          void this.hide();
      };
      return this.consume(observable, handleHide);
    }
    /** Hide this element when the consumer is falsy. Updates whenever the observable changes. */
    hideIfNot(observable) {
      return this.hideIf(observable, true);
    }
    /**
     * Adds classes to the element when the consumer is truthy. Updates whenever the observable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
     */
    classIf(observable, classes, invert = false) {
      return this.doIf(
        observable,
        () => this.addClass(...val(classes, this)),
        () => this.rmClass(...val(classes, this)),
        invert
      );
    }
    /**
     * Adds classes to the element when the consumer is falsy. Updates whenever the observable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * For the oposite you can also use {@link classIf}
     */
    classIfNot(observable, classes) {
      return this.classIf(observable, classes, true);
    }
    /**
     * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
     */
    textIf(observable, text2, elseText = "", invert = false) {
      return this.doIf(
        observable,
        () => this.text(val(text2, this)),
        () => this.text(val(elseText, this)),
        invert
      );
    }
    /**
     * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     */
    textIfNot(observable, text2, elseText = "") {
      return this.textIf(observable, text2, elseText, true);
    }
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf(observable, attr, value = "", invert = false) {
      return this.doIf(
        observable,
        () => this.addAttr(attr, val(value, this)),
        () => this.rmAttr(attr),
        invert
      );
    }
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed
     */
    attrIfNot(observable, attr, value = "") {
      return this.attrIf(observable, attr, value, true);
    }
    /**
     * Disable this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf(observable, invert = false) {
      return this.attrIf(observable, "disabled", "", invert);
    }
    /** Disable this element when the consumer is falsy. Updates whenever the observable changes. */
    disableIfNot(observable) {
      return this.disableIf(observable, true);
    }
    /**
     * Add style to the element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
     * {value} can be a string or a function that returns a string.
     */
    styleIf(observable, style, value = "", invert = false) {
      return this.doIf(
        observable,
        () => this.addStyle(style, val(value, this)),
        () => this.rmStyle(style),
        invert
      );
    }
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     */
    styleIfNot(observable, style, value = "") {
      return this.styleIf(observable, style, value, true);
    }
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf(observable, styles, invert = false) {
      return this.doIf(
        observable,
        () => this.setStyle(val(styles, this)),
        () => this.rmStyle(...Object.keys(styles)),
        invert
      );
    }
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot(observable, styles) {
      return this.stylesIf(observable, styles, true);
    }
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen(tag2, evt, consumer) {
      return tag2.on(evt, (other, evt2) => {
        consumer(this, other, evt2);
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
    text(textTemplate, obj) {
      if (textTemplate == null) {
        return this.el.textContent;
      }
      if (obj && textTemplate) {
        return this.setChildren([text(textTemplate, obj)]);
      }
      this.el.textContent = textTemplate;
      return this;
    }
    /**
     * Configure the element in a single call by passing @param {TagConfig} c
     * instead of having to call a method for each property you want to changes
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
          this.on(key, c.on[key]);
        }
      }
      return this;
    }
    /** Add classes to the elements class list */
    addClass(...classes) {
      this.classList.add(...classes);
      return this;
    }
    /** Set the elements class name */
    setClassName(className) {
      this.el.className = className;
      return this;
    }
    /** Remove classes from class list */
    rmClass(...classes) {
      for (const key of classes) {
        this.classList.remove(key);
      }
      return this;
    }
    /** Check if classes are present in this element */
    hasClass(...classes) {
      for (const key of classes) {
        if (!this.classList.contains(key)) {
          return false;
        }
      }
      return true;
    }
    /** Replace a class with another */
    replaceClass(targetClass, replaceClass) {
      this.classList.replace(targetClass, replaceClass);
      return this;
    }
    /** Toggle a class. If it's present it's removed, if it's not present its added. */
    toggleClass(targetClass) {
      return this.hasClass(targetClass) ? this.rmClass(targetClass) : this.addClass(targetClass);
    }
    /** Add a single style */
    addStyle(property, value) {
      this.el.style[property] = value;
      return this;
    }
    /** Set multiple styles at once */
    setStyle(styles) {
      for (const key in styles) {
        this.addStyle(key, styles[key] ?? "");
      }
      return this;
    }
    /** Remove styles */
    rmStyle(...styleNames) {
      for (const key of styleNames) {
        this.style.removeProperty(camelToDash(key));
      }
      return this;
    }
    /** Check if this element has styles */
    hasStyle(...styles) {
      for (const key of styles) {
        if (!this.style.getPropertyValue(camelToDash(key))) {
          return false;
        }
      }
      return true;
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
      this.el.attributes[key] = value;
      this.el.setAttribute(key, value);
      return this;
    }
    /** Remove attributes from the element */
    rmAttr(...attrs) {
      for (const key of attrs) {
        this.el.removeAttribute(key);
        delete this.el.attributes[key];
      }
      return this;
    }
    /** Check if this element has attributes */
    hasAttr(...attr) {
      for (const key of attr) {
        if (!(key in this.el.attributes)) {
          return false;
        }
      }
      return true;
    }
    /** Get an attributes value */
    getAttr(attr) {
      return this.el.attributes[attr];
    }
    /**
     * Returns a {@link IObservable} that fires when the Event {@link evtName} is fired in this element
     *
     * The return value of {@link fn} will be passed to the listeners of the {@link IObservable}
     */
    when(evtName, fn) {
      const cons = createObservable({});
      this.on(evtName, (t, evt) => {
        cons.dispatch(fn(t, evt));
      });
      return cons;
    }
    /** Add an event listener for a particular event */
    on(evtName, fn) {
      if (fn) {
        const cb = (evt) => fn(this, evt);
        this.el.addEventListener(evtName, cb);
        this._destroyers.push(() => {
          this.el.removeEventListener(evtName, cb);
        });
      }
      return this;
    }
    /** Add an event listener for a particular event that will only fire once */
    once(evtName, fn) {
      const listener = (evt) => {
        fn(this, evt);
        this.el.removeEventListener(evtName, listener);
      };
      this.el.addEventListener(evtName, listener);
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
     * Remove element from the DOM, but keep data as is. Can then be added again.
     * To fully remove the element use {@link destroy}
     */
    async remove() {
      const result = this.el.remove();
      if (result instanceof Promise) {
        await result;
      }
      await this.el.remove();
      return this;
    }
    /**
     * Destroy the element, should not be used afterwards
     */
    destroy() {
      context.intersectionObserver?.unobserve(this.el);
      this._children.forEach((cl) => {
        if (cl instanceof _CTag) {
          cl.destroy();
        }
      });
      this._destroyers.forEach((listener) => listener());
      this._children = [];
      this._cachedChildren = [];
      void this.remove();
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
    /** Set whether the element should be disabled or not */
    setDisabled(disabled) {
      return disabled ? this.addAttr("disabled") : this.rmAttr("disabled");
    }
    /** Query a child in this element (in the DOM) */
    q(selector) {
      const element = this.el.querySelector(selector);
      if (element)
        return new _CTag(element);
    }
    /** Find a child in this element (in the DOM or NOT) */
    find(predicate) {
      for (const child of this._children) {
        if (predicate(child)) {
          return child;
        }
      }
    }
    findTag(predicate) {
      for (const child of this._children) {
        if (child instanceof _CTag && predicate(child)) {
          return child;
        }
      }
    }
    _childrenFilterPredicate(item) {
      if (item instanceof _CTag && item._meta.isHidden) {
        return false;
      }
      return true;
    }
    _getElementForChild(cl) {
      if (typeof cl === "string")
        return document.createTextNode(cl);
      if (isObservable(cl)) {
        return text("$val", { val: cl });
      }
      if (cl instanceof _CTag)
        return cl.el;
      if (cl instanceof Node)
        return cl;
      return null;
    }
    _getChildren(element) {
      if (!this._observer) {
        this._observer = new window.MutationObserver(() => {
          this._cacheChildren(element);
        });
        this._observer.observe(this.el, { childList: true });
        this._cacheChildren(element);
      }
      return this._cachedChildren;
    }
    _cacheChildren(element) {
      const nodes = element.childNodes, children = [];
      let i = nodes.length;
      while (i--) {
        if (nodes[i].nodeType === 1) {
          children.unshift(nodes[i]);
        }
      }
      this._cachedChildren = children;
    }
    _mapChildren(children) {
      const mapped = [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child instanceof _CTag) {
          child.parent = this;
        }
        if (this._childrenFilterPredicate(child)) {
          const element = this._getElementForChild(child);
          if (element != null)
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

  // src/state.ts
  var state_exports = {};
  __export(state_exports, {
    listState: () => listState,
    state: () => state,
    stateAdd: () => stateAdd,
    stateAddAt: () => stateAddAt,
    stateRemove: () => stateRemove,
    stateRemoveWhere: () => stateRemoveWhere
  });
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
      remove: stateRemove.bind({}, _list),
      removeWhere: stateRemoveWhere.bind({}, _list),
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
    newData = [];
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

  // src/css-generator.ts
  var css_generator_exports = {};
  __export(css_generator_exports, {
    genBlock: () => genBlock,
    genBlockContent: () => genBlockContent,
    genCss: () => genCss
  });
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

  // src/lifecycle.ts
  var lifecycle_exports = {};
  __export(lifecycle_exports, {
    onLifecycle: () => onLifecycle,
    withLifecycle: () => withLifecycle
  });
  function onLifecycle(tag2, onMounted, onUnmounted, beforeUnmounted) {
    if (beforeUnmounted) {
      const tempElRemove = tag2.el.remove;
      tag2.el.remove = async () => {
        const result = beforeUnmounted(tag2);
        if (!result || result instanceof Promise && await result) {
          tempElRemove.call(tag2.el);
        }
        return result.valueOf();
      };
    }
    if (onMounted) {
      const tempOnStart = tag2.show;
      tag2.show = async () => {
        const result = tempOnStart.call(tag2);
        if (result instanceof Promise) {
          return await result;
        }
        return result;
      };
    }
    if (!context.observer) {
      context.observer = createGlobalObserver();
    }
    let onAddedCb, onRemovedCb;
    context.observer.onAdded.listen(onAddedCb = async (node) => {
      let isAdded = node === tag2.el || node.contains(tag2.el);
      if (isAdded && onMounted) {
        const result = onMounted(tag2);
        if (result instanceof Promise) {
          await result;
        }
      }
    });
    context.observer.onRemoved.listen(onRemovedCb = (node) => {
      let isRemoved = node === tag2.el || node.contains(tag2.el);
      if (isRemoved && onUnmounted) {
        onUnmounted(tag2);
      }
    });
    tag2._destroyers.push(() => {
      context.observer?.onRemoved.remove(onRemovedCb);
      context.observer?.onAdded.remove(onAddedCb);
      onUnmounted = void 0;
      onMounted = void 0;
    });
  }
  var withLifecycle = (tag2, handler) => {
    onLifecycle(tag2, handler.mounted, handler.unmounted, handler.beforeUnmounted);
    return tag2;
  };

  // src/all-tags.ts
  var all_tags_exports = {};
  __export(all_tags_exports, {
    allTags: () => allTags
  });
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

  // src/style-manager.ts
  var style_manager_exports = {};
  __export(style_manager_exports, {
    StyleManager: () => StyleManager
  });
  var STYLE_TAG_ID = "cardboard-styles";
  var StyleManager = class {
    constructor() {
      this.generatedIdsCount = 0;
      this.rules = /* @__PURE__ */ new Set();
      let styleTag = null;
      try {
        styleTag = tag(`(#${STYLE_TAG_ID})`);
      } catch (error) {
        styleTag = tag("style").setId(STYLE_TAG_ID);
      }
      tag("(head)").append(styleTag);
      this.styleTag = styleTag;
    }
    add(styleSheet) {
      const css = genCss(styleSheet);
      if (!this.rules.has(css)) {
        this.rules.add(css);
        this.styleTag.append(css);
      }
    }
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
        const el = builder(entry.entry);
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
      if (!node.parentElement) {
        if (tries < MAX_UPDATE_TRIES) {
          setTimeout(() => updateList(newData, tries + 1), 1);
        } else {
          console.warn(`[each]: parentElement not found after max retries`);
        }
        return;
      }
      if (!nodeParentIndex) {
        const children = Array.from(node.parentElement?.childNodes ?? []);
        nodeParentIndex = children.indexOf(node);
      }
      const diff = diffList(newData, oldData, key);
      if (diff.length <= 0)
        return;
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
    if (newLength === oldLength && (newData == oldData || deepEquals(oldData, newData))) {
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
      return diff;
    }
    let removedCount = 0;
    for (let oi = 0; oi < oldLength; oi++) {
      const newEntry = newData[oi - removedCount], oldEntry = oldData[oi], areEqual = key(oldEntry) == key(newEntry);
      if (areEqual || deepEquals(oldEntry, newEntry)) {
        continue;
      }
      const existsNew = !!newData.find((item) => key(oldEntry) == key(item)), existsOld = !!oldData.find((item) => key(newEntry) == key(item));
      if (!existsOld && existsNew) {
        diff.push({
          entry: newEntry,
          state: "added" /* added */,
          index: oi - removedCount
        });
        removedCount--;
        continue;
      }
      if (existsOld && !existsNew || newEntry == null) {
        diff.push({
          entry: oldEntry,
          state: "removed" /* removed */,
          index: oi
        });
        removedCount++;
        continue;
      }
      if (newData.indexOf(oldEntry) >= 0) {
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
        continue;
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

  // src/cardboard.ts
  var init = (options = { selector: "body" }) => {
    context.initialized = true;
    context.observer = createGlobalObserver();
    context.styleManager = new StyleManager();
    const tag2 = new CTag(`(${options.selector})`);
    return mountPoint(tag2);
  };
  var Cardboard = {
    ...tag_exports,
    ...state_exports,
    ...css_generator_exports,
    ...util_exports,
    ...text_exports,
    ...events_exports,
    ...observables_exports,
    ...lifecycle_exports,
    ...context_exports,
    ...all_tags_exports,
    ...style_manager_exports,
    version: "0.0.5"
  };
  return __toCommonJS(cardboard_exports);
})();

var Cardboard = (() => {
  var Z = Object.defineProperty;
  var be = Object.getOwnPropertyDescriptor;
  var ye = Object.getOwnPropertyNames;
  var xe = Object.prototype.hasOwnProperty;
  var Ce = (r, e) => {
    for (var t in e)
      Z(r, t, { get: e[t], enumerable: true });
  };
  var Oe = (r, e, t, s) => {
    if (e && typeof e === "object" || typeof e === "function") {
      for (let n of ye(e))
        if (!xe.call(r, n) && n !== t)
          Z(r, n, { get: () => e[n], enumerable: !(s = be(e, n)) || s.enumerable });
    }
    return r;
  };
  var Ie = (r) => Oe(Z({}, "__esModule", { value: true }), r);
  var I = (r, e, t) => {
    return new Promise((s, n) => {
      var i = (l) => {
        try {
          o(t.next(l));
        } catch (u) {
          n(u);
        }
      };
      var a = (l) => {
        try {
          o(t.throw(l));
        } catch (u) {
          n(u);
        }
      };
      var o = (l) => l.done ? s(l.value) : Promise.resolve(l.value).then(i, a);
      o((t = t.apply(r, e)).next());
    });
  };

  // src/cardboard.ts
  var ze = {};
  Ce(ze, {
    CEvent: () => N,
    CMappedEvent: () => V,
    CTag: () => w,
    DiffState: () => me,
    Observable: () => P,
    allTags: () => Ve,
    arraysEqual: () => Ee,
    camelToDash: () => M,
    checkInitialized: () => J,
    clearMountPoints: () => Ne,
    compute: () => m,
    computeMultiple: () => Pe,
    context: () => d,
    createGlobalObserver: () => L,
    createObservable: () => v,
    deepEquals: () => A,
    diffList: () => Te,
    each: () => je,
    equalTo: () => ne,
    genBlock: () => de,
    genBlockContent: () => U,
    genCss: () => k,
    generateUID: () => Se,
    getMountPoint: () => Me,
    getValue: () => b,
    grab: () => le,
    greaterThan: () => ee,
    greaterThanOr: () => te,
    init: () => Be,
    isArray: () => D,
    isEmpty: () => oe,
    isInitialized: () => Y,
    isObject: () => E,
    isObservable: () => C,
    lessThan: () => re,
    lessThanOr: () => se,
    listState: () => Re,
    mappedEvent: () => Ae,
    mountPoint: () => q,
    notEmpty: () => ae,
    notEqualTo: () => ie,
    onLifecycle: () => ge,
    removeFromList: () => j,
    resetMountPoints: () => we,
    restoreMountPoint: () => Q,
    singleEvent: () => B,
    state: () => ce,
    stateAdd: () => he,
    stateAddAt: () => fe,
    stateRemove: () => pe,
    stateRemoveWhere: () => X,
    swapItems: () => _e,
    tag: () => T,
    text: () => z,
    uuidv4: () => $,
    val: () => x,
    version: () => qe,
    withLifecycle: () => $e,
    withMountPoint: () => Ke
  });

  // src/util.ts
  var j = (r, e) => {
    if (!e) return false;
    const t = e.indexOf(r);
    if (t !== -1) {
      e.splice(t, 1);
      return true;
    }
    return false;
  };
  var M = (r) => r.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
  var E = (r) => {
    return typeof r === "object" && !(r instanceof Array);
  };
  var D = (r) => {
    return Object.prototype.toString.call(r) === "[object Array]";
  };
  var x = (r, ...e) => {
    if (typeof r === "function") {
      return r(...e);
    }
    return r;
  };
  var _e = (r, e, t) => {
    const s = r[e];
    r[e] = r[t];
    r[t] = s;
    return r;
  };
  var Ee = (r, e) => {
    if (r === e) return true;
    if (r == null || e == null) return false;
    if (r.length !== e.length) return false;
    for (let t = 0; t < r.length; ++t) {
      if (r[t] !== e[t]) return false;
    }
    return true;
  };
  var A = (r, e) => {
    if (r === e) return true;
    if (r && e && r.length !== e.length) return false;
    if (r && e && typeof r == "object" && typeof e == "object") {
      if (r.constructor !== e.constructor) return false;
      var t, s, n;
      if (Array.isArray(r)) {
        t = r.length;
        if (t != e.length) return false;
        for (s = t; s-- !== 0; )
          if (!A(r[s], e[s])) return false;
        return true;
      }
      if (r.constructor === RegExp) return r.source === e.source && r.flags === e.flags;
      if (r.valueOf !== Object.prototype.valueOf) return r.valueOf() === e.valueOf();
      if (r.toString !== Object.prototype.toString) return r.toString() === e.toString();
      n = Object.keys(r);
      t = n.length;
      if (t !== Object.keys(e).length) return false;
      for (s = t; s-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(e, n[s])) return false;
      for (s = t; s-- !== 0; ) {
        var i = n[s];
        if (!A(r[i], e[i])) return false;
      }
      return true;
    }
    return r !== r && e !== e;
  };
  function Se(r) {
    if (!r) return $();
    return `c_${r}`;
  }
  function $() {
    return "c_1000000010".replace(
      /[018]/g,
      (r) => (+r ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +r / 4).toString(16)
    );
  }

  // src/events.ts
  var N = class {
    constructor() {
      this._lstrs = [];
    }
    listen(e) {
      this._lstrs.push(e);
    }
    remove(e) {
      j(e, this._lstrs);
    }
    dispatch(e) {
      this._lstrs.forEach((t) => t(e));
    }
    destroy() {
      this._lstrs = [];
    }
  };
  var V = class {
    constructor() {
      this._lstrs = {};
    }
    listen(e, t) {
      if (!(e in this._lstrs)) {
        this._lstrs[e] = [t];
      } else if (this._lstrs[e]) {
        this._lstrs[e].push(t);
      }
    }
    remove(e, t) {
      j(t, this._lstrs[e]);
    }
    dispatch(e, t) {
      if (e in this._lstrs) {
        this._lstrs[e].forEach((s) => s(t));
      }
    }
    destroy() {
      this._lstrs = {};
    }
  };
  var B = () => {
    return new N();
  };
  var Ae = () => {
    return new V();
  };

  // src/context.ts
  var d = {
    mp: void 0,
    mpHistory: [],
    styleManager: void 0,
    intObs: void 0,
    obs: void 0,
    init: false
  };
  var Y = () => d.init === true;
  var J = () => {
    if (!Y()) {
      throw new Error("Cardboard is not initialized. Please call `init()`, as some features will not work.");
    }
  };
  var Me = () => d.mp;
  var q = (r) => {
    if (d.mp) {
      d.mpHistory.push(d.mp);
    }
    d.mp = r;
    return r;
  };
  var Q = () => {
    d.mp = d.mpHistory.pop();
  };
  var Ne = () => {
    d.mp = void 0;
    d.mpHistory = [];
  };
  var we = () => {
    let r = d.mpHistory.shift();
    d.mp = r;
    d.mpHistory = [];
  };
  var Ke = (r, e) => {
    q(r);
    e(r);
    Q();
  };
  var L = () => {
    const r = B();
    const e = B();
    const t = new window.MutationObserver((s, n) => {
      for (const i of s) {
        for (const a of Array.from(i.addedNodes)) {
          r.dispatch(a);
        }
        for (const a of Array.from(i.removedNodes)) {
          e.dispatch(a);
        }
      }
    });
    t.observe(window.document.body, {
      childList: true,
      subtree: true
    });
    return {
      onAdded: r,
      onRemoved: e
    };
  };

  // src/observables.ts
  var P = class extends N {
    constructor(t, s) {
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
      this.computed = (t) => m(this, t);
      /** @see {@link greaterThan} */
      this.greaterThan = (t = 0) => ee(this, t);
      /** @see {@link greaterThanOr} */
      this.greaterThanOr = (t = 0) => te(this, t);
      /** @see {@link lessThan} */
      this.lessThan = (t = 0) => re(this, t);
      /** @see {@link lessThanOr} */
      this.lessThanOr = (t = 0) => se(this, t);
      /** @see {@link equalTo} */
      this.equalTo = (t) => ne(this, t);
      /** @see {@link notEqualTo} */
      this.notEqualTo = (t) => ie(this, t);
      /** @see {@link isEmpty} */
      this.isEmpty = () => oe(this);
      /** @see {@link notEmpty} */
      this.notEmpty = () => ae(this);
      /** @see {@link grab} */
      this.grab = (t, s) => le(this, t, s);
      if (t && (E(t) || D(t))) {
        t = new Proxy(t, {
          get(n, i, a) {
            return n[i];
          },
          set: (n, i, a, o) => {
            if (n[i] === a) return true;
            n[i] = a;
            super.dispatch(n);
            return true;
          },
          deleteProperty: (n, i) => {
            delete n[i];
            super.dispatch(n);
            return true;
          }
        });
      }
      this._value = t;
      this._destroyer = s;
    }
    get value() {
      return this._value;
    }
    /** Set the value, and dispatch to all listeners. */
    set value(t) {
      this.dispatch(t);
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
    changed(t) {
      this.listen(t);
      return this;
    }
    /**
    * Remove a listener for when this Observable changes.
    */
    remove(t) {
      super.remove(t);
      return this;
    }
    /**
     * Set's the new value, and calls all the listeners.
     * You can additionaly set the {@link value} directly.
     */
    dispatch(t) {
      if (t === this._value) {
        return this;
      }
      this._value = t;
      super.dispatch(t);
      return this;
    }
    destroy() {
      if (this._destroyer) this._destroyer();
      this._value = null;
      super.destroy();
    }
  };
  var C = (r) => {
    return r instanceof P;
  };
  var v = (r, e) => {
    return new P(r, e);
  };
  var m = (r, e) => {
    let t;
    const s = (n) => t == null ? void 0 : t.dispatch(e(n));
    t = v(e(r.value), () => {
      r.remove(s);
      t = null;
      r = null;
    });
    r.changed(s);
    return t;
  };
  var Pe = (r, e) => {
    const t = v(e(...r.map((s) => s.value)));
    for (const s of r) {
      s.changed(() => t.dispatch(
        e(...r.map((n) => n.value))
      ));
    }
    return t;
  };
  var b = (r) => {
    return C(r) ? r.value : r;
  };
  var ee = (r, e = 0) => {
    return m(r, (t) => t > b(e));
  };
  var te = (r, e = 0) => {
    return m(r, (t) => t >= b(e));
  };
  var re = (r, e = 0) => {
    return m(r, (t) => t < b(e));
  };
  var se = (r, e = 0) => {
    return m(r, (t) => t <= b(e));
  };
  var ne = (r, e) => {
    return m(r, (t) => t === b(e));
  };
  var ie = (r, e) => {
    return m(r, (t) => t !== b(e));
  };
  var oe = (r) => {
    return m(r, (e) => e.length <= 0);
  };
  var ae = (r) => {
    return m(r, (e) => e.length > 0);
  };
  var le = (r, e, t) => {
    return m(r, (s) => s ? s[e] ? s[e] : t : t);
  };

  // src/text.ts
  var z = (r, e) => {
    const t = document.createTextNode(""), s = /\B\$([0-9]+|[a-z][a-z0-9_$]*)/gi;
    if (!e) {
      t.nodeValue = r;
      return t;
    }
    const n = (i) => {
      t.nodeValue = !i ? r : r.replace(
        s,
        (a, o) => {
          var l;
          return ((l = i[o]) != null ? l : a).toString();
        }
      );
    };
    if (C(e)) {
      e.changed((i) => n(i));
      n(e.value);
    } else if (E(e)) {
      for (const i of Object.getOwnPropertyNames(e)) {
        if (r.includes(`$${i}`) && C(e[i])) {
          e[i].changed(() => n(e));
        }
      }
      n(e);
    }
    return t;
  };

  // src/tag.ts
  var w = class r {
    constructor(e, t = [], s = false) {
      this._visible = false;
      /**
       * Any function inside this array, will be called whenever the CTag is {@link destroy}ed
       * Used to remove HTML Event Listeners and Observable listeners
       * @hidden
       */
      this._destroyers = [];
      /** Holds the list of all children, the ones that are currently in the DOM and those that are not. */
      this._children = [];
      this._cachedChildren = [];
      this._meta = {
        isHidden: false,
        nextSiblingID: null
      };
      const n = typeof e === "string" && e.match(/\(.+\)/);
      if (n) {
        const i = e.match(/\(([\.\#]?[a-zA-Z][a-zA-Z0-9_$]+)\)/);
        const a = i ? i[1] : null;
        if (!a) {
          throw new Error(`'${e}' is not a valid selector`);
        }
        const o = document.querySelector(a);
        if (!o) {
          throw new Error("Can't find element for selector: " + e);
        }
        this.el = o;
      } else if (typeof e === "string") {
        this.el = document.createElement(e);
        if (d.mp && s) {
          d.mp.append(this);
        }
      } else if (e instanceof HTMLElement) {
        this.el = e;
      } else {
        throw new Error("Invalid argument: " + e);
      }
      if (t.length > 0) this.setChildren(t);
      this.el.tag = this;
    }
    get visible() {
      return this._visible;
    }
    set visible(e) {
      this._visible = e;
      this.el.dispatchEvent(new CustomEvent("visible", {
        detail: {
          visible: e,
          tag: this
        },
        bubbles: true,
        composed: true
      }));
    }
    get parent() {
      return this._parent;
    }
    set parent(e) {
      this._parent = e;
    }
    get children() {
      return this._getChildren(this.el);
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
    setValue(e) {
      this.el.value = e;
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
    setChecked(e) {
      this.el.checked = e;
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
      const e = this.value;
      this.clear();
      return e;
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
    setId(e) {
      this.el.id = e;
      return this;
    }
    /** 
     * Sets the children, removes previous children  
     */
    setChildren(e) {
      this.el.replaceChildren(...this._mapChildren(e));
      this._children = e;
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
    append(...e) {
      this.el.append(...this._mapChildren(e));
      this._children.push(...e);
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
    prepend(...e) {
      this.el.prepend(...this._mapChildren(e));
      this._children.unshift(...e);
      return this;
    }
    /**
     * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
     * I will be placed exactly in the correct position, even if there are other elements hidden.
     * **USE WITH CAUTION**: Not intended to be used in most cases.
     * @hidden
     */
    show() {
      return I(this, null, function* () {
        if (this.parent && !this.parent.children.includes(this.el)) {
          const e = this.parent.el;
          const t = this.parent._children.indexOf(this);
          if (t === 0) {
            e.prepend(this.el);
          } else if (t === this.parent._children.length - 1) {
            e.append(this.el);
          } else {
            let s = 0;
            for (let i = t - 1; i >= 0; i--) {
              const a = this.parent._children[i];
              if (a instanceof r && a._meta.isHidden) {
                s++;
              }
            }
            const n = e.childNodes[t - s];
            e.insertBefore(this.el, n);
          }
        }
        this._meta.isHidden = false;
        return true;
      });
    }
    /** 
     * Hide this element (removed from DOM) 
     * **USE WITH CAUTION**: Not intended to be used in most cases.
     * @hidden
     */
    hide() {
      return I(this, null, function* () {
        if (this.parent && this.parent.children.includes(this.el)) {
          this.parent.el.insertBefore(document.createComment(this.el.id), this.el);
          yield this.remove();
          this._meta.isHidden = true;
        }
      });
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
    consume(e, t) {
      if (e.changed) {
        const s = (n) => t(this, n);
        e.changed(s);
        this._destroyers.push(() => {
          e.remove(s);
          e = null;
        });
      } else {
        console.warn("An invalid Observable was supplied to `tag.consume`");
      }
      t(this, "value" in e ? e.value : e);
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
    doIf(e, t, s, n = false) {
      if (n) {
        const a = t;
        t = s;
        s = a;
      }
      const i = (a, o) => {
        if (!!o) t(o);
        else s(o);
      };
      return this.consume(e, i);
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
    doIfNot(e, t, s) {
      return this.doIf(e, t, s, true);
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
    hideIf(e, t = false) {
      const s = (n, i) => {
        const a = t ? !i : !!i;
        this._meta.isHidden = a;
        if (!this.parent) return;
        if (!a) void this.show();
        else void this.hide();
      };
      return this.consume(e, s);
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
    hideIfNot(e) {
      return this.hideIf(e, true);
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
    classIf(e, t, s = false) {
      return this.doIf(
        e,
        () => this.addClass(...x(t, this)),
        () => this.rmClass(...x(t, this)),
        s
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
    classIfNot(e, t) {
      return this.classIf(e, t, true);
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
    textIf(e, t, s = "", n = false) {
      return this.doIf(
        e,
        () => this.text(x(t, this)),
        () => this.text(x(s, this)),
        n
      );
    }
    /**
     * Sets text when the consumer is falsy, and sets `elseText (default='')` when the consumer is truthy.
     * Both text and `elseText` can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     */
    textIfNot(e, t, s = "") {
      return this.textIf(e, t, s, true);
    }
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the observable changes.
     * `value` can be a string or a function that returns a string.
     * If `invert` is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf(e, t, s = "", n = false) {
      return this.doIf(
        e,
        () => this.addAttr(t, x(s, this)),
        () => this.rmAttr(t),
        n
      );
    }
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the observable changes.
     * `value` can be a string or a function that returns a string.
     * If `invert` is set to true, the condition will be inversed
     */
    attrIfNot(e, t, s = "") {
      return this.attrIf(e, t, s, true);
    }
    /**
     * Disable this element when the consumer is truthy. Updates whenever the observable changes.
     * If `invert` is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf(e, t = false) {
      return this.attrIf(e, "disabled", "", t);
    }
    /** Disable this element when the consumer is falsy. Updates whenever the observable changes. */
    disableIfNot(e) {
      return this.disableIf(e, true);
    }
    /**
     * Add style to the element when the consumer is truthy. Updates whenever the observable changes.
     * If `invert` is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
     * `value` can be a string or a function that returns a string.
     */
    styleIf(e, t, s = "", n = false) {
      return this.doIf(
        e,
        () => this.addStyle(t, x(s, this)),
        () => this.rmStyle(t),
        n
      );
    }
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the observable changes.
     * `value` can be a string or a function that returns a string.
     */
    styleIfNot(e, t, s = "") {
      return this.styleIf(e, t, s, true);
    }
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
     * `styles` can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If `invert` is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf(e, t, s = false) {
      return this.doIf(
        e,
        () => this.setStyle(x(t, this)),
        () => this.rmStyle(...Object.keys(t)),
        s
      );
    }
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the observable changes.
     * `styles` can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot(e, t) {
      return this.stylesIf(e, t, true);
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
    styled(e, t) {
      var s;
      t != null ? t : t = $();
      if (e) {
        (s = d.styleManager) == null ? void 0 : s.add({
          [`.${t}`]: e
        });
      }
      return this.addClass(t);
    }
    /**
     * If {textTemplate} is provided, it sets the `textContent` of the element.
     * If {textTemplate} is provided, and a state is provided. It will use the {textTemplate} as a template,
     * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
     *
     * If no argument is provided, it returns the `textContent` of the element.
     * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
     */
    text(e, t) {
      if (e == null) {
        return this.el.textContent;
      }
      if (t && e) {
        return this.setChildren([z(e, t)]);
      }
      this.el.textContent = e;
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
    config(e) {
      if (e.attr) this.setAttrs(e.attr);
      if (e.classList) this.addClass(...e.classList);
      if (e.className) this.setClassName(e.className);
      if (e.style) this.setStyle(e.style);
      if (e.text) this.text(e.text);
      if (e.value) this.setValue(e.value);
      if (e.children) this.append(...e.children);
      if (e.on) {
        for (const t of Object.keys(e.on)) {
          this.on(t, e.on[t]);
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
    addClass(...e) {
      this.classList.add(...e);
      return this;
    }
    /** Set the elements class name */
    setClassName(e) {
      this.el.className = e;
      return this;
    }
    /** Remove classes from class list */
    rmClass(...e) {
      for (const t of e) {
        this.classList.remove(t);
      }
      return this;
    }
    /** Check if classes are present in this element */
    hasClass(...e) {
      for (const t of e) {
        if (!this.classList.contains(t)) {
          return false;
        }
      }
      return true;
    }
    /** Replace a class with another */
    replaceClass(e, t) {
      this.classList.replace(e, t);
      return this;
    }
    /** Toggle a class. If it's present it's removed, if it's not present its added. */
    toggleClass(e) {
      return this.hasClass(e) ? this.rmClass(e) : this.addClass(e);
    }
    /** Add a single style */
    addStyle(e, t) {
      this.el.style[e] = t;
      return this;
    }
    /** Set multiple styles at once */
    setStyle(e) {
      var t;
      for (const s in e) {
        this.addStyle(s, (t = e[s]) != null ? t : "");
      }
      return this;
    }
    /** Remove styles */
    rmStyle(...e) {
      for (const t of e) {
        this.style.removeProperty(M(t));
      }
      return this;
    }
    /** Check if this element has styles */
    hasStyle(...e) {
      for (const t of e) {
        if (!this.style.getPropertyValue(M(t))) {
          return false;
        }
      }
      return true;
    }
    /** Adds a set of attributes to the element */
    setAttrs(e) {
      for (const t in e) {
        this.addAttr(t, e[t]);
      }
      return this;
    }
    /** Adds a single attribute to the element */
    addAttr(e, t = "") {
      this.el.attributes[e] = t;
      this.el.setAttribute(e, t);
      return this;
    }
    /** Remove attributes from the element */
    rmAttr(...e) {
      for (const t of e) {
        this.el.removeAttribute(t);
        delete this.el.attributes[t];
      }
      return this;
    }
    /** Check if this element has attributes */
    hasAttr(...e) {
      for (const t of e) {
        if (!(t in this.el.attributes)) {
          return false;
        }
      }
      return true;
    }
    /** Get an attributes value */
    getAttr(e) {
      return this.el.attributes[e];
    }
    // TODO: Might be a good idea to return the listener so it can be removed later
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen(e, t, s) {
      return e.on(t, (n, i) => {
        s(this, n, i);
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
    when(e, t) {
      const s = v({});
      this.on(e, (n, i) => {
        s.dispatch(t(n, i));
      });
      return s;
    }
    // TODO: Might be a good idea to return the listener so it can be removed later
    /** 
     * Add an event listener for a particular HTMLElement event 
     * 
     * @param {K} evtName - The name of the event to listen for. For a list of valid event names, see {@link HTMLElementEventMap "available event names"}.
     * @param {fn} fn - The callback function to execute when the event is triggered.
     * @returns {CTag} - The current CTag instance, allowing for method chaining
     */
    on(e, t) {
      if (t) {
        const s = (n) => t(this, n);
        this.el.addEventListener(e, s);
        this._destroyers.push(() => {
          this.el.removeEventListener(e, s);
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
    once(e, t) {
      const s = (n) => {
        t(this, n);
        this.el.removeEventListener(e, s);
      };
      this.el.addEventListener(e, s);
      return this;
    }
    // TODO: nombrekeff: maybe remove these convenience methods. Would free some space in the bundle
    /** Add a **click** event listener */
    clicked(e) {
      return this.on("click", e);
    }
    /** Add a **keypress** event listener */
    keyPressed(e, t) {
      if (t) {
        return this.on("keypress", (s, n) => {
          if (n.code === t || n.key === t) {
            e(this, n);
          }
        });
      }
      return this.on("keypress", e);
    }
    /** Add a **change** event listener */
    changed(e) {
      return this.on("change", e);
    }
    /** Add a **submit** event listener */
    submited(e) {
      return this.on("submit", e);
    }
    /**
     * Remove element from the DOM, but keep data as is. Can then be added again.
     * To fully remove the element use {@link destroy}
     * 
     * **USE WITH CAUTION!** Not intended to be used in most cases.
     */
    remove() {
      return I(this, null, function* () {
        const e = this.el.remove();
        if (e instanceof Promise) {
          yield e;
        }
        yield this.el.remove();
        return this;
      });
    }
    /**
     * Destroy the element, should not be used afterwards
     * 
     * **USE WITH CAUTION!** Not intended to be used in most cases.
     */
    destroy() {
      var e;
      (e = d.intObs) == null ? void 0 : e.unobserve(this.el);
      this._children.forEach((t) => {
        if (t instanceof r) {
          t.destroy();
        }
      });
      this._destroyers.forEach((t) => t());
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
    /** 
     * Set whether the element should be disabled or not. It sets the `disabled` attribute.
     */
    setDisabled(e) {
      return e ? this.addAttr("disabled") : this.rmAttr("disabled");
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
    q(e) {
      const t = this.el.querySelector(e);
      if (t) return new r(t);
    }
    /** 
     * Find a child in this element (in the DOM or NOT)
     * @param {function} predicate - A function that takes a TagChild and returns true if it matches the condition.
     * @returns {TagChild | undefined} - Returns the first TagChild that matches the predicate, or undefined if no match is found.
     */
    find(e) {
      for (const t of this._children) {
        if (e(t)) {
          return t;
        }
      }
    }
    /**
     * Find a CTag child in this element (in the DOM or NOT)
     * @param {function} predicate - A function that takes a CTag and returns true if it matches the condition.
     * @returns {CTag | undefined} - Returns the first CTag that matches the predicate, or undefined if no match is found.
     */
    findTag(e) {
      for (const t of this._children) {
        if (t instanceof r && e(t)) {
          return t;
        }
      }
    }
    _childrenFilterPredicate(e) {
      if (e instanceof r && e._meta.isHidden) {
        return false;
      }
      return true;
    }
    _getElementForChild(e) {
      if (typeof e === "string") return document.createTextNode(e);
      if (C(e)) {
        return z("$val", { val: e });
      }
      if (e instanceof r) return e.el;
      if (e instanceof Node) return e;
      return null;
    }
    _getChildren(e) {
      if (!this._observer) {
        this._observer = new window.MutationObserver(() => {
          this._cacheChildren(e);
        });
        this._observer.observe(this.el, { childList: true });
        this._cacheChildren(e);
      }
      return this._cachedChildren;
    }
    _cacheChildren(e) {
      const t = e.childNodes, s = [];
      let n = t.length;
      while (n--) {
        if (t[n].nodeType === 1) {
          s.unshift(t[n]);
        }
      }
      this._cachedChildren = s;
    }
    _mapChildren(e) {
      const t = [];
      for (let s = 0; s < e.length; s++) {
        const n = e[s];
        if (n instanceof r) {
          n.parent = this;
        }
        if (this._childrenFilterPredicate(n)) {
          const i = this._getElementForChild(n);
          if (i != null) t.push(i);
        }
      }
      return t;
    }
  };
  var T = (r, e = [], t = false) => {
    J();
    return new w(r, e, t);
  };

  // src/css-generator.ts
  var k = (r) => {
    const e = r instanceof Array ? r : [r];
    let t = "";
    for (const s of e) {
      for (const n in s) {
        t += de(n, s[n]);
      }
    }
    return t;
  };
  var de = (r, e) => {
    return U(r, e).join("");
  };
  var U = (r, e) => {
    let t = "";
    const s = [];
    for (const n in e) {
      if (E(e[n])) {
        let i = r;
        i += n;
        s.push(...U(i, e[n]));
      } else if (e[n]) {
        t += `${M(n)}:${e[n]};`;
      }
    }
    s.unshift(`${r}{${t}}`);
    return s;
  };

  // src/style-manager.ts
  var ue = "cardboard-styles";
  var W = class {
    constructor() {
      this.generatedIdsCount = 0;
      this.rules = /* @__PURE__ */ new Set();
      let e = null;
      try {
        e = T(`(#${ue})`);
      } catch (t) {
        e = T("style").setId(ue);
      }
      T("(head)").append(e);
      this.styleTag = e;
    }
    add(e) {
      const t = k(e);
      if (!this.rules.has(t)) {
        this.rules.add(t);
        this.styleTag.append(t);
      }
    }
  };

  // src/state.ts
  var ce = (r) => {
    return v(r);
  };
  var Re = (r) => {
    const e = ce(
      r.map((n) => v(n))
    );
    const t = (n) => {
      he(e, v(n));
    };
    const s = (n, i) => {
      fe(e, v(n), i);
    };
    return {
      /**
       * The reactive list of items.
       * Each item is wrapped in a {@link State} to allow for individual reactivity.
       */
      get list() {
        return e;
      },
      /**
       * The raw list of items.
       */
      get listValue() {
        return e.value;
      },
      add: t,
      addAt: s,
      remove: pe.bind({}, e),
      removeWhere: X.bind({}, e),
      length: e.computed((n) => n.length)
    };
  };
  var he = (r, e) => {
    r.value = [...r.value, e];
  };
  var fe = (r, e, t) => {
    let s = [...r.value];
    s.splice(t, 0, e);
    r.value = s;
    s = [];
  };
  var X = (r, e) => {
    r.value = r.value.filter((t, s) => !e(t, s));
  };
  var pe = (r, e) => {
    const t = r.value.findIndex((s) => b(s) === b(e));
    X(r, (s, n) => {
      return t === n;
    });
  };

  // src/each.ts
  var me = /* @__PURE__ */ ((n) => {
    n["unchanged"] = "unchanged";
    n["added"] = "added";
    n["removed"] = "removed";
    n["swap"] = "swap";
    return n;
  })(me || {});
  function je(r, e, t) {
    const s = document.createTextNode(""), n = [];
    let i = [], a = 0, o = [];
    const l = (f) => {
      var p;
      if (f.index >= 0) {
        const c = e(f.entry);
        const O = n[f.index];
        n.splice(f.index, 0, c);
        (p = s.parentElement) == null ? void 0 : p.insertBefore(c.el, O ? O.el : s);
      }
    };
    const u = (f) => {
      var c;
      (c = s.parentElement) == null ? void 0 : c.removeChild(o[f.index].el);
      o[f.index].destroy();
      const p = n.indexOf(o[f.index]);
      n.splice(p, 1);
    };
    const S = (f) => {
      var O;
      const p = f.index, c = (O = f.targetIndex) != null ? O : 0;
      if (p >= 0 && c >= 0) {
        const _ = o[p];
        const h = o[c];
        const g = _.el.parentNode;
        const K = _.el.nextSibling;
        if (g && K === h.el) {
          g.insertBefore(h.el, _.el);
        } else if (h.el.parentNode) {
          h.el.parentNode.insertBefore(_.el, h.el);
          if (K && g) {
            g.insertBefore(h.el, K);
          } else if (g) {
            g.appendChild(h.el);
          }
        }
        const G = o[p];
        o[p] = o[c];
        o[c] = G;
        const ve = n[p];
        n[p] = n[c];
        n[c] = ve;
      }
    };
    const H = {
      ["added"]: l,
      ["removed"]: u,
      ["swap"]: S
    };
    const R = 100;
    const y = (f, p = 0) => {
      var O, _;
      if (!s.parentElement) {
        if (p < R) {
          setTimeout(() => y(f, p + 1), 1);
        } else {
          console.warn(`[each]: parentElement not found after max retries`);
        }
        return;
      }
      if (!a) {
        const h = Array.from((_ = (O = s.parentElement) == null ? void 0 : O.childNodes) != null ? _ : []);
        a = h.indexOf(s);
      }
      const c = Te(f, i, t);
      if (c.length <= 0) return;
      for (let h = 0; h < c.length; h++) {
        const g = c[h];
        const K = c[h + 1] ? c[h + 1].index : null;
        const G = c[h + 1] ? c[h + 1].state : null;
        H[g.state](g);
        if (G === "swap" && K === g.targetIndex) {
          h++;
        }
      }
      i = [...f].slice(0);
      o = n.slice(0);
    };
    y("value" in r ? r.value : r);
    if (C(r)) {
      r.changed(y);
    }
    return s;
  }
  function Te(r, e, t = (s) => s) {
    const s = [], n = r.length, i = e.length;
    if (n === i && (r == e || A(e, r))) {
      return s;
    }
    if (n <= 0) {
      for (let o = 0; o < i; o++) {
        s[o] = {
          entry: e[o],
          state: "removed",
          index: o
        };
      }
      return s;
    }
    if (!i) {
      for (let o = 0; o < n; o++) {
        s[o] = {
          entry: r[o],
          state: "added",
          index: o
        };
      }
      return s;
    }
    let a = 0;
    for (let o = 0; o < i; o++) {
      const l = r[o - a], u = e[o], S = t(u) == t(l);
      if (S || A(u, l)) {
        continue;
      }
      const H = !!r.find((y) => t(u) == t(y)), R = !!e.find((y) => t(l) == t(y));
      if (!R && H) {
        s.push({
          entry: l,
          state: "added",
          index: o - a
        });
        a--;
        continue;
      }
      if (R && !H || l == null) {
        s.push({
          entry: u,
          state: "removed",
          index: o
        });
        a++;
        continue;
      }
      if (r.indexOf(u) >= 0) {
        s.push({
          entry: l,
          targetEntry: u,
          state: "swap",
          index: e.indexOf(r[o - a]),
          targetIndex: e.indexOf(e[o])
        });
        const y = e.indexOf(l);
        const f = e[o];
        e[o] = r[o - a];
        e[y] = f;
      }
    }
    if (a != i) {
      for (let o = i - a; o < n; o++) {
        const l = r[o];
        s.push({
          entry: l,
          state: "added",
          index: o
        });
      }
    }
    return s;
  }

  // src/lifecycle.ts
  function ge(r, e, t, s) {
    var a, o;
    if (s) {
      const l = r.el.remove;
      r.el.remove = () => I(null, null, function* () {
        const u = s(r);
        if (!u || u instanceof Promise && (yield u)) {
          l.call(r.el);
        }
        return u.valueOf();
      });
    }
    if (e) {
      const l = r.show;
      r.show = () => I(null, null, function* () {
        const u = l.call(r);
        if (u instanceof Promise) {
          return yield u;
        }
        return u;
      });
    }
    (o = (a = d).obs) != null ? o : a.obs = L();
    const n = (l) => I(null, null, function* () {
      let u = l === r.el || l.contains(r.el);
      if (u && e) {
        const S = e(r);
        if (S instanceof Promise) {
          yield S;
        }
      }
    });
    const i = (l) => {
      let u = l === r.el || l.contains(r.el);
      if (u && t) {
        t(r);
      }
    };
    d.obs.onAdded.listen(n);
    d.obs.onRemoved.listen(i);
    r._destroyers.push(() => {
      var l, u;
      (l = d.obs) == null ? void 0 : l.onRemoved.remove(i);
      (u = d.obs) == null ? void 0 : u.onAdded.remove(n);
      t = void 0;
      e = void 0;
    });
  }
  var $e = (r, e) => {
    ge(r, e.mounted, e.unmounted, e.beforeUnmounted);
    return r;
  };

  // src/all-tags.ts
  var F = {
    ul: (r, e = false) => {
      return T(
        "ul",
        r.map((t) => {
          return T("li", [t], e);
        })
      );
    },
    style: (r, e = false) => {
      return T("style", [k(r)], e);
    }
  };
  var Ve = new Proxy(
    {},
    {
      get: (r, e, t) => {
        const s = e.toString();
        const n = (...i) => {
          return F[s] ? F[s](i, false) : T(s, i);
        };
        Object.defineProperty(n, "mount", {
          get: () => {
            return (...i) => {
              return F[s] ? F[s](i, true) : T(s, i, true);
            };
          }
        });
        return n;
      }
    }
  );

  // src/cardboard.ts
  var Be = (r = { selector: "body" }) => {
    d.init = true;
    d.obs = L();
    d.styleManager = new W();
    const e = new w(`(${r.selector})`);
    return q(e);
  };
  var qe = "0.0.7-alpha.2";
  return Ie(ze);
})();
//# sourceMappingURL=cardboard.global.js.map
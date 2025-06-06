var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { genCss } from './css-generator.js';
import { val, camelToDash } from './util.js';
import { text } from './text.js';
import { createObservable, isObservable } from './observables.js';
import { createGlobalObserver } from './lifecycle.js';
export const context = {
    mountPoint: undefined,
    mountPointHistory: [],
};
/**
 * Returns the current mountPoint {@link CTag}. See {@link mountPoint} for more information.
 */
export const getMountPoint = () => context.mountPoint;
/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export class CTag {
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
    constructor(arg0, children = [], mountToParent = false) {
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
            nextSiblingID: null,
        };
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
            this.el = element;
        }
        else if (typeof arg0 === 'string') {
            this.el = document.createElement(arg0);
            if (context.mountPoint && mountToParent) {
                context.mountPoint.append(this);
            }
        }
        else if (arg0 instanceof HTMLElement) {
            this.el = arg0;
        }
        else {
            throw new Error('Invalid argument 0');
        }
        if (children.length > 0)
            this.setChildren(children);
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
    show() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /** Hide this element (removed from DOM) */
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.parent && this.parent.children.includes(this.el)) {
                yield this.remove();
                this._meta.isHidden = true;
            }
        });
    }
    /** Whenever the observable changes, it will call the consumer */
    consume(observable, consumer) {
        if (observable.changed) {
            const cb = (newValue) => consumer(this, newValue);
            observable.changed(cb);
            this._destroyers.push(() => {
                // Destroy reference to the observable, we don't need it anymore
                observable.remove(cb);
                observable = null;
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
    doIf(observable, ifTrue, ifFalse, invert = false) {
        if (invert) {
            const temp = ifTrue;
            ifTrue = ifFalse;
            ifFalse = temp;
        }
        const callback = (_, value) => {
            // eslint-disable-next-line no-extra-boolean-cast
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
        return this.doIf(observable, () => this.addClass(...val(classes, this)), () => this.rmClass(...val(classes, this)), invert);
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
    textIf(observable, text, elseText = '', invert = false) {
        return this.doIf(observable, () => this.text(val(text, this)), () => this.text(val(elseText, this)), invert);
    }
    /**
     * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     */
    textIfNot(observable, text, elseText = '') {
        return this.textIf(observable, text, elseText, true);
    }
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf(observable, attr, value = '', invert = false) {
        return this.doIf(observable, () => this.addAttr(attr, val(value, this)), () => this.rmAttr(attr), invert);
    }
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed
     */
    attrIfNot(observable, attr, value = '') {
        return this.attrIf(observable, attr, value, true);
    }
    /**
     * Disable this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf(observable, invert = false) {
        return this.attrIf(observable, 'disabled', '', invert);
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
    styleIf(observable, style, value = '', invert = false) {
        return this.doIf(observable, () => this.addStyle(style, val(value, this)), () => this.rmStyle(style), invert);
    }
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     */
    styleIfNot(observable, style, value = '') {
        return this.styleIf(observable, style, value, true);
    }
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf(observable, styles, invert = false) {
        return this.doIf(observable, () => this.setStyle(val(styles, this)), () => this.rmStyle(...Object.keys(styles)), invert);
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
    listen(tag, evt, consumer) {
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
        var _a;
        for (const key in styles) {
            this.addStyle(key, (_a = styles[key]) !== null && _a !== void 0 ? _a : '');
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
    addAttr(key, value = '') {
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
        return this.on('click', fn);
    }
    /** Add a **keypress** event listener */
    keyPressed(fn, key) {
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
    changed(fn) {
        return this.on('change', fn);
    }
    /** Add a **submit** event listener */
    submited(fn) {
        return this.on('submit', fn);
    }
    /**
     * Remove element from the DOM, but keep data as is. Can then be added again.
     * To fully remove the element use {@link destroy}
     */
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            // Might be a promise (it's overriden by `withLifecycle`)
            const result = this.el.remove();
            if (result instanceof Promise) {
                yield result;
            }
            yield this.el.remove();
            return this;
        });
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
        this.el.value = '';
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
    setDisabled(disabled) {
        return disabled ? this.addAttr('disabled') : this.rmAttr('disabled');
    }
    /** Query a child in this element (in the DOM) */
    q(selector) {
        const element = this.el.querySelector(selector);
        if (element)
            return new CTag(element);
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
            if (child instanceof CTag && predicate(child)) {
                return child;
            }
        }
    }
    _childrenFilterPredicate(item) {
        if (item instanceof CTag && item._meta.isHidden) {
            return false;
        }
        return true;
    }
    _getElementForChild(cl) {
        if (typeof cl === 'string')
            return document.createTextNode(cl);
        if (isObservable(cl)) {
            return text('$val', { val: cl });
        }
        if (cl instanceof CTag)
            return cl.el;
        if (cl instanceof Node)
            return cl;
        return null;
    }
    _getChildren(element) {
        if (!this._observer) {
            this._observer = new MutationObserver(() => {
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
        for (const child of children) {
            if (child instanceof CTag) {
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
}
/**
 * This function can do the following based on the first argument:
 * * create a tag if you provide a tag name: (`div`, `abbr`, `custom-tag`, ...),
 * * wrap around an existing element in the page if you pass in a selector: (`'(body)'`, `'(#id)'`, `'(.class)'`), any selector is allowed.
 * * wrap around an element passed in
 *
 * Then it can receive a list of children to be added.
 * Receives a third argument for mounting this tag to the currently mounted tag ({@link mountPoint}).
 *
 * @example
 * ```ts
 * tag('div');
 * tag('(body)');
 * tag('(.someclass)');
 * tag(document.querySelector('#something'));
 * ```
 */
export const tag = (arg0, children = [], mountToParent = false) => {
    return new CTag(arg0, children, mountToParent);
};
/**
 * Makes the given tag the mount point. This means that when other tags are created with "mountToParent" or  (using `<tag_name>.mount()`, `tag('<tag_name>', [], true)`),
 * they will be added as children of this tag.
 * You can call mountPoint multiple times, and the last mount point tag will be used.
 * Then when you've finished, you can call {@link restoreMountPoint} to go back to the previously mounted tag if there is one.
 * You can clear all mount points using {@link clearMountPoints}.
 *
 * @example
 * ```ts
 * mountPoint(div()); // Div 1
 * div.mount();  // added as child of div
 * p.mount();    // added as child of div
 *
 * mountPoint(div()); // Div 2
 * div.mount();  // added as child of new div
 * p.mount();    // added as child of new div
 *
 * restoreMountPoint();      // Back to div 1
 * clearMountPoints();       // Clears all mount points, no mount point after this call
 * ```
 */
export const mountPoint = (tag) => {
    if (context.mountPoint) {
        context.mountPointHistory.push(context.mountPoint);
    }
    context.mountPoint = tag;
    return tag;
};
/**
 * Restore the currently mounted tag ({@link mountPoint}).
 * Goes back in the stack of mount points tags.
 * If there is no previous mount point tag, it will not do anything.
 */
export const restoreMountPoint = () => {
    context.mountPoint = context.mountPointHistory.pop();
};
/**
 * Restores all mount points. There will be no mount points tag after calling this function.
 */
export const clearMountPoints = () => {
    context.mountPoint = undefined;
    context.mountPointHistory = [];
};
/**
 * Clears the mount point history and resets the mount point to the first one.
 * This means that the mount point will be the first tag that was mounted,
 * and all other mount points will be cleared.
 */
export const resetMountPoints = () => {
    let first = context.mountPointHistory.shift();
    context.mountPoint = first;
    context.mountPointHistory = [];
};
/**
 * Sets the mount point to the given tag, calls the scoped callback, and then restores the mount point.
 * Useful for creating a temporary mount point for a specific tag, and then restoring the previous mount point.
 *
 * @param tag
 * @param scopedCallback
 */
export const withMountPoint = (tag, scopedCallback) => {
    mountPoint(tag);
    scopedCallback(tag);
    restoreMountPoint();
};
/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
export const init = (options = { selector: 'body' }) => {
    const tag = new CTag(`(${options.selector})`);
    context.observer = createGlobalObserver();
    return mountPoint(tag);
};
/** Override any tag function we want, to give it some custom behaviour, process the children, etc... */
const interceptors = {
    ul: (children, mountToParent = false) => {
        return tag('ul', children.map((cl) => {
            return tag('li', [cl], mountToParent);
        }));
    },
    style: (styles, mountToParent = false) => {
        return tag('style', [genCss(styles)], mountToParent);
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
export const allTags = new Proxy({}, {
    get: (t, p, r) => {
        const tagName = p.toString();
        const fn = (...children) => {
            return interceptors[tagName] ? interceptors[tagName](children, false) : tag(tagName, children);
        };
        Object.defineProperty(fn, 'mount', {
            get: () => {
                return (...children) => {
                    return interceptors[tagName] ? interceptors[tagName](children, true) : tag(tagName, children, true);
                };
            },
        });
        return fn;
    },
});
//# sourceMappingURL=tag.js.map
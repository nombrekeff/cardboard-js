var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CssGenerator } from './css-generator.js';
import { val, camelToDash } from './util.js';
import { text } from './text.js';
import { createConsumable, isConsumable } from './consumables.js';
let context = {
    attached: null,
    stack: [],
    css: new CssGenerator(),
};
/**
 * Returns the currently attached {@link CTag}. See {@link attach} for more information.
 */
export function attached() {
    return context.attached;
}
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
        this._getChildren(this.element);
        return this._cachedChildren;
    }
    get value() {
        return this.element.value;
    }
    get style() {
        return this.element.style;
    }
    get className() {
        return this.element.className;
    }
    get classList() {
        return this.element.classList;
    }
    setValue(newValue) {
        this.element.value = newValue;
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
    setId(id) {
        this.element.id = id;
        return this;
    }
    constructor(arg0, children = [], attachable = false) {
        /** @param parent Reference to the parent @type {CTag} of this element */
        this._parent = null;
        /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
        this._children = [];
        this._cachedChildren = [];
        /** If set to true, it be appended to the attached tag */
        this._attachable = false;
        this._meta = {
            isHidden: false,
            nextSiblingID: null,
        };
        this._attachable = false;
        const isSelector = typeof arg0 == 'string' && arg0.match(/\(.+\)/);
        if (isSelector) {
            this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
        }
        else if (typeof arg0 == 'string') {
            this._attachable = attachable;
            this.element = document.createElement(arg0);
        }
        else if (arg0 instanceof HTMLElement) {
            this.element = arg0;
        }
        else {
            throw new Error('Invalid argument 0');
        }
        if (context.attached && this._attachable) {
            context.attached.append(this);
        }
        if (children.length > 0)
            this.setChildren(children);
    }
    /** Sets the children, removes previous children  */
    setChildren(children) {
        this.element.replaceChildren(...this._mapChildren(children));
        this._children = children;
        return this;
    }
    append(...children) {
        this.element.append(...this._mapChildren(children));
        this._children.push(...children);
        return this;
    }
    prepend(...children) {
        this.element.prepend(...this._mapChildren(children));
        this._children.unshift(...children);
        return this;
    }
    /** Whenever the consumable changes, it will call the consumer */
    consume(consumable, consumer) {
        consumable.changed((newValue) => consumer(this, newValue));
        consumer(this, consumable);
        return this;
    }
    /**
     * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
     * I will be placed exactly in the correct position, even if there are other elements hidden.
     */
    show() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.parent.children.includes(this.element)) {
                const parentEl = this.parent.element;
                // Get's the position of the element if all the children are visible
                const expectedIndex = this.parent._children.indexOf(this);
                // If the element should be the first child in the parent
                if (expectedIndex == 0) {
                    parentEl.prepend(this.element);
                }
                // If the element should be the last child in the parent
                else if (expectedIndex == this.parent._children.length - 1) {
                    parentEl.append(this.element);
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
                    parentEl.insertBefore(this.element, nextEl);
                }
            }
            this._meta.isHidden = false;
            return true;
        });
    }
    /** Hide this element (removed from DOM) */
    hide() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.parent.children.includes(this.element)) {
                yield this.remove();
                this._meta.isHidden = true;
            }
        });
    }
    /**
     * When the consumable changes, it will call {ifTrue} when the consumable is true. Or {ifFalse} when the consumable is false.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
     */
    doIf(consumable, ifTrue, ifFalse, invert = false) {
        if (invert) {
            let temp = ifTrue;
            ifTrue = ifFalse;
            ifFalse = temp;
        }
        const callback = (value) => {
            if (value)
                ifTrue(value);
            else
                ifFalse(value);
        };
        consumable.changed(callback);
        callback(consumable.value);
        return this;
    }
    /**
     * The oposite of {this.doIf}
     * When the consumable changes, it will call {ifTrue} if the consumable is false. Or {ifFalse} if the consumable is true.
     */
    doIfNot(consumable, ifTrue, ifFalse) {
        return this.doIf(consumable, ifTrue, ifFalse, true);
    }
    /**
     * Hide this element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
     */
    hideIf(consumable, invert = false) {
        const handleHide = (value) => {
            const correctedValue = invert ? !value : !!value;
            this._meta.isHidden = correctedValue;
            if (!this.parent)
                return;
            if (!correctedValue)
                this.show();
            else
                this.hide();
        };
        consumable.changed(handleHide);
        handleHide(consumable.value);
        return this;
    }
    /** Hide this element when the consumer is falsy. Updates whenever the consumable changes. */
    hideIfNot(consumable) {
        return this.hideIf(consumable, true);
    }
    /**
     * Adds classes to the element when the consumer is truthy. Updates whenever the consumable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
     */
    classIf(consumable, classes, invert = false) {
        return this.doIf(consumable, () => this.addClass(...val(classes, this)), () => this.rmClass(...val(classes, this)), invert);
    }
    /**
     * Adds classes to the element when the consumer is falsy. Updates whenever the consumable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * For the oposite you can also use {@link classIf}
     */
    classIfNot(consumable, classes) {
        return this.classIf(consumable, classes, true);
    }
    /**
     * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
     */
    textIf(consumable, text, elseText = '', invert = false) {
        return this.doIf(consumable, () => this.text(val(text, this)), () => this.text(val(elseText, this)), invert);
    }
    /**
     * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the consumable changes.
     */
    textIfNot(consumable, text, elseText = '') {
        return this.textIf(consumable, text, elseText, true);
    }
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the consumable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf(consumable, attr, value = '', invert = false) {
        return this.doIf(consumable, () => this.addAttr(attr, val(value, this)), () => this.rmAttr(attr), invert);
    }
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the consumable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed
     */
    attrIfNot(consumable, attr, value = '') {
        return this.attrIf(consumable, attr, value, true);
    }
    /**
     * Disable this element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf(consumable, invert = false) {
        return this.attrIf(consumable, 'disabled', '', invert);
    }
    /** Disable this element when the consumer is falsy. Updates whenever the consumable changes. */
    disableIfNot(consumable) {
        return this.disableIf(consumable, true);
    }
    /**
     * Add style to the element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
     * {value} can be a string or a function that returns a string.
     */
    styleIf(consumable, style, value = '', invert = false) {
        return this.doIf(consumable, () => this.addStyle(style, val(value, this)), () => this.rmStyle(style), invert);
    }
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the consumable changes.
     * {value} can be a string or a function that returns a string.
     */
    styleIfNot(consumable, style, value = '') {
        return this.styleIf(consumable, style, value, true);
    }
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the consumable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf(consumable, styles, invert = false) {
        return this.doIf(consumable, () => this.setStyle(val(styles, this)), () => this.rmStyle(...Object.keys(styles)), invert);
    }
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the consumable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot(consumable, styles) {
        return this.stylesIf(consumable, styles, true);
    }
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen(tag, evt, consumer) {
        return tag.on(evt, (other, evt) => consumer(this, other, evt));
    }
    /**
     * If {newText} is provided, it sets the `textContent` of the element.
     * If {newText} is provided, and a state is provided. It will use the {newText} as a template,
     * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
     *
     * If no argument is provided, it returns the `textContent` of the element
     */
    text(newText, st) {
        if (newText == null) {
            return this.element.textContent;
        }
        if (st && newText) {
            return this.setChildren([text(newText, st)]);
        }
        this.element.textContent = newText;
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
        this.element.className = className;
        return this;
    }
    /** Remove classes from class list */
    rmClass(...classes) {
        for (let key of classes) {
            this.classList.remove(key);
        }
        return this;
    }
    /** Check if classes are present in this element */
    hasClass(...classes) {
        for (let key of classes) {
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
        return this.hasClass(targetClass)
            ? this.rmClass(targetClass)
            : this.addClass(targetClass);
    }
    /** Add a single style */
    addStyle(property, value) {
        this.element.style[property] = value;
        return this;
    }
    /** Set multiple styles at once */
    setStyle(styles) {
        for (let key in styles) {
            this.addStyle(key, styles[key]);
        }
        return this;
    }
    /** Remove styles */
    rmStyle(...styleNames) {
        for (let key of styleNames) {
            this.style.removeProperty(key);
        }
        return this;
    }
    /** Check if this element has styles */
    hasStyle(...styles) {
        for (let key of styles) {
            if (!this.style.getPropertyValue(camelToDash(key))) {
                return false;
            }
        }
        return true;
    }
    /** Adds a set of attributes to the element */
    setAttrs(attrs) {
        for (let key in attrs) {
            this.addAttr(key, attrs[key]);
        }
        return this;
    }
    /** Adds a single attribute to the element */
    addAttr(key, value = '') {
        this.element.attributes[key] = value;
        this.element.setAttribute(key, value);
        return this;
    }
    /** Remove attributes from the element */
    rmAttr(...attrs) {
        for (let key of attrs) {
            this.element.removeAttribute(key);
            delete this.element.attributes[key];
        }
        return this;
    }
    /** Check if this element has attributes */
    hasAttr(...attr) {
        for (let key of attr) {
            if (!(key in this.element.attributes)) {
                return false;
            }
        }
        return true;
    }
    /** Get an attributes value */
    getAttr(attr) {
        return this.element.attributes[attr];
    }
    /**
     * Returns a {@link Consumable} that fires when the Event {@param evtName} is fired in this element
     *
     * The return value of {@link fn} will be passed to the listeners of the {@link Consumable}
     */
    when(evtName, fn) {
        const cons = createConsumable({});
        this.on(evtName, (t, evt) => cons.dispatch(fn(t, evt)));
        return cons;
    }
    /** Add an event listener for a particular event */
    on(evtName, fn) {
        if (fn)
            this.element.addEventListener(evtName, (evt) => fn(this, evt));
        return this;
    }
    /** Add an event listener for a particular event that will only fire once */
    once(evtName, fn) {
        const listener = (evt) => {
            fn(this, evt);
            this.element.removeEventListener(evtName, listener);
        };
        this.element.addEventListener(evtName, listener);
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
                if (evt.code == key || evt.key == key) {
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
    /** Remove element from the DOM */
    remove() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.element.remove();
            return this;
        });
    }
    /**
     * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
     */
    clear() {
        this.element.value = '';
        // Trigger input event, so clearing is treated as input!
        this.element.dispatchEvent(new InputEvent('input'));
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
        const element = this.element.querySelector(selector);
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
    _setChildrenParent(item) {
        if (item instanceof CTag)
            item.parent = this;
        return item;
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
        if (isConsumable(cl)) {
            return text('$val', { val: cl });
        }
        if (cl instanceof CTag)
            return cl.element;
        if (cl instanceof Node)
            return cl;
        return null;
    }
    _getChildren(element) {
        if (!this._observer) {
            this._observer = new MutationObserver(() => {
                this._cacheChildren(element);
            });
            this._observer.observe(this.element, { childList: true });
            this._cacheChildren(element);
        }
    }
    _cacheChildren(element) {
        let nodes = element.childNodes, children = [], i = nodes.length;
        while (i--) {
            if (nodes[i].nodeType == 1) {
                children.unshift(nodes[i]);
            }
        }
        this._cachedChildren = children;
    }
    _mapChildren(children) {
        return children
            .map(this._setChildrenParent.bind(this))
            .filter(this._childrenFilterPredicate.bind(this))
            .map(this._getElementForChild);
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
export function tag(arg0, children = [], attach = false) {
    return new CTag(arg0, children, attach);
}
/**
 * Will call {onStart} when the element is added to the DOM.
 * And will call {onRemove} when the element is removed from the DOM.
 */
export function onLifecycle(tag, onStart, onRemove, beforeRemove) {
    var _a, _b;
    let observingParent = false;
    if (beforeRemove) {
        const tempElRemove = tag.element.remove;
        tag.element.remove = () => __awaiter(this, void 0, void 0, function* () {
            const result = beforeRemove(tag);
            if (!result || (result instanceof Promise && (yield result))) {
                tempElRemove.call(tag.element);
            }
            return result;
        });
    }
    if (onStart) {
        const tempOnStart = tag.show;
        tag.show = () => __awaiter(this, void 0, void 0, function* () {
            const result = tempOnStart.call(tag);
            if (result instanceof Promise) {
                return yield result;
            }
            return result;
        });
    }
    const observer = new MutationObserver((mutations, observer) => __awaiter(this, void 0, void 0, function* () {
        let hasBeenAdded = false, hasBeenRemoved = false;
        for (let mut of mutations) {
            if (onStart && Array.from(mut.addedNodes).includes(tag.element)) {
                hasBeenAdded = true;
            }
            if (onRemove && Array.from(mut.removedNodes).includes(tag.element)) {
                hasBeenRemoved = true;
            }
        }
        if (hasBeenAdded && onStart) {
            const result = onStart(tag);
            if (result instanceof Promise) {
                yield result;
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
            onRemove(tag);
        }
    }));
    observer.observe((_b = (_a = tag.parent) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : document.body, {
        childList: true,
        subtree: true,
    });
    return observer;
}
/**
 * Will call {handler.onStart} when the element is added to the DOM.
 * And will call {handler.onRemove} when the element is removed from the DOM.
 */
export const withLifecycle = (tag, handler) => {
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
export function attach(tag) {
    if (context.attached) {
        context.stack.push(context.attached);
    }
    context.attached = tag;
    return tag;
}
/**
 * Detach the currently attached tag ({@link attach}). If there was another attached tag before it will become the currently attached tag.
 * If there are no previous attached tags, it will clear the attached tag.
 */
export function detach() {
    if (context.stack.length > 0) {
        context.attached = context.stack.pop();
    }
    else {
        context.attached = null;
    }
}
/**
 * Detaches all attached tags. There will be no attached tag after calling this function.
 */
export function detachAll() {
    context.attached = null;
    context.stack = [];
}
/**
 * It makes the body the attached tag ({@link attach}).
 * You can pass in a selector for an element you want to be the default attached tag.
 */
export function init(options = { root: 'body' }) {
    const root = new CTag(`(${options.root})`);
    attach(root);
    return root;
}
/** Override any tag function we want, to give it some custom behaviour, process the children, etc... */
const interceptors = {
    ul: (children, attach = false) => {
        return tag('ul', children.map((cl) => {
            return tag('li', [cl], attach);
        }));
    },
    style: (styles, attach = false) => {
        return tag('style', [context.css.genCss(styles)], attach);
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
            if (interceptors[tagName]) {
                return interceptors[tagName](children, false);
            }
            return tag(tagName, children);
        };
        Object.defineProperty(fn, 'attach', {
            get: () => {
                return (...children) => {
                    if (interceptors[tagName]) {
                        return interceptors[tagName](children, true);
                    }
                    return tag(tagName, children, true);
                };
            },
        });
        return fn;
    },
});

import { CssGenerator } from './css-generator.js';
import { camelToDash } from './util.js';
import { text } from './text.js';
let context = {
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
    get children() {
        return this._getElementChildren(this.element);
    }
    get value() {
        return this.element.value;
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
    setValue(newValue) {
        this.element.value = newValue;
        return this;
    }
    constructor(arg0, children = [], attachable = false) {
        /** Reference to the parent @type {CTag} of this element */
        this.parent = null;
        /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
        this._children = [];
        /** If set to true, it be appended to the attached tag */
        this.attachable = false;
        this.meta = {
            isHidden: false,
            nextSiblingID: null,
        };
        this.attachable = attachable;
        const isSelector = typeof arg0 == 'string' && arg0.match(/\(.+\)/);
        if (isSelector) {
            this.attachable = false;
            this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
        }
        else if (typeof arg0 == 'string') {
            this.element = document.createElement(arg0);
        }
        else if (arg0 instanceof HTMLElement) {
            this.attachable = false;
            this.element = arg0;
        }
        else {
            throw new Error('Invalid argument 0');
        }
        if (context.attachedTag && this.attachable) {
            context.attachedTag.append(this);
        }
        if (children.length > 0)
            this.setChildren(children);
    }
    /** Sets the children, removes previous children  */
    setChildren(children) {
        this.element.replaceChildren(...children
            .filter(this._childrenFilterPredicate.bind(this))
            .map(this._getElementForChild));
        this._children = children;
        return this;
    }
    append(...children) {
        this.element.append(...children
            .filter(this._childrenFilterPredicate.bind(this))
            .map(this._getElementForChild));
        this._children.push(...children);
        return this;
    }
    prepend(...children) {
        this.element.prepend(...children
            .filter(this._childrenFilterPredicate.bind(this))
            .map(this._getElementForChild));
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
        callback(consumable);
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
            this.meta.isHidden = correctedValue;
            if (!this.parent)
                return;
            if (!correctedValue)
                this.show();
            else
                this.hide();
        };
        consumable.changed(handleHide);
        handleHide(consumable);
        return this;
    }
    /** Hide this element when the consumer is falsy. Updates whenever the consumable changes. */
    hideIfNot(consumable) {
        return this.hideIf(consumable, true);
    }
    /**
     * Adds classes to the element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
     */
    classIf(consumable, classes, invert = false) {
        return this.doIf(consumable, () => this.addClass(...classes), () => this.rmClass(...classes), invert);
    }
    /** Adds classes to the element when the consumer is falsy. Updates whenever the consumable changes. */
    classIfNot(consumable, classes) {
        return this.classIf(consumable, classes, true);
    }
    /**
     * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
     * Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
     */
    textIf(consumable, text, elseText = '', invert = false) {
        return this.doIf(consumable, () => this.text(text), () => this.text(elseText), invert);
    }
    /**
     * Adds classes to the element when the consumer is falsy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed
     */
    textIfNot(consumable, text, elseText = '') {
        return this.textIf(consumable, text, elseText, true);
    }
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf(consumable, attr, value = '', invert = false) {
        return this.doIf(consumable, () => this.addAttr(attr, value), () => this.rmAttr(attr), invert);
    }
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the consumable changes.
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
     */
    styleIf(consumable, style, value = '', invert = false) {
        return this.doIf(consumable, () => this.addStyle(style, value), () => this.rmStyle(style), invert);
    }
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the consumable changes.
     */
    styleIfNot(consumable, style, value = '') {
        return this.styleIf(consumable, style, value, true);
    }
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf(consumable, styles, invert = false) {
        return this.doIf(consumable, () => this.setStyle(styles), () => this.rmStyle(...Object.keys(styles)), invert);
    }
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the consumable changes.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot(consumable, styles) {
        return this.stylesIf(consumable, styles, true);
    }
    listen(tag, evt, consumer) {
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
     * Configure the element in a single call by passing @param {TagConfig} config
     * instead of having to call a method for each property you want to changes
     */
    config(config) {
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
    addClass(...classNames) {
        this.element.classList.add(...classNames);
        return this;
    }
    /** Set the elements class name */
    className(className) {
        this.element.className = className;
        return this;
    }
    /** Remove classes from class list */
    rmClass(...classNames) {
        for (let key of classNames) {
            this.element.classList.remove(key);
        }
        return this;
    }
    /** Check if classes are present in this element */
    hasClass(...classNames) {
        for (let key of classNames) {
            if (!this.element.classList.contains(key)) {
                return false;
            }
        }
        return true;
    }
    /** Replace a class with another */
    replaceClass(targetClass, replaceClass) {
        this.element.classList.replace(targetClass, replaceClass);
        return this;
    }
    /** Toggle a class. If it's present it's removed, if it's not present its added. */
    toggleClass(targetClass) {
        if (this.hasClass(targetClass)) {
            this.rmClass(targetClass);
        }
        else {
            this.addClass(targetClass);
        }
        return this;
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
            this.element.style.removeProperty(key);
        }
        return this;
    }
    /** Check if this element has styles */
    hasStyle(...styles) {
        for (let key of styles) {
            if (!this.element.style.getPropertyValue(camelToDash(key))) {
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
    addAttr(key, value) {
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
        return {
            changed: (listener) => {
                this.on(evtName, () => {
                    listener(fn(this));
                });
            },
        };
    }
    /** Add an event listener for a particular event */
    on(evtName, fn) {
        if (fn) {
            this.element.addEventListener(evtName, (evt) => {
                return fn(this, evt);
            });
        }
        return this;
    }
    /** Add an event listener for a particular event that will only fire once */
    once(evtName, fn) {
        if (fn) {
            const listener = (evt) => {
                fn(this, evt);
                this.element.removeEventListener(evtName, listener);
            };
            this.element.addEventListener(evtName, listener);
        }
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
        this.element.remove();
        return this;
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
    setDisabled(disabled) {
        if (disabled) {
            this.addAttr('disabled', 'disabled');
        }
        else {
            this.rmAttr('disabled');
        }
    }
    /** Query a child in this element (in the DOM) */
    q(selector) {
        const element = this.element.querySelector(selector);
        if (element) {
            return new CTag(element);
        }
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
    _childrenFilterPredicate(item, index, items) {
        if (item instanceof CTag)
            item.parent = this;
        if (item instanceof CTag && item.meta.isHidden) {
            return false;
        }
        return true;
    }
    _getElementForChild(cl) {
        if (typeof cl === 'string')
            return document.createTextNode(cl);
        if (cl instanceof CTag)
            return cl.element;
        if (cl instanceof Node)
            return cl;
        return null;
    }
    _getElementChildren(element) {
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
export function tag(arg0, children = [], attach = false) {
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
export function attach(tag) {
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
    }
    else {
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
//# sourceMappingURL=tag.js.map
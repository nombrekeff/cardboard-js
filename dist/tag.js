import { CssGenerator } from './css-generator.js';
export let context = {
    attachedTag: null,
    attachedTagStack: [],
    css: new CssGenerator(),
};
/** Returns the currently attached {CTag}*/
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
        return getElementChildren(this.element);
    }
    get value() {
        return this.element.value;
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
        if (typeof arg0 == 'string' && isSelector(arg0)) {
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
        this.element.replaceChildren(...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild));
        this._children = children;
    }
    append(...children) {
        this.element.append(...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild));
        this._children.push(...children);
        return this;
    }
    prepend(...children) {
        this.element.prepend(...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild));
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
     * When the consumable changes, it will call {ifTrue} if the consumable is true. Or {ifFalse} if the consumable is false.
     */
    doIf(consumable, ifTrue, ifFalse) {
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
        return this.doIf(consumable, ifFalse, ifTrue);
    }
    /**
     * If the element is currently hidden it will add this element to the page
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
    /** Hide this element if the consumer is truthy */
    hideIf(consumable) {
        const handleHide = (value) => {
            this.meta.isHidden = !value;
            if (!this.parent)
                return;
            if (!value)
                this.show();
            else
                this.hide();
        };
        consumable.changed(handleHide);
        this.meta.isHidden = !!consumable;
        return this;
    }
    /** Hide this element if the consumer is falsy */
    hideIfNot(consumable) {
        const handleShow = (value) => {
            this.meta.isHidden = !value;
            if (!this.parent)
                return;
            if (value)
                this.show();
            else
                this.hide();
        };
        consumable.changed(handleShow);
        this.meta.isHidden = !consumable;
        return this;
    }
    /** Adds classes to the element if the consumer is truthy */
    classIf(consumable, ...classes) {
        return this.doIf(consumable, () => this.addClass(...classes), () => this.rmClass(...classes));
    }
    /** Adds classes to the element if the consumer is truthy */
    classIfNot(consumable, ...classes) {
        return this.doIfNot(consumable, () => this.addClass(...classes), () => this.rmClass(...classes));
    }
    /** Add attribute to the element if the consumer is truthy */
    attrIf(consumable, attr, value = '') {
        return this.doIf(consumable, () => this.addAttr(attr, value), () => this.rmAttr(attr));
    }
    /** Add attribute to the element if the consumer is truthy */
    attrIfNot(consumable, attr, value = '') {
        return this.doIfNot(consumable, () => this.addAttr(attr, value), () => this.rmAttr(attr));
    }
    /** Disable this element if the consumer is truthy */
    disableIf(consumable) {
        return this.attrIf(consumable, 'disabled');
    }
    /** Disable this element if the consumer is truthy */
    disableIfNot(consumable) {
        return this.attrIfNot(consumable, 'disabled');
    }
    listen(tag, evt, consumer) {
        tag.on(evt, (other, evt) => consumer(this, other, evt));
        return this;
    }
    /** Set the `textContent` of the element */
    text(text) {
        this.element.textContent = text;
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
            if (!this.element.style.getPropertyValue(key)) {
                return false;
            }
        }
        return true;
    }
    setAttrs(attrs) {
        for (let key in attrs) {
            this.addAttr(key, attrs[key]);
        }
        return this;
    }
    addAttr(key, value) {
        this.element.attributes[key] = value;
        this.element.setAttribute(key, value);
        return this;
    }
    rmAttr(...attrs) {
        for (let key of attrs) {
            this.element.removeAttribute(key);
            delete this.element.attributes[key];
        }
        return this;
    }
    hasAttr(...attr) {
        for (let key of attr) {
            if (!(key in this.element.attributes)) {
                return false;
            }
        }
        return true;
    }
    getAttr(attr) {
        return this.element.attributes[attr];
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
    /** Clear the `value` */
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
}
export function tag(arg0, children = [], attach = false) {
    return new CTag(arg0, children, attach);
}
export function attach(tag) {
    if (context.attachedTag) {
        context.attachedTagStack.push(context.attachedTag);
    }
    context.attachedTag = tag;
}
export function detach() {
    if (context.attachedTagStack.length > 0) {
        context.attachedTag = context.attachedTagStack.pop();
    }
    else {
        context.attachedTag = null;
    }
}
export function detachAll() {
    context.attachedTag = null;
    context.attachedTagStack = [];
}
export function init(options = { root: 'body' }) {
    const root = new CTag(`(${options.root})`);
    attach(root);
    return root;
}
export function getElementIndex(node) {
    var index = 0;
    while ((node = node.previousElementSibling)) {
        index++;
    }
    return index;
}
export function isSelector(str) {
    return str.match(/\(.+\)/);
}
export function getElementForChild(cl) {
    if (typeof cl === 'string')
        return document.createTextNode(cl);
    if (cl instanceof CTag)
        return cl.element;
    if (cl instanceof HTMLElement)
        return cl;
    return null;
}
export function getElementChildren(element) {
    var childNodes = element.childNodes, children = [], i = childNodes.length;
    while (i--) {
        if (childNodes[i].nodeType == 1) {
            children.unshift(childNodes[i]);
        }
    }
    return children;
}
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
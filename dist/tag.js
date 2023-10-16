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
import { callOrReturn, camelToDash } from './util.js';
import { text } from './text.js';
let context = {
    attachedTag: null,
    attachedTagStack: [],
    css: new CssGenerator(),
};
export function attached() {
    return context.attachedTag;
}
export class CTag {
    get parent() {
        return this._parent;
    }
    set parent(newParent) {
        this._parent = newParent;
    }
    get children() {
        this._getElementChildren(this.element);
        return this._cachedChildren;
    }
    get value() {
        return this.element.value;
    }
    get style() {
        return this.element.style;
    }
    setValue(newValue) {
        this.element.value = newValue;
        return this;
    }
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
        this._parent = null;
        this._children = [];
        this._cachedChildren = [];
        this._attachable = false;
        this._meta = {
            isHidden: false,
            nextSiblingID: null,
        };
        this._attachable = attachable;
        const isSelector = typeof arg0 == 'string' && arg0.match(/\(.+\)/);
        if (isSelector) {
            this._attachable = false;
            this.element = document.querySelector(arg0.match(/\((.+)\)/)[1]);
        }
        else if (typeof arg0 == 'string') {
            this.element = document.createElement(arg0);
        }
        else if (arg0 instanceof HTMLElement) {
            this._attachable = false;
            this.element = arg0;
        }
        else {
            throw new Error('Invalid argument 0');
        }
        if (context.attachedTag && this._attachable) {
            context.attachedTag.append(this);
        }
        if (children.length > 0)
            this.setChildren(children);
    }
    setChildren(children) {
        this.element.replaceChildren(...children
            .map(this._setChildrenParent.bind(this))
            .filter(this._childrenFilterPredicate.bind(this))
            .map(this._getElementForChild));
        this._children = children;
        return this;
    }
    append(...children) {
        this.element.append(...children
            .map(this._setChildrenParent.bind(this))
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
    consume(consumable, consumer) {
        consumable.changed((newValue) => consumer(this, newValue));
        consumer(this, consumable);
        return this;
    }
    show() {
        if (!this.parent.children.includes(this.element)) {
            const expectedIndex = this.parent._children.indexOf(this);
            if (expectedIndex == 0) {
                this.parent.element.prepend(this.element);
            }
            else if (expectedIndex == this.parent._children.length - 1) {
                this.parent.element.append(this.element);
            }
            else {
                let hiddenBefore = 0;
                for (let i = expectedIndex - 1; i >= 0; i--) {
                    const child = this.parent._children[i];
                    if (child instanceof CTag) {
                        if (child._meta.isHidden) {
                            hiddenBefore++;
                        }
                    }
                }
                const nextEl = this.parent.element.childNodes[expectedIndex - hiddenBefore];
                this.parent.element.insertBefore(this.element, nextEl);
            }
        }
        this._meta.isHidden = false;
        return true;
    }
    hide() {
        if (this.parent.children.includes(this.element)) {
            this.remove();
            this._meta.isHidden = true;
        }
    }
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
    doIfNot(consumable, ifTrue, ifFalse) {
        return this.doIf(consumable, ifTrue, ifFalse, true);
    }
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
        handleHide(consumable);
        return this;
    }
    hideIfNot(consumable) {
        return this.hideIf(consumable, true);
    }
    classIf(consumable, classes, invert = false) {
        return this.doIf(consumable, () => this.addClass(...callOrReturn(classes, this)), () => this.rmClass(...callOrReturn(classes, this)), invert);
    }
    classIfNot(consumable, classes) {
        return this.classIf(consumable, classes, true);
    }
    textIf(consumable, text, elseText = '', invert = false) {
        return this.doIf(consumable, () => this.text(callOrReturn(text, this)), () => this.text(callOrReturn(elseText, this)), invert);
    }
    textIfNot(consumable, text, elseText = '') {
        return this.textIf(consumable, text, elseText, true);
    }
    attrIf(consumable, attr, value = '', invert = false) {
        return this.doIf(consumable, () => this.addAttr(attr, callOrReturn(value, this)), () => this.rmAttr(attr), invert);
    }
    attrIfNot(consumable, attr, value = '') {
        return this.attrIf(consumable, attr, value, true);
    }
    disableIf(consumable, invert = false) {
        return this.attrIf(consumable, 'disabled', '', invert);
    }
    disableIfNot(consumable) {
        return this.disableIf(consumable, true);
    }
    styleIf(consumable, style, value = '', invert = false) {
        return this.doIf(consumable, () => this.addStyle(style, callOrReturn(value, this)), () => this.rmStyle(style), invert);
    }
    styleIfNot(consumable, style, value = '') {
        return this.styleIf(consumable, style, value, true);
    }
    stylesIf(consumable, styles, invert = false) {
        return this.doIf(consumable, () => this.setStyle(callOrReturn(styles, this)), () => this.rmStyle(...Object.keys(styles)), invert);
    }
    stylesIfNot(consumable, styles) {
        return this.stylesIf(consumable, styles, true);
    }
    listen(tag, evt, consumer) {
        tag.on(evt, (other, evt) => consumer(this, other, evt));
        return this;
    }
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
    addClass(...classNames) {
        this.element.classList.add(...classNames);
        return this;
    }
    className(className) {
        this.element.className = className;
        return this;
    }
    rmClass(...classNames) {
        for (let key of classNames) {
            this.element.classList.remove(key);
        }
        return this;
    }
    hasClass(...classNames) {
        for (let key of classNames) {
            if (!this.element.classList.contains(key)) {
                return false;
            }
        }
        return true;
    }
    replaceClass(targetClass, replaceClass) {
        this.element.classList.replace(targetClass, replaceClass);
        return this;
    }
    toggleClass(targetClass) {
        if (this.hasClass(targetClass)) {
            this.rmClass(targetClass);
        }
        else {
            this.addClass(targetClass);
        }
        return this;
    }
    addStyle(property, value) {
        this.element.style[property] = value;
        return this;
    }
    setStyle(styles) {
        for (let key in styles) {
            this.addStyle(key, styles[key]);
        }
        return this;
    }
    rmStyle(...styleNames) {
        for (let key of styleNames) {
            this.element.style.removeProperty(key);
        }
        return this;
    }
    hasStyle(...styles) {
        for (let key of styles) {
            if (!this.element.style.getPropertyValue(camelToDash(key))) {
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
    when(evtName, fn) {
        return {
            changed: (listener) => {
                this.on(evtName, () => {
                    listener(fn(this));
                });
            },
        };
    }
    on(evtName, fn) {
        if (fn) {
            this.element.addEventListener(evtName, (evt) => {
                return fn(this, evt);
            });
        }
        return this;
    }
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
    clicked(fn) {
        return this.on('click', fn);
    }
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
    changed(fn) {
        return this.on('change', fn);
    }
    submited(fn) {
        return this.on('submit', fn);
    }
    remove() {
        this.element.remove();
        return this;
    }
    clear() {
        this.element.value = '';
        this.element.dispatchEvent(new InputEvent('input'));
        return this;
    }
    disable() {
        this.setDisabled(true);
        this.addAttr('disabled', 'disabled');
        return this;
    }
    enable() {
        this.setDisabled(false);
        return this;
    }
    setDisabled(disabled) {
        if (disabled) {
            this.addAttr('disabled', 'disabled');
        }
        else {
            this.rmAttr('disabled');
        }
    }
    q(selector) {
        const element = this.element.querySelector(selector);
        if (element) {
            return new CTag(element);
        }
    }
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
        if (cl instanceof CTag)
            return cl.element;
        if (cl instanceof Node)
            return cl;
        return null;
    }
    _getElementChildren(element) {
        if (!this._mutationObserver) {
            this._mutationObserver = new MutationObserver((mutations, observer) => {
                this._setCachedChildren(element);
            });
            this._mutationObserver.observe(this.element, { childList: true });
            this._setCachedChildren(element);
        }
    }
    _setCachedChildren(element) {
        let childNodes = element.childNodes;
        let children = [];
        let i = childNodes.length;
        while (i--) {
            if (childNodes[i].nodeType == 1) {
                children.unshift(childNodes[i]);
            }
        }
        this._cachedChildren = children;
    }
}
export function tag(arg0, children = [], attach = false) {
    return new CTag(arg0, children, attach);
}
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
        });
    }
    const observer = new MutationObserver((mutations, observer) => {
        let hasBeenAdded = false;
        let hasBeenRemoved = false;
        for (let mut of mutations) {
            if (onStart && Array.from(mut.addedNodes).includes(tag.element)) {
                hasBeenAdded = true;
            }
            if (onRemove && Array.from(mut.removedNodes).includes(tag.element)) {
                hasBeenRemoved = true;
            }
        }
        if (hasBeenAdded && onStart) {
            onStart(tag, observer);
            if (!observingParent) {
                observer.disconnect();
                observer.observe(tag.element.parentElement, { childList: true });
                observingParent = true;
            }
        }
        if (hasBeenRemoved && onRemove) {
            onRemove(tag, observer);
        }
    });
    observer.observe((_b = (_a = tag.parent) === null || _a === void 0 ? void 0 : _a.element) !== null && _b !== void 0 ? _b : document.body, { childList: true });
    return observer;
}
export const withLifecycle = (tag, handler) => {
    onLifecycle(tag, handler.start, handler.removed, handler.beforeRemove);
    return tag;
};
export function attach(tag) {
    if (context.attachedTag) {
        context.attachedTagStack.push(context.attachedTag);
    }
    context.attachedTag = tag;
    return tag;
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
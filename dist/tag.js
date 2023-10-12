import { CssGenerator } from './css-generator.js';
import { getElementIndex } from './util.js';
export let context = {
    attachedTag: null,
    attachedTagStack: [],
    css: new CssGenerator(),
};
export function attached() {
    return context.attachedTag;
}
function isSelector(str) {
    return str.match(/\(.+\)/);
}
function getElementForChild(cl) {
    if (typeof cl === 'string')
        return document.createTextNode(cl);
    if (cl instanceof CTag)
        return cl.element;
    if (cl instanceof HTMLElement)
        return cl;
    return null;
}
function getElementChildren(element) {
    var childNodes = element.childNodes, children = [], i = childNodes.length;
    while (i--) {
        if (childNodes[i].nodeType == 1) {
            children.unshift(childNodes[i]);
        }
    }
    return children;
}
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
        this.parent = null;
        /** If set to true, it be appended to the attached tag */
        this.attachable = false;
        this.meta = {
            ignoreRender: false,
            childIndex: 0,
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
        this.set(children);
        if (context.attachedTag && this.attachable) {
            context.attachedTag.add(this);
        }
    }
    set(children) {
        this.element.replaceChildren(...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild));
    }
    add(...children) {
        this.element.append(...children.filter(this._childrenFilterPredicate.bind(this)).map(getElementForChild));
        return this;
    }
    /** Whenever the consumable changes, it will call the consumer */
    consume(consumable, consumer) {
        consumable.changed((newValue) => consumer(this, newValue));
        consumer(this, consumable);
        return this;
    }
    /** Show this element if the consumer is truthy */
    showIf(consumable) {
        const handleShow = (value) => {
            this.meta.ignoreRender = !value;
            if (!this.parent)
                return;
            if (value) {
                this.parent.element.insertBefore(this.element, this.parent.element.children[this.meta.childIndex]);
            }
            else {
                this.meta.childIndex = getElementIndex(this.element);
                this.remove();
            }
        };
        consumable.changed(handleShow);
        this.meta.ignoreRender = !consumable;
        return this;
    }
    /** Hide this element if the consumer is truthy */
    hideIf(consumable) {
        const handleHide = (value) => {
            this.meta.ignoreRender = !value;
            if (!this.parent)
                return;
            if (!value) {
                this.parent.element.insertBefore(this.element, this.parent.element.children[this.meta.childIndex]);
            }
            else {
                this.meta.childIndex = getElementIndex(this.element);
                this.remove();
            }
        };
        consumable.changed(handleHide);
        this.meta.ignoreRender = !!consumable;
        return this;
    }
    /** Disable this element if the consumer is truthy */
    disableIf(consumable) {
        consumable.changed((value) => this.setDisabled(value));
        this.setDisabled(consumable);
        return this;
    }
    doIf(consumable, callback) {
        consumable.changed(callback);
        callback(consumable);
        return this;
    }
    /** Enable this element if the consumer is truthy */
    enableIf(consumable) {
        consumable.changed((value) => this.setDisabled(!value));
        this.setDisabled(!consumable);
        return this;
    }
    listen(tag, evt, consumer) {
        tag.on(evt, (other, evt) => consumer(this, other, evt));
        return this;
    }
    text(text) {
        this.element.textContent = text;
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
            this.add(...config.children);
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
        // Trigger input event, so clearing is treated as input!
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
    find(test) {
        const actualChildren = [...this.children];
        for (const child of actualChildren) {
            if (test(child))
                return tag(child);
        }
        return null;
    }
    _childrenFilterPredicate(item, index) {
        if (item instanceof CTag)
            item.parent = this;
        if (item instanceof CTag && item.meta.ignoreRender) {
            item.meta.childIndex = index;
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
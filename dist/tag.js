import { CssGenerator } from './css-generator.js';
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
        if (this.element instanceof HTMLInputElement)
            return this.element.value;
        return;
    }
    set value(newValue) {
        if (this.element instanceof HTMLInputElement)
            this.element.value = newValue;
        return;
    }
    constructor(arg0, children = [], attachable = false) {
        this.parent = null;
        /** If set to true, it be appended to the attached tag */
        this.attachable = false;
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
        children.map((cl) => {
            this.add(cl);
        });
        if (context.attachedTag && this.attachable) {
            context.attachedTag.add(this);
        }
    }
    set(children) {
        this.element.replaceChildren(...children.map((cl) => getElementForChild(cl)));
    }
    add(...children) {
        this.element.append(...children.map((cl) => {
            if (cl instanceof CTag)
                cl.parent = this;
            return getElementForChild(cl);
        }));
        return this;
    }
    consume(consumable, consumer) {
        consumable.changed((newValue) => consumer(this, newValue));
        consumer(this, consumable);
        return this;
    }
    listen(tag, evt, consumer) {
        tag.on(evt, (other, evt) => consumer(this, other, evt));
        return this;
    }
    text(text) {
        this.element.innerText = text;
        return this;
    }
    config(config) {
        if (config.attr) {
            this.addAttrs(config.attr);
        }
        if (config.classList) {
            this.addClass(...config.classList);
        }
        if (config.style) {
            this.addStyle(config.style);
        }
        if (config.text) {
            this.text(config.text);
        }
        if (config.value) {
            this.value = config.value;
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
        for (let key in classNames) {
            this.element.classList.remove(key);
        }
        return this;
    }
    replaceClass(targetClass, replaceClass) {
        this.element.classList.replace(targetClass, replaceClass);
        return this;
    }
    setStyle(property, value) {
        this.element.style[property] = value;
        return this;
    }
    addStyle(styles) {
        for (let key in styles) {
            this.element.style[key] = styles[key];
        }
        return this;
    }
    rmStyle(...styleNames) {
        for (let key of styleNames) {
            this.element.style.removeProperty(key);
        }
        return this;
    }
    addAttrs(attrs) {
        for (let key in attrs) {
            this.element.setAttribute(key, attrs[key]);
        }
        return this;
    }
    setAttr(key, value) {
        this.element.setAttribute(key, value);
        return this;
    }
    rmAttr(...attrs) {
        for (let key of attrs) {
            this.element.removeAttribute(key);
        }
        return this;
    }
    on(evtName, fn) {
        if (fn) {
            this.element.addEventListener(evtName, (evt) => {
                return fn(this, evt);
            });
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
        if (this.element instanceof HTMLInputElement || this.element instanceof HTMLTextAreaElement) {
            this.element.value = '';
            // Trigger input event, so clearing is treated as input!
            this.element.dispatchEvent(new InputEvent('input'));
        }
        return this;
    }
    disable() {
        this.setAttr('disabled', 'disabled');
        return this;
    }
    enable() {
        this.rmAttr('disabled');
        return this;
    }
    q(selector) {
        return new CTag(this.element.querySelector(selector));
    }
    find(test) {
        const actualChildren = [...this.children];
        for (const child of actualChildren) {
            if (test(child))
                return child;
        }
        return null;
    }
    static find(selector) {
        return new CTag(document.querySelector(selector));
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
export function init(options = { root: 'body' }) {
    attach(new CTag(`(${options.root})`));
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
import { CTag } from './tag';
/** Receives a function, and returns just the body of the function as a string */
export function justFnBody(fn) {
    let fnStr = fn.toString();
    fnStr = fnStr.replace(/^(.*{)/, '');
    fnStr = fnStr.replace(/}$/, '');
    fnStr = fnStr.replace(/^\(.*\)\s?=>\s?{/, '');
    return fnStr.trim();
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
export const replaceDoubleQuotes = (str) => str.replace(/"/g, "'");
export const generateId = () => `_hb${s4() + s4()}`;
export const camelToDash = (str) => str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
export const dashToCamel = (str) => str.replace(/(\-[a-z])/g, (val) => val.toUpperCase().replace('-', ''));
export function isObject(obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
}
const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//# sourceMappingURL=util.js.map
/** Removes an item from an array if it exists. It returns whether it was removed or not */
export function removeFromList(item, list) {
    if (!list)
        return false;
    const index = list.indexOf(item);
    if (index !== -1) {
        list.splice(index, 1);
        return true;
    }
    return false;
}
export const camelToDash = (str) => str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
export function isObject(obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
}
export function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
export const toJson = (possiblyJsonString) => JSON.parse(possiblyJsonString);
export const fromJson = (possiblyJson) => JSON.stringify(possiblyJson);
export const val = (val, ...args) => {
    if (typeof val === 'function') {
        return val(...args);
    }
    return val;
};
//# sourceMappingURL=util.js.map
/** Removes an item from an array if it exists. It returns the same array without the item */
export function removeFromList(item, list) {
    const index = list.indexOf(item);
    if (index !== -1) {
        list.splice(index, 1);
    }
    return list;
}
export const camelToDash = (str) => str.replace(/([A-Z])/g, (val) => `-${val.toLowerCase()}`);
export const dashToCamel = (str) => str.replace(/(\-[a-z])/g, (val) => val.toUpperCase().replace('-', ''));
export function isObject(obj) {
    return typeof obj === 'object' && !(obj instanceof Array);
}
export const toJson = (possiblyJsonString) => JSON.parse(possiblyJsonString);
export const fromJson = (possiblyJson) => JSON.stringify(possiblyJson);
export const callOrReturn = (val, ...args) => {
    if (typeof val === 'function') {
        return val(...args);
    }
    return val;
};
//# sourceMappingURL=util.js.map
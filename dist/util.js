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
export const camelToDash = str => str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);
export const dashToCamel = str => str.replace(/(-[a-z])/g, val => val.toUpperCase().replace('-', ''));
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
export const swapItems = (array, from, to) => {
    const temp = array[from];
    array[from] = array[to];
    array[to] = temp;
    return array;
};
export function arraysEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
export function isNumeric(str) {
    if (typeof str !== 'string')
        return false; // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)); // ...and ensure strings of whitespace fail
}
//# sourceMappingURL=util.js.map
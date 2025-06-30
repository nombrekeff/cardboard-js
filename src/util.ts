/** Removes an item from an array if it exists. It returns whether it was removed or not */
export const removeFromList = <T>(item: T, list?: T[]) => {
  if (!list) return false;

  const index = list.indexOf(item);

  if (index !== -1) {
    list.splice(index, 1);
    return true;
  }

  return false;
};

export const camelToDash = str => str.replace(/([A-Z])/g, val => `-${val.toLowerCase()}`);

export const isObject = (obj: any): boolean => {
  return typeof obj === 'object' && !(obj instanceof Array);
};
export const isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};
export const val = <T>(val: T | ((...args: any) => T), ...args): T => {
  if (typeof val === 'function') {
    return (val as any)(...args);
  }
  return val;
};
export const swapItems = (array: any[], from: number, to: number) => {
  const temp = array[from];
  array[from] = array[to];
  array[to] = temp;
  return array;
};
export const arraysEqual = (a?: any[], b?: any[]) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};

/* eslint-disable  */
/* istanbul ignore next */
export const deepEquals = (a, b) => {
  if (a === b) return true;
  if (a && b && a.length !== b.length) return false;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    if (a.constructor !== b.constructor) return false;

    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!deepEquals(a[i], b[i])) return false;
      return true;
    }



    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) return false;

    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      var key = keys[i];

      if (!deepEquals(a[key], b[key])) return false;
    }

    return true;
  }

  // true if both NaN, false otherwise
  return a !== a && b !== b;
}

/**
 * Generates a unique ID for a Cardboard tag.
 * If an `idNumber` is provided, it will return a string in the format `c_<idNumber>`.
 * If no `idNumber` is provided, it will generate a random UUID in the format `c_xxxxxxxxxx`.
 * 
 * @returns A unique ID string for a Cardboard tag.
 */
export function generateUID(idNumber?: number): string {
  if (!idNumber) return uuidv4();
  return `c_${idNumber}`;
}

export function uuidv4() {
  return "c_1000000010".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
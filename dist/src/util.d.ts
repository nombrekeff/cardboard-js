/** Removes an item from an array if it exists. It returns whether it was removed or not */
export declare const removeFromList: <T>(item: T, list?: T[] | undefined) => boolean;
export declare const camelToDash: (str: any) => any;
export declare const isObject: (obj: any) => boolean;
export declare const isArray: (obj: any) => boolean;
export declare const val: <T>(val: T | ((...args: any) => T), ...args: any[]) => T;
export declare const swapItems: (array: any[], from: number, to: number) => any[];
export declare const arraysEqual: (a?: any[], b?: any[]) => boolean;
export declare const deepEquals: (a: any, b: any) => boolean;

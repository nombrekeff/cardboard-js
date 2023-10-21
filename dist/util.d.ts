/** Removes an item from an array if it exists. It returns whether it was removed or not */
export declare function removeFromList<T>(item: T, list: T[]): boolean;
export declare const camelToDash: (str: any) => any;
export declare function isObject(obj: any): boolean;
export declare function isArray(obj: any): boolean;
export declare const toJson: (possiblyJsonString: any) => any;
export declare const fromJson: (possiblyJson: any) => string;
export declare const val: <T>(val: T | ((...args: any) => T), ...args: any[]) => T;

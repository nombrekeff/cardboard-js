/** Removes an item from an array if it exists. It returns the same array without the item */
export declare function removeFromList<T>(item: T, list: T[]): T[];
export declare const camelToDash: (str: any) => any;
export declare const dashToCamel: (str: any) => any;
export declare function isObject(obj: any): boolean;
export declare const toJson: (possiblyJsonString: any) => any;
export declare const fromJson: (possiblyJson: any) => string;
export declare const callOrReturn: <T>(val: T | ((...args: any) => T), ...args: any[]) => T;
//# sourceMappingURL=util.d.ts.map
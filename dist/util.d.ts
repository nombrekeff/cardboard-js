/** Receives a function, and returns just the body of the function as a string */
export declare function justFnBody(fn: Function): string;
/** Removes an item from an array if it exists. It returns the same array without the item */
export declare function removeFromList<T>(item: T, list: T[]): T[];
export declare const replaceDoubleQuotes: (str: string) => string;
export declare const generateId: () => string;
export declare const camelToDash: (str: any) => any;
export declare const dashToCamel: (str: any) => any;
export declare function isObject(obj: any): boolean;
export declare const toJson: (possiblyJsonString: any) => any;
export declare const fromJson: (possiblyJson: any) => string;

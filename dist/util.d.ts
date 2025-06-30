/** Removes an item from an array if it exists. It returns whether it was removed or not */
export declare const removeFromList: <T>(item: T, list?: T[] | undefined) => boolean;
export declare const camelToDash: (str: any) => any;
export declare const isObject: (obj: any) => boolean;
export declare const isArray: (obj: any) => boolean;
export declare const val: <T>(val: T | ((...args: any) => T), ...args: any[]) => T;
export declare const swapItems: (array: any[], from: number, to: number) => any[];
export declare const arraysEqual: (a?: any[], b?: any[]) => boolean;
export declare const deepEquals: (a: any, b: any) => boolean;
/**
 * Generates a unique ID for a Cardboard tag.
 * If an `idNumber` is provided, it will return a string in the format `c_<idNumber>`.
 * If no `idNumber` is provided, it will generate a random UUID in the format `c_xxxxxxxxxx`.
 *
 * @returns A unique ID string for a Cardboard tag.
 */
export declare function generateUID(idNumber?: number): string;
export declare function uuidv4(): string;

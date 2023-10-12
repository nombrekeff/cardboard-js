import { TagChild } from './types';
/** Receives a function, and returns just the body of the function as a string */
export declare function justFnBody(fn: Function): string;
export declare function getElementIndex(node: Element): number;
export declare function isSelector(str: string): RegExpMatchArray;
export declare function getElementForChild(cl: TagChild): Node;
export declare function getElementChildren(element: HTMLElement): Node[];
export declare const replaceDoubleQuotes: (str: string) => string;
export declare const generateId: () => string;
export declare const camelToDash: (str: any) => any;
export declare const dashToCamel: (str: any) => any;
export declare function isObject(obj: any): boolean;

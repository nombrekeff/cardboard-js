import type { NestedStyleMap } from './types';
export declare const genCss: (styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>) => string;
export declare const genBlock: (selector: string, style: NestedStyleMap) => string;
export declare const genBlockContent: (selector: string, style: NestedStyleMap) => string[];
export declare const genStyle: (name: string, value: string) => string;

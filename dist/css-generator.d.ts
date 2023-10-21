import type { NestedStyleMap } from './types';
export declare function genCss(styleSheet: {
    [key: string]: NestedStyleMap;
} | {
    [key: string]: NestedStyleMap;
}[]): string;
export declare function genBlock(selector: string, style: NestedStyleMap): string;
export declare function genBlockContent(selector: string, style: NestedStyleMap): string[];
export declare function genStyle(name: string, value: string): string;

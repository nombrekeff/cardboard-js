import type { NestedStyleMap } from './types.js';
export declare class CssGenerator {
    genCss(styleSheet: {
        [key: string]: NestedStyleMap;
    } | {
        [key: string]: NestedStyleMap;
    }[]): string;
    genBlock(selector: string, style: NestedStyleMap): string;
    genBlockContent(selector: string, style: NestedStyleMap): string[];
    genStyle(name: string, value: string): string;
}

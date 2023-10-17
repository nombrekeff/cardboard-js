import type { NestedStyleMap } from './types.js';
export declare class CssGenerator {
    generateCss(styleSheet: {
        [key: string]: NestedStyleMap;
    } | {
        [key: string]: NestedStyleMap;
    }[]): string;
    generateBlock(selector: string, style: NestedStyleMap): string;
    generateBlockContent(selector: string, style: NestedStyleMap): string[];
    generateStyle(name: string, value: string): string;
}

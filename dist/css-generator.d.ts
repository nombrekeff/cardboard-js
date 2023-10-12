import { NestedStyleMap } from './types.js';
export declare class CssGenerator {
    generateCss(styleSheet: {
        [key: string]: NestedStyleMap;
    } | {
        [key: string]: NestedStyleMap;
    }[]): string;
    generateBlock(selector: string, style: NestedStyleMap): any;
    joinSelectors(left: string, right: string): string;
    generateBlockContent(selector: string, style: NestedStyleMap): string[];
    generateStyle(name: string, value: string): string;
}

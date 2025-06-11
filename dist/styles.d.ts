import { CTag } from "./tag.js";
import { NestedStyleMap } from "./types.js";
declare class StyleManager {
    styleTag: CTag;
    rules: Set<string>;
    generatedIdsCount: number;
    constructor();
    add(styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>): void;
}
export declare const styleManager: StyleManager;
export {};

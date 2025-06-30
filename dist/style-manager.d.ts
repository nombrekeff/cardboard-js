import { CTag } from "./tag.js";
import { NestedStyleMap } from "./types.js";
export declare class StyleManager {
    styleTag: CTag;
    rules: Set<string>;
    generatedIdsCount: number;
    constructor();
    add(styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>): void;
}

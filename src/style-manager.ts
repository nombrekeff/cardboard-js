import { genCss } from "./css-generator.js";
import { tag, CTag } from "./tag.js";
import { NestedStyleMap } from "./types.js";

const STYLE_TAG_ID = 'cardboard-styles';

export class StyleManager {
    styleTag: CTag;
    rules: Set<string>;

    generatedIdsCount: number = 0;

    constructor() {
        this.rules = new Set();
        let styleTag: CTag | null = null;

        try {
            styleTag = tag(`(#${STYLE_TAG_ID})`);
        } catch (error) {
            styleTag = tag('style').setId(STYLE_TAG_ID);
        }

        tag('(head)').append(styleTag);

        this.styleTag = styleTag;
    }

    public add(styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>) {
        const css = genCss(styleSheet);

        if (!this.rules.has(css)) {
            this.rules.add(css);
            this.styleTag.append(css);
        }
    }
}

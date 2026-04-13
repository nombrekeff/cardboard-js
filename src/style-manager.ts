import { genCss } from "./css-generator.js";
import { tag, CTag } from "./tag.js";
import { NestedStyleMap } from "./types.js";

const STYLE_TAG_ID = 'cardboard-styles';

export class StyleManager {
    private _styleTag?: CTag;
    rules: Set<string> = new Set();

    // Lazy load the style tag ONLY when needed
    private get styleTag(): CTag {
        if (!this._styleTag) {
            try {
                this._styleTag = tag(`(#${STYLE_TAG_ID})`);
            } catch (error) {
                this._styleTag = tag('style').setId(STYLE_TAG_ID);
                // Safe appending: Ensure document.head exists before appending
                if (document.head) {
                    tag(document.head).append(this._styleTag);
                } else {
                    console.warn("Cardboard-JS: document.head not found. Styles may not apply correctly.");
                }
            }
        }
        return this._styleTag;
    }

    public add(styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>) {
        const css = genCss(styleSheet);

        if (!this.rules.has(css)) {
            this.rules.add(css);
            // Uses the getter, creating and mounting the tag just-in-time
            this.styleTag.append(css); 
        }
    }
}
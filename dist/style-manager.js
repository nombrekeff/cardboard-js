import { genCss } from "./css-generator.js";
import { tag } from "./tag.js";
const STYLE_TAG_ID = 'cardboard-styles';
export class StyleManager {
    constructor() {
        this.generatedIdsCount = 0;
        this.rules = new Set();
        let styleTag = null;
        try {
            styleTag = tag(`(#${STYLE_TAG_ID})`);
        }
        catch (error) {
            styleTag = tag('style').setId(STYLE_TAG_ID);
        }
        tag('(head)').append(styleTag);
        this.styleTag = styleTag;
    }
    add(styleSheet) {
        const css = genCss(styleSheet);
        if (!this.rules.has(css)) {
            this.rules.add(css);
            this.styleTag.append(css);
        }
    }
}
//# sourceMappingURL=style-manager.js.map
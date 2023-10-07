import { camelToDash, isObject } from './util.js';
export class CssGenerator {
    generateCss(styleSheet) {
        let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
        let generatedCss = '';
        for (const sheet of stylesheets) {
            for (const key in sheet) {
                generatedCss += this.generateBlock(key, sheet[key]);
            }
        }
        return generatedCss;
    }
    generateBlock(selector, style) {
        let blocks = this.generateBlockContent(selector, style);
        return blocks.join('\n');
    }
    joinSelectors(left, right) {
        if (right.startsWith(':'))
            return left + right;
        return left + ' ' + right;
    }
    generateBlockContent(selector, style) {
        let inside = '';
        let blocks = [];
        for (const key in style) {
            if (isObject(style[key])) {
                blocks.push(this.generateBlockContent(this.joinSelectors(selector, key), style[key]));
            }
            else if (style[key]) {
                inside += this.generateStyle(key, style[key]);
            }
        }
        blocks.push(`${selector}{${inside}}`);
        return blocks;
    }
    generateStyle(name, value) {
        return `${camelToDash(name)}:${value};`;
    }
}
//# sourceMappingURL=css-generator.js.map
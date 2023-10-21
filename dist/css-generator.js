import { camelToDash, isObject } from './util.js';
export class CssGenerator {
    genCss(styleSheet) {
        let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
        let generatedCss = '';
        for (const sheet of stylesheets) {
            for (const key in sheet) {
                generatedCss += this.genBlock(key, sheet[key]);
            }
        }
        return generatedCss;
    }
    genBlock(selector, style) {
        let blocks = this.genBlockContent(selector, style);
        return blocks.join('');
    }
    genBlockContent(selector, style) {
        let inside = '';
        let blocks = [];
        for (const key in style) {
            if (isObject(style[key])) {
                blocks.push(this.genBlockContent(selector + key, style[key]));
            }
            else if (style[key]) {
                inside += this.genStyle(key, style[key]);
            }
        }
        blocks.unshift(`${selector}{${inside}}`);
        return blocks;
    }
    genStyle(name, value) {
        return `${camelToDash(name)}:${value};`;
    }
}

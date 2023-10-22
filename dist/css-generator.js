import { camelToDash, isObject } from './util.js';
export function genCss(styleSheet) {
    let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
    let generatedCss = '';
    for (const sheet of stylesheets) {
        for (const key in sheet) {
            generatedCss += genBlock(key, sheet[key]);
        }
    }
    return generatedCss;
}
export function genBlock(selector, style) {
    let blocks = genBlockContent(selector, style);
    return blocks.join('');
}
export function genBlockContent(selector, style) {
    let inside = '';
    let blocks = [];
    for (const key in style) {
        if (isObject(style[key])) {
            blocks.push(genBlockContent(selector + key, style[key]));
        }
        else if (style[key]) {
            inside += genStyle(key, style[key]);
        }
    }
    blocks.unshift(`${selector}{${inside}}`);
    return blocks;
}
export function genStyle(name, value) {
    return `${camelToDash(name)}:${value};`;
}

import { NestedStyleMap } from './types.js';
import { camelToDash, isObject } from './util.js';

export class CssGenerator {
  generateCss(styleSheet: { [key: string]: NestedStyleMap } | { [key: string]: NestedStyleMap }[]) {
    let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
    let generatedCss = '';

    for (const sheet of stylesheets) {
      for (const key in sheet) {
        generatedCss += this.generateBlock(key, sheet[key]);
      }
    }
    return generatedCss;
  }

  generateBlock(selector: string, style: NestedStyleMap) {
    let blocks = this.generateBlockContent(selector, style);
    return blocks.join('');
  }

  generateBlockContent(selector: string, style: NestedStyleMap): string[] {
    let inside = '';
    let blocks = [];

    for (const key in style) {
      if (isObject(style[key])) {
        blocks.push(this.generateBlockContent(selector + key, style[key]));
      } 
      else if (style[key]) {
        inside += this.generateStyle(key, style[key] as string);
      }
    }

    blocks.unshift(`${selector}{${inside}}`);

    return blocks;
  }

  generateStyle(name: string, value: string) {
    return `${camelToDash(name)}:${value};`;
  }
}

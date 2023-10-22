import type { NestedStyleMap } from './types';
import { camelToDash, isObject } from './util.js';

export function genCss(
  styleSheet:
    | { [key: string]: NestedStyleMap }
    | { [key: string]: NestedStyleMap }[],
) {
  let stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
  let generatedCss = '';

  for (const sheet of stylesheets) {
    for (const key in sheet) {
      generatedCss += genBlock(key, sheet[key]);
    }
  }
  return generatedCss;
}

export function genBlock(selector: string, style: NestedStyleMap) {
  let blocks = genBlockContent(selector, style);
  return blocks.join('');
}

export function genBlockContent(
  selector: string,
  style: NestedStyleMap,
): string[] {
  let inside = '';
  let blocks = [];

  for (const key in style) {
    if (isObject(style[key])) {
      blocks.push(genBlockContent(selector + key, style[key]));
    } else if (style[key]) {
      inside += genStyle(key, style[key] as string);
    }
  }

  blocks.unshift(`${selector}{${inside}}`);

  return blocks;
}

export function genStyle(name: string, value: string) {
  return `${camelToDash(name)}:${value};`;
}

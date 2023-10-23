import type { NestedStyleMap } from './types';
import { camelToDash, isObject } from './util.js';

export function genCss(
  styleSheet:
    | Record<string, NestedStyleMap>
    | Array<Record<string, NestedStyleMap>>,
) {
  const stylesheets = styleSheet instanceof Array ? styleSheet : [styleSheet];
  let generatedCss = '';

  for (const sheet of stylesheets) {
    for (const key in sheet) {
      generatedCss += genBlock(key, sheet[key]);
    }
  }
  return generatedCss;
}

export function genBlock(selector: string, style: NestedStyleMap): string {
  const blocks = genBlockContent(selector, style);
  return blocks.join('');
}

export function genBlockContent(
  selector: string,
  style: NestedStyleMap,
): string[] {
  let inside = '';
  const blocks: string[] = [];

  for (const key in style) {
    if (isObject(style[key])) {
      blocks.push(...genBlockContent(selector + key, style[key] as any));
    }
    else if (style[key]) {
      inside += genStyle(key, style[key] as string);
    }
  }

  blocks.unshift(`${selector}{${inside}}`);

  return blocks;
}

export function genStyle(name: string, value: string): string {
  return `${camelToDash(name)}:${value};`;
}

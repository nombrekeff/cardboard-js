import { genCss } from "./css-generator.js";
import { CTag, tag } from "./tag.js";
import type { AllTags, StyleSet, TagBuilder, TagChildren } from "./types.js";


/** Override any tag function we want, to give it some custom behaviour, process the children, etc... */
const interceptors: Record<string, TagBuilder | ((styles: StyleSet[]) => CTag)> = {
  ul: (children: TagChildren, mountToParent: boolean = false) => {
    return tag(
      'ul',
      children.map((cl) => {
        return tag('li', [cl], mountToParent);
      }),
    );
  },
  style: (styles: StyleSet[], mountToParent: boolean = false) => {
    return tag('style', [genCss(styles)], mountToParent);
  },
};

/**
 * List of all HTML tag functions. From `div` to `abbr` :)
 * If you want to create any other tag, use the {@link tag} function.
 *
 * @type {AllTags}
 * @example
 * ```ts
 * const { div, p, abbr, img, style, ... } = allTags;
 * ```
 */
export const allTags: AllTags = new Proxy(
  {},
  {
    get: (t, p, r) => {
      const tagName = p.toString();
      const fn = (...children: any[]) => {
        return interceptors[tagName] ? interceptors[tagName](children, false) : tag(tagName, children);
      };

      Object.defineProperty(fn, 'mount', {
        get: () => {
          return (...children: any[]) => {
            return interceptors[tagName] ? interceptors[tagName](children, true) : tag(tagName, children, true);
          };
        },
      });

      return fn;
    },
  },
) as AllTags;

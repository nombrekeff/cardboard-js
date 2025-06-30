import { genCss } from "./css-generator.js";
import { tag } from "./tag.js";
/** Override any tag function we want, to give it some custom behaviour, process the children, etc... */
const interceptors = {
    ul: (children, mountToParent = false) => {
        return tag('ul', children.map((cl) => {
            return tag('li', [cl], mountToParent);
        }));
    },
    style: (styles, mountToParent = false) => {
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
export const allTags = new Proxy({}, {
    get: (t, p, r) => {
        const tagName = p.toString();
        const fn = (...children) => {
            return interceptors[tagName] ? interceptors[tagName](children, false) : tag(tagName, children);
        };
        Object.defineProperty(fn, 'mount', {
            get: () => {
                return (...children) => {
                    return interceptors[tagName] ? interceptors[tagName](children, true) : tag(tagName, children, true);
                };
            },
        });
        return fn;
    },
});
//# sourceMappingURL=all-tags.js.map
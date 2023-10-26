import { isConsumable } from './consumables.js';
import { isObject } from './util.js';
/**
 * Create a **TextNode** from text, and optionally reacts to a {@link State}, interpolating the defined variables in the text each time the state changes.
 *
 * If you provide a {@link State} as the second argument, the text will act as a template
 * and can reference properties in the state: `$count`, `$someValue`.
 *
 * When the state properties changes, the text node will be automatically updated with the new text.
 * Only the properties that are referenced in the template will be listened to.
 *
 * **NOTE** If you're not interpolating, and dont need to change the text, you can directly pass in a string ('string') instead of (`text('string')`).
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
 *
 * @example
 * ```ts
 * const st = state({ count: 0 });
 *
 * p(text('Raw text!'));
 * p(text(`Count: $count`, st));
 * ```
 */
export const text = (textTemplate, obj) => {
    const node = document.createTextNode('');
    const interpolatePattern = /\B\$([0-9]+|[a-z][a-z0-9_$]*)/gi;
    const updateNode = (data) => {
        node.nodeValue = !data
            ? textTemplate
            : textTemplate.replace(interpolatePattern, (m, g1) => { var _a; return ((_a = data[g1]) !== null && _a !== void 0 ? _a : m).toString(); });
    };
    if (!obj) {
        node.nodeValue = textTemplate;
    }
    else if (isConsumable(obj)) {
        obj.changed((val) => updateNode(val));
        updateNode(obj.value);
    }
    else if (isObject(obj)) {
        for (const key of Object.getOwnPropertyNames(obj)) {
            // We're just interested in listening to the obj that are references in the text.
            if (textTemplate.includes(`$${key}`) && isConsumable(obj[key])) {
                obj[key].changed(() => updateNode(obj));
            }
        }
        updateNode(obj);
    }
    return node;
};
//# sourceMappingURL=text.js.map
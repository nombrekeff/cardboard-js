import { isObject } from './util.js';
/**
 * Create a **TextNode** from a template that reacts to some state change.
 * If you provide a {@link State} the template must reference the property name: `$count`, `$someValue`
 * When the state property changes, the text node will be automatically updated with the new template
 *
 * @example
 * ```ts
 * const st = state({ count: 0 });
 * p(template(`Count: $count`, st));
 * ```
 */
export function template(template, values) {
    const node = document.createTextNode('');
    const interpolatePattern = /(\$([a-z][a-z0-9_$]*))/gi;
    const updateNode = () => {
        node.nodeValue = template.replace(interpolatePattern, (_, p1, p2) => {
            console.log({ p1, p2, values });
            return values[p2] != null ? values[p2].toString() : p1;
        });
    };
    if (isObject(values)) {
        for (let key in values) {
            const item = values[key];
            item.changed(() => {
                updateNode();
            });
        }
    }
    updateNode();
    return node;
}
//# sourceMappingURL=template.js.map
import { Consumable, State } from './types.js';
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
export function template<T>(template: string, values: State<T>) {
  const node = document.createTextNode('');
  const interpolatePattern = /\B\$([a-z][a-z0-9_$]*)/gi;

  const updateNode = () => {
    node.nodeValue = template.replace(interpolatePattern, (match, g1) => {
      return values[g1] != null ? values[g1].toString() : match;
    });
  };

  if (isObject(values)) {
    for (let key in values) {
      // We're just interested in listening to the values that are references in the template.
      if (template.includes(`$${key}`)) {
        const item = values[key];
        item.changed(() => {
          updateNode();
        });
      }
    }
  }

  updateNode();
  return node;
}

import { Consumable, State } from './types.js';
import { isObject } from './util.js';

/**
 * Create a **TextNode** from a template that reacts to some state change.
 * You can pass in a list of {@link Consumable}s or a {@link State} instance.
 *
 * If you provide a list of {@link Consumable} the template must reference the index: `$0`, `$1`
 * If you provide a {@link State} the template must reference the property name: `$count`, `$someValue`
 *
 * When the state or consumable changes, the text node will be automatically updated with the new template
 *
 * @example
 * ```ts
 * const st = state({ count: 0 });
 * p(template(`Count: $0`, [st.count]));
 * p(template(`Count: $count`, st));
 * ```
 */
export function template<T>(template: string, values: Consumable<any>[] | State<T>) {
  const node = document.createTextNode('');
  const interpolatePattern = /(\$([0-9]+|[a-z][a-z0-9_$]*))/i;

  const updateNode = () => {
    node.nodeValue = template.replace(interpolatePattern, (_, p1, p2) => (values[p2] ? values[p2].toString() : p1));
  };

  if (values instanceof Array) {
    for (let i = 0; i < values.length; i++) {
      const item = values[i];
      item.changed((newVal) => {
        values[i] = newVal;
        updateNode();
      });
    }
  }

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

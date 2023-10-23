import { isConsumable } from './consumables.js';

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
export function text(textTemplate: string, values?: Record<string, any>): Node {
  const node = document.createTextNode('');
  const interpolatePattern = /\B\$([0-9]+|[a-z][a-z0-9_$]*)/gi;

  const updateNode = () => {
    node.nodeValue = !values
      ? textTemplate
      : textTemplate.replace(interpolatePattern, (m, g1) =>
        values[g1] ?? m,
      );
  };

  if (values) {
    for (const key of Object.getOwnPropertyNames(values)) {
      // We're just interested in listening to the values that are references in the text.
      if (textTemplate.includes(`$${key}`) && isConsumable(values[key])) {
        values[key].changed(updateNode);
      }
    }
  }

  updateNode();
  return node;
}

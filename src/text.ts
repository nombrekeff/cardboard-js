import type { IObservable, Primitive, TextObj } from './types.js';
import { isObservable } from './observables.js';
import { isObject } from './util.js';

/**
 * Create a **TextNode** from text, and optionally reacts to a {@link IObservable}, interpolating the defined variables in the text each time the state changes.
 *
 * If you provide a {@link IObservable} as the second argument, the text will act as a template
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
export const text = <T extends Record<string, Primitive>, K extends TextObj>(textTemplate: string, obj?: IObservable<T> | K): Node => {
  const node = document.createTextNode(''),
    interpolatePattern = /\B\$([0-9]+|[a-z][a-z0-9_$]*)/gi;

  if (!obj) {
    node.nodeValue = textTemplate;
    return node;
  }

  const updateNode = (data: Record<string, Primitive>) => {
    node.nodeValue = !data
      ? textTemplate
      : textTemplate.replace(interpolatePattern, (m, g1) =>
        (data[g1] ?? m).toString(),
      );
  };

  if (isObservable(obj)) {
    (obj as IObservable<Record<string, any>>).changed((val) => updateNode(val));
    updateNode((obj as IObservable).value);
  }
  else if (isObject(obj)) {
    for (const key of Object.getOwnPropertyNames(obj)) {
      // We're just interested in listening to the obj that are references in the text.
      if (textTemplate.includes(`$${key}`) && isObservable(obj[key])) {
        obj[key].changed(() => updateNode(obj as any));
      }
    }

    updateNode(obj as any);
  }

  return node;
};

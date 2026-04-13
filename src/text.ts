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

  type InterpolationData = Record<string, Primitive | IObservable<Primitive>>;

  if (!obj) {
    node.nodeValue = textTemplate;
    return node;
  }

  const updateNode = (data: InterpolationData | undefined) => {
    node.nodeValue = !data
      ? textTemplate
      : textTemplate.replace(interpolatePattern, (m, g1) =>
        (data?.[g1] ?? m).toString(),
      );
  };

  if (isObservable(obj)) {
    const observableObj = obj as IObservable<T>;
    observableObj.changed((val) => updateNode(val));
    updateNode(observableObj.value);
  }
  else if (isObject(obj)) {
    const textObj = obj as TextObj;

    for (const key of Object.getOwnPropertyNames(textObj)) {
      // We're just interested in listening to the obj that are references in the text.
      if (textTemplate.includes(`$${key}`) && isObservable(textObj[key])) {
        textObj[key].changed(() => updateNode(textObj));
      }
    }

    updateNode(textObj);
  }

  return node;
};

import type { IObservable, Primitive, TextObj } from './types.js';
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
export declare const text: <T extends Record<string, Primitive>, K extends TextObj>(textTemplate: string, obj?: K | IObservable<T> | undefined) => Node;

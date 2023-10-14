import { State } from './types.js';
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
export declare function template<T>(template: string, values: State<T>): Text;

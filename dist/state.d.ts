import type { State } from './types';
/**
 * `state` creates a reactive object that can the be used with tags to create dinamic and reactive apps.
 * {@link content} can be an `object` or an `array`. Objects can be nested, and evey property will be reactive.
 * In arrays, length will also be reactive.
 *
 * You can pass an optional {@link fn}, that will be called anything in the state changes.
 *
 * Additionally you can listen to it after creating it: `state().changed(() => { })`
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/State
 *
 * @example
 * ```ts
 * const st = state({ count: 0 });
 * st.changed(() => { ... });
 * st.count.changed(() => { ... });
 *
 * st.count++;
 * st.count = 3;
 *
 * div().hideIf(st.count);
 * div().disableIf(st.count);
 * div(template('Count is: $count', st));
 * ```
 */
export declare function state<T extends object>(content: T, fn?: (newValue: T) => void): State<T>;

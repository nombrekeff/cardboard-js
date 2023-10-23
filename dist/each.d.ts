import { type Consumable } from './consumables.js';
import type { CTag } from './tag.js';
import type { State } from './types.js';
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export declare function each<T>(consumable: State<T[]> | Consumable<T[]>, consumer: (val: T) => CTag): Node;
export declare function eachSlow<T>(consumable: State<T[]> | Consumable<T[]>, consumer: (val: T) => CTag): Node;

import type { CTag } from './tag.js';
import type { IConsumable, State } from './types.js';
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export declare function each<T>(consumable: IConsumable<T[]>, consumer: (val: T) => CTag): Node;
export declare function eachSlow<T>(consumable: State<T[]> | IConsumable<T[]>, consumer: (val: T) => CTag): Node;

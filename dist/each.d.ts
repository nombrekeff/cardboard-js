import type { CTag } from './tag.js';
import { IConsumable } from './types.js';
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export declare function each<T>(consumable: IConsumable<T[]>, consumer: (val: T) => CTag): Node;

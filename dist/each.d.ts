import type { CTag } from './tag.js';
import type { IConsumableOr } from './types.js';
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export declare function each<T>(consumable: IConsumableOr<T[]>, consumer: (val: T) => CTag): Node;

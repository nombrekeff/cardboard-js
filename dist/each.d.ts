import type { CTag } from './tag.js';
import type { IConsumableOr } from './types.js';
export declare enum DiffState {
    unchanged = "unchanged",
    added = "added",
    removed = "removed",
    swap = "swap"
}
export interface DiffEntry<T = unknown> {
    state: DiffState;
    index: number;
    entry: T;
    targetEntry?: T;
    targetIndex?: number;
}
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export declare function each<T>(consumable: IConsumableOr<T[]>, consumer: (val: T) => CTag, key?: (val: T) => any): Node;
export declare function eachOld<T>(consumable: IConsumableOr<T[]>, consumer: (val: T) => CTag, key?: (val: T) => any): Node;
export declare function diffList<T>(newData: T[], oldData: T[], key?: (item: T) => any): Array<DiffEntry<T>>;

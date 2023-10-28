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
 * Render a {@link CTag} for each item in the provided list.
 *
 * `each` can work with a goold old array, or with a {@link IConsumable}.
 * If you provide a `Consumable`, the list will update whenever the `Consumable` changes.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * Static list
 * ```ts
 * const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
 * div(
 *     each(colors, (color) =>
 *        button(color).addStyle('color', color)
 *     )
 * );
 * ```
 *
 * @example
 * Dynamic list
 * ```ts
 *  const colors = state(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
 *  const selectedColor = state('red');
 *  div(
 *    each(colors, (color) =>
 *        button(color)
 *         .addStyle('color', color)
 *         .stylesIf(equalTo(selectedColor, color), { fontWeight: 'bold' });
 *    )
 *  );
 * ```
 */
export declare function each<T>(consumable: IConsumableOr<T[]>, consumer: (val: T) => CTag, key?: (val: T) => any): Node;
/**
 * Compares 2 lists, returns an array of {@link DiffEntry} with the operations needed to make in the {@link oldData} to create the new list.
 * It only returns the actions that are needed, if an element does not need to move, then it's not returned
 */
export declare function diffList<T>(newData: T[], oldData: T[], key?: (item: T) => any): Array<DiffEntry<T>>;

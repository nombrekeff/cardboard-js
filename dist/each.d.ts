import type { CTag } from './tag.js';
import type { IObservableOr } from './types.js';
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
 * `each` can work with a goold old array, or with a {@link IObservable}.
 * If you provide a `Observable`, the list will update whenever the `Observable` changes.
 *
 * @param observable - An array or an {@link IObservable} that contains the list of items to render.
 * @param builder - A function that takes an item from the list and returns a {@link CTag} to render.
 * @param key - An optional function that returns a unique key for each item in the list. This is used to optimize the rendering process.
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
export declare function each<T>(observable: IObservableOr<T[]>, builder: (val: T) => CTag, key?: (val: T) => any): Node;
/**
 * Compares 2 lists, returns an array of {@link DiffEntry} with the operations needed to make in the {@link oldData} to create the new list.
 * It only returns the actions that are needed, if an element does not need to move, then it's not returned
 *
 * @param newData - The new data to compare against the old data.
 * @param oldData - The old data to compare against the new data.
 * @param key - A function that returns a unique key for each item in the list. This is used to optimize the rendering process.
 */
export declare function diffList<T>(newData: T[], oldData: T[], key?: (item: T) => any): Array<DiffEntry<T>>;

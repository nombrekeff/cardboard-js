import type { IConsumable } from './types';
/**
 * `state` creates a reactive value that can the be used with tags to create dinamic and reactive apps.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/State
 *
 * @example
 * ```ts
 * const count = state(0);
 * count.changed(() => { ... });
 * count.dispatch(2);
 * count.value++;
 *
 * div().hideIf(count);
 * div().disableIf(count);
 * div(template('Count is: $count', { count: count }));
 * ```
 */
export declare const state: <T>(initialValue: T) => IConsumable<T>;
/**
 * `listState` creates a reactive list of values that can be used with tags to manage dynamic and reactive apps.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/ListState
 *
 * @example
 * ```javascript
 * const myList = listState([1, 2, 3]);
 *
 * myList.add(4);
 * myList.addAt(0, 0);
 * myList.remove(2);
 * myList.removeWhere(item => item === 3);
 * const listValues = myList.listValue;
 * const listLength = myList.length;
 *
 * // Listen to changes in the list
 * myList.list.changed(() => {
 *   // List has changed
 * });
 * ```
 */
export declare const listState: <T>(initialData: T[]) => {
    readonly list: IConsumable<IConsumable<T>[]>;
    readonly listValue: IConsumable<T>[];
    add: (item: T) => void;
    addAt: (item: T, index: number) => void;
    remove: any;
    removeWhere: any;
    length: IConsumable<number>;
};
export declare const stateAdd: <T>(cons: IConsumable<T[]>, item: T) => void;
export declare const stateAddAt: <T>(cons: IConsumable<T[]>, item: T, index: number) => void;
export declare const stateRemoveWhere: <T>(cons: IConsumable<T[]>, cb: (item: T, index: number) => boolean) => void;
export declare const stateRemove: <T>(cons: IConsumable<T[]>, item: T) => void;

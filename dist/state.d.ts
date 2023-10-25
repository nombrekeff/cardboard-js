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
export declare function state<T>(initialValue: T): IConsumable<T>;
export declare function listState<T>(initialData: T[]): {
    readonly list: IConsumable<IConsumable<T>[]>;
    add: (item: T, complete?: boolean) => void;
    addAt: (item: T, index: number) => void;
    remove: (item: IConsumable<T>) => void;
    length: IConsumable<number>;
};

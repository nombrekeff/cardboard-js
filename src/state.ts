import { createConsumable, getValue, isConsumable } from './consumables.js';
import type { IConsumable } from './types';
import { deepEquals } from './util.js';

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
export const state = <T>(initialValue: T): IConsumable<T> => {
  return createConsumable(initialValue);
};

export const listState = <T>(initialData: T[]) => {
  const _list = state<Array<IConsumable<T>>>(
    initialData.map((d) => createConsumable(d)),
  );
  const length = _list.intersect((_list) => _list.length);

  const add = (item: T, complete = false) => {
    _list.value = [..._list.value, createConsumable(item)];
  };

  const addAt = (item: T, index: number) => {
    const newData = [..._list.value];
    newData.splice(index, 0, createConsumable(item));
    _list.value = newData;
  };

  const removeWhere = (cb: (item: IConsumable<T>) => boolean) => {
    _list.value = _list.value.filter(cb);
  };

  const remove = (item: IConsumable<T> | T) => {
    removeWhere(val => {
      return !deepEquals(getValue(val), getValue(item));
    });
  };

  return {
    get list() {
      return _list;
    },
    get listValue() {
      return _list.value;
    },
    add,
    addAt,
    remove,
    removeWhere,
    length,
  };
};

import { createConsumable } from './consumables.js';
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
export function state<T>(initialValue: T): IConsumable<T> {
  return createConsumable(initialValue);
}

export function listState<T>(initialData: T[]) {
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

  const remove = (item: IConsumable<T>) => {
    _list.value = _list.value.filter(todo => todo !== item);
  };

  return {
    get list() {
      return _list;
    },
    add,
    addAt,
    remove,
    length,
  };
}

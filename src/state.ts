import type { IConsumable } from './types';
import { createConsumable, getValue } from './consumables.js';

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
export const listState = <T>(initialData: T[]) => {
  const _list = state<Array<IConsumable<T>>>(
    initialData.map((d) => createConsumable(d)),
  );

  const add = (item: T) => {
    stateAdd(_list, createConsumable(item));
  };

  const addAt = (item: T, index: number) => {
    stateAddAt(_list, createConsumable(item), index);
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
    remove: stateRemove.bind({}, _list),
    removeWhere: stateRemoveWhere.bind({}, _list),
    length: _list.intersect((_list) => _list.length),
  };
};

export const stateAdd = <T>(cons: IConsumable<T[]>, item: T) => {
  cons.value = [...cons.value, item];
};

export const stateAddAt = <T>(cons: IConsumable<T[]>, item: T, index: number) => {
  let newData: any = [...cons.value];
  newData.splice(index, 0, item);
  cons.value = newData;
  newData = [];
};

export const stateRemoveWhere = <T>(cons: IConsumable<T[]>, cb: (item: T, index: number) => boolean) => {
  cons.value = cons.value.filter((el, i) => !cb(el, i));
};

export const stateRemove = <T>(cons: IConsumable<T[]>, item: T) => {
  const index = cons.value.findIndex(cons => getValue(cons) === getValue(item));
  stateRemoveWhere(cons, (_, i) => {
    return index === i;
  });
};

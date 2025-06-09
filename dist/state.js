import { createObservable, getValue } from './observables.js';
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
export const state = (initialValue) => {
    return createObservable(initialValue);
};
/**
 * `listState` creates a reactive list of values that can be used with tags to manage dynamic and reactive apps.
 * It wraps each item with a {@link State} (aka. {@link IObservable}) to allow for individual item reactivity.
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
export const listState = (initialData) => {
    const _list = state(initialData.map((d) => createObservable(d)));
    const add = (item) => {
        stateAdd(_list, createObservable(item));
    };
    const addAt = (item, index) => {
        stateAddAt(_list, createObservable(item), index);
    };
    return {
        /**
         * The reactive list of items.
         * Each item is wrapped in a {@link State} to allow for individual reactivity.
         */
        get list() {
            return _list;
        },
        /**
         * The raw list of items.
         */
        get listValue() {
            return _list.value;
        },
        add,
        addAt,
        remove: stateRemove.bind({}, _list),
        removeWhere: stateRemoveWhere.bind({}, _list),
        length: _list.computed((_list) => _list.length),
    };
};
/**
 * `stateAdd` adds an item to a reactive list.
 * It creates a new array with the existing items and the new item, then updates the state.
 *
 * @example
 * ```typescript
 * const myList = state([]);
 * stateAdd(myList, 'new item');
 * ```
 */
export const stateAdd = (state, item) => {
    state.value = [...state.value, item];
};
/**
 * `stateAddAt` adds an item to a reactive list at a specific index.
 * It creates a new array with the existing items and the new item at the specified index, then updates the state.
 *
 * @example
 * ```typescript
 * const myList = state([]);
 * stateAddAt(myList, 'new item', 0);
 * ```
 */
export const stateAddAt = (state, item, index) => {
    let newData = [...state.value];
    newData.splice(index, 0, item);
    state.value = newData;
    newData = [];
};
/**
 * `stateRemoveWhere` removes items from a reactive list based on a callback function.
 * It filters the list and updates the state with the remaining items.
 *
 * @example
 * ```typescript
 * const myList = state([1, 2, 3, 4]);
 * stateRemoveWhere(myList, (item) => item % 2 === 0); // Removes even numbers
 * ```
 */
export const stateRemoveWhere = (state, cb) => {
    state.value = state.value.filter((el, i) => !cb(el, i));
};
/**
 * `stateRemove` removes a specific item from a reactive list.
 * It finds the index of the item in the list and calls `stateRemoveWhere` to remove it.
 *
 * @example
 * ```typescript
 * const myList = state([1, 2, 3, 4]);
 * stateRemove(myList, 2); // Removes the item with value 2
 * ```
 */
export const stateRemove = (state, item) => {
    const index = state.value.findIndex(state => getValue(state) === getValue(item));
    stateRemoveWhere(state, (_, i) => {
        return index === i;
    });
};
//# sourceMappingURL=state.js.map
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
 * It wraps each item with an {@link IObservable}
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
        length: _list.computed((_list) => _list.length),
    };
};
export const stateAdd = (cons, item) => {
    cons.value = [...cons.value, item];
};
export const stateAddAt = (cons, item, index) => {
    let newData = [...cons.value];
    newData.splice(index, 0, item);
    cons.value = newData;
    newData = [];
};
export const stateRemoveWhere = (cons, cb) => {
    cons.value = cons.value.filter((el, i) => !cb(el, i));
};
export const stateRemove = (cons, item) => {
    const index = cons.value.findIndex(cons => getValue(cons) === getValue(item));
    stateRemoveWhere(cons, (_, i) => {
        return index === i;
    });
};
//# sourceMappingURL=state.js.map
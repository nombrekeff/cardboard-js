import { createConsumable } from './consumables.js';
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
export function state(initialValue) {
    return createConsumable(initialValue);
}
export function listState(initialData) {
    const _list = state(initialData.map((d) => createConsumable(d)));
    const length = _list.intersect((_list) => _list.length);
    const add = (item, complete = false) => {
        _list.value = [..._list.value, createConsumable(item)];
    };
    const addAt = (item, index) => {
        const newData = [..._list.value];
        newData.splice(index, 0, createConsumable(item));
        _list.value = newData;
    };
    const remove = (item) => {
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
//# sourceMappingURL=state.js.map
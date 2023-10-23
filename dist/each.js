import { isConsumable } from './consumables.js';
var DiffState;
(function (DiffState) {
    DiffState[DiffState["removed"] = 0] = "removed";
    DiffState[DiffState["added"] = 1] = "added";
    DiffState[DiffState["unchanged"] = 2] = "unchanged";
})(DiffState || (DiffState = {}));
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export function each(consumable, consumer) {
    const node = document.createTextNode('');
    const elements = [];
    let oldData = [];
    const updateList = (newData) => {
        const start = performance.now();
        newData = Array.from(isConsumable(newData) ? newData.value : newData);
        const dataDiff = [];
        if (!oldData.length) {
            for (let oi = 0; oi < oldData.length; oi++) {
                const newEntry = newData[oi];
                const diffEntry = {
                    entry: newEntry,
                    state: DiffState.added,
                };
                dataDiff.push(diffEntry);
            }
        } //
        else {
            for (let oi = 0; oi < oldData.length; oi++) {
                const oldEntry = oldData[oi];
                const newEntry = newData[oi];
                const diffEntry = {
                    entry: newEntry,
                    state: DiffState.unchanged,
                };
                if (newEntry == null) {
                    // Item has been removed
                    diffEntry.state = DiffState.removed;
                }
                else if (newEntry !== oldEntry) {
                    // There is an item, it's different
                    // Update element at position or create new one?
                    diffEntry.state = DiffState.added;
                }
                else {
                    // Same item in same place
                    // Don't do anything
                    diffEntry.state = DiffState.unchanged;
                }
                dataDiff.push(diffEntry);
            }
        }
        console.log(dataDiff);
        oldData = [...newData];
        const diff = performance.now() - start;
        console.log('Each Fast took: ' + diff.toFixed(2) + 'ms');
    };
    setTimeout(() => updateList(consumable), 5);
    consumable.changed(updateList);
    return node;
}
export function eachSlow(consumable, consumer) {
    const node = document.createTextNode('');
    let elements = [];
    const updateList = (newVal) => {
        if (!node.parentElement) {
            setTimeout(() => updateList(consumable), 1);
            return;
        }
        const start = performance.now();
        newVal = Array.from(isConsumable(newVal) ? newVal.value : newVal);
        elements.forEach((el, i) => {
            var _a;
            (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(el.element);
        });
        elements = [];
        newVal.forEach((item, i) => {
            var _a;
            elements[i] = consumer(item);
            (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(elements[i].element, node);
        });
        const diff = performance.now() - start;
        console.log('eachSlow took: ' + diff.toFixed(2) + 'ms');
    };
    consumable.changed(updateList);
    return node;
}
//# sourceMappingURL=each.js.map
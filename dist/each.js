import { isConsumable } from './consumables.js';
import { deepEquals } from './util.js';
var DiffState;
(function (DiffState) {
    DiffState["unchanged"] = "unchanged";
    DiffState["added"] = "added";
    DiffState["removed"] = "removed";
    DiffState["swap"] = "swap";
})(DiffState || (DiffState = {}));
/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export function each(consumable, consumer) {
    const node = document.createTextNode(''), elements = [];
    let oldData = [], nodeParentIndex = 0, children = [], elementsCopy = [];
    const add = (item, index) => {
        var _a;
        if (index >= 0) {
            const el = consumer(item);
            const elAt = elements[index];
            elements.splice(index, 0, el);
            (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(el.el, elAt ? elAt.el : node);
        }
    };
    const move = (from, to) => {
        // if (from >= 0 && to >= 0) {
        // }
    };
    const swap = (from, to) => {
        if (from >= 0 && to >= 0) {
            const elementFrom = elementsCopy[from];
            const elementTo = elementsCopy[to];
            const parentY = elementFrom.el.parentNode;
            const nextY = elementFrom.el.nextSibling;
            // console.log(elements.map((t, i) => (t.text() as any).replace('-', '')).join(', '));
            // console.log('Swaping', (elementFrom.text() as any).replace('-', ''), (elementTo.text() as any).replace('-', ''));
            // console.log('Swaping', (elementFrom.text() as any).replace('-', ''), (elementTo.text() as any).replace('-', ''));
            if (parentY && nextY === elementTo.el) {
                parentY.insertBefore(elementTo.el, elementFrom.el);
            }
            else if (elementTo.el.parentNode) {
                elementTo.el.parentNode.insertBefore(elementFrom.el, elementTo.el);
                if (nextY && parentY) {
                    parentY.insertBefore(elementTo.el, nextY);
                }
                else if (parentY) {
                    parentY.appendChild(elementTo.el);
                }
            }
            const tempCopy = elementsCopy[from];
            elementsCopy[from] = elementsCopy[to];
            elementsCopy[to] = tempCopy;
            const temp = elements[from];
            elements[from] = elements[to];
            elements[to] = temp;
        }
    };
    const remove = (index) => {
        var _a;
        (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(elements[index].el);
        elements.splice(index, 1);
        elementsCopy.splice(index, 1);
    };
    const updateList = (newData) => {
        var _a, _b, _c;
        if (!node.parentElement) {
            setTimeout(() => updateList(newData), 1);
            return;
        }
        const start = performance.now();
        if (newData.length === oldData.length && deepEquals(oldData, newData)) {
            const diff = performance.now() - start;
            console.log('Each Fast skip took: ' + diff.toFixed(2) + 'ms');
            return;
        }
        children = Array.from((_b = (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes) !== null && _b !== void 0 ? _b : []);
        if (!nodeParentIndex)
            nodeParentIndex = children.indexOf(node);
        if (!oldData.length) {
            for (let i = 0; i < newData.length; i++) {
                add(newData[i], i);
            }
        }
        else {
            const dataDiff = [];
            let removed = 0;
            let added = 0;
            for (let oi = 0; oi < oldData.length; oi++) {
                const newEntry = newData[oi - removed];
                const oldEntry = oldData[oi];
                const oldIndex = oldData.indexOf(newEntry);
                if (oldEntry === newEntry) {
                    continue;
                }
                if (newEntry && oldIndex < 0) {
                    dataDiff.push({
                        entry: newEntry,
                        state: DiffState.added,
                        index: oi - removed,
                    });
                    removed--;
                    added++;
                }
                else if (!newData.includes(oldEntry) || (oldIndex === undefined && oldEntry !== undefined && (newEntry == null || newEntry !== oldEntry))) {
                    dataDiff.push({
                        entry: oldEntry,
                        state: DiffState.removed,
                        index: oi,
                    });
                    removed++;
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/prefer-includes
                    if (newData.indexOf(oldEntry) >= 0) {
                        dataDiff.push({
                            entry: newEntry,
                            targetEntry: oldEntry,
                            state: DiffState.swap,
                            index: oldData.indexOf(newData[oi - removed]),
                            targetIndex: oldData.indexOf(oldData[oi]),
                        });
                        const temp = oldData[oi];
                        oldData[oi] = newData[oi - removed];
                        oldData[oldIndex] = temp;
                    }
                }
            }
            for (let i = oldData.length; i < newData.length - added; i++) {
                const newEntry = newData[i];
                dataDiff.push({
                    entry: newEntry,
                    state: DiffState.added,
                    index: i,
                });
            }
            console.log(dataDiff);
            for (let index = 0; index < dataDiff.length; index++) {
                const nextIndex = dataDiff[index + 1] ? dataDiff[index + 1].index : null;
                const nextState = dataDiff[index + 1] ? dataDiff[index + 1].state : null;
                const data = dataDiff[index];
                switch (data.state) {
                    case DiffState.added:
                        add(data.entry, data.index);
                        break;
                    case DiffState.removed:
                        remove(data.index);
                        break;
                    case DiffState.swap:
                        swap(data.index, (_c = data.targetIndex) !== null && _c !== void 0 ? _c : -1);
                        if (nextState === DiffState.swap && nextIndex === data.targetIndex) {
                            index++;
                        }
                        break;
                    default:
                }
            }
        }
        oldData = newData.slice(0);
        elementsCopy = elements.slice(0);
        const diff = performance.now() - start;
        console.log('Each Fast took: ' + diff.toFixed(2) + 'ms');
    };
    setTimeout(() => updateList('value' in consumable ? consumable.value : consumable), 1);
    if (isConsumable(consumable))
        consumable.changed(updateList);
    return node;
}
//# sourceMappingURL=each.js.map
import { isConsumable } from './consumables.js';
import { arraysEqual } from './util.js';
var DiffState;
(function (DiffState) {
    DiffState["unchanged"] = "unchanged";
    DiffState["added"] = "added";
    DiffState["moved"] = "moved";
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
        var _a, _b;
        if (index >= 0) {
            const el = consumer(item);
            elements.splice(index, 0, el);
            (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(el.element, (_b = children[nodeParentIndex + index]) !== null && _b !== void 0 ? _b : node);
        }
    };
    const move = (from, to) => {
        if (from >= 0 && to >= 0) {
            const elementFrom = elements[from].element;
            const elementTo = elements[to].element;
            // console.log({ from, to, elementTo, elementFrom });
            // node.parentElement?.insertBefore(elementFrom.element, elementTo.element);
            // node.parentElement?.insertBefore(elementTo.element, elements[from].element);
        }
    };
    const swap = (from, to) => {
        if (from >= 0 && to >= 0) {
            const elementFrom = elementsCopy[from];
            const elementTo = elementsCopy[to];
            const parentY = elementFrom.element.parentNode;
            const nextY = elementFrom.element.nextSibling;
            // console.log(elements.map((t, i) => (t.text() as any).replace('-', '')).join(', '));
            // console.log('Swaping', (elementFrom.text() as any).replace('-', ''), (elementTo.text() as any).replace('-', ''));
            // console.log('Swaping', (elementFrom.text() as any).replace('-', ''), (elementTo.text() as any).replace('-', ''));
            if (parentY && nextY === elementTo.element) {
                parentY.insertBefore(elementTo.element, elementFrom.element);
            }
            else if (elementTo.element.parentNode) {
                elementTo.element.parentNode.insertBefore(elementFrom.element, elementTo.element);
                if (nextY && parentY) {
                    parentY.insertBefore(elementTo.element, nextY);
                }
                else if (parentY) {
                    parentY.appendChild(elementTo.element);
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
        (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(elements[index].element);
        elements.splice(index, 1);
        elementsCopy.splice(index, 1);
    };
    const updateList = (newData) => {
        var _a, _b, _c, _d;
        if (!node.parentElement) {
            setTimeout(() => updateList(consumable), 1);
            return;
        }
        const start = performance.now();
        newData = Array.from(newData);
        if (newData.length === oldData.length && arraysEqual(oldData, newData)) {
            const diff = performance.now() - start;
            console.log('Each Fast took: ' + diff.toFixed(2) + 'ms');
            return;
        }
        children = Array.from((_b = (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes) !== null && _b !== void 0 ? _b : []);
        if (!nodeParentIndex)
            nodeParentIndex = children.indexOf(node);
        if (!oldData.length) {
            newData.forEach((data, index) => {
                add(data, index);
            });
        } //
        else {
            const dataDiff = [];
            let removed = 0;
            let added = 0;
            for (let oi = 0; oi < oldData.length; oi++) {
                const newEntry = newData[oi - removed];
                const oldEntry = oldData[oi];
                const oldIndex = oldData.indexOf(newEntry);
                // console.log({ newEntry, oldEntry, });
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
                else if (newData.indexOf(oldEntry) < 0 || (oldIndex === undefined && oldEntry !== undefined && (newEntry == null || newEntry !== oldEntry))) {
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
                    else {
                        dataDiff.push({
                            entry: newEntry,
                            state: DiffState.moved,
                            index: oldIndex,
                            targetIndex: oi,
                        });
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
            // console.table(dataDiff);
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
                    case DiffState.moved:
                        move(data.index, (_c = data.targetIndex) !== null && _c !== void 0 ? _c : -1);
                    case DiffState.swap:
                        swap(data.index, (_d = data.targetIndex) !== null && _d !== void 0 ? _d : -1);
                        if (nextState === DiffState.swap && nextIndex === data.targetIndex) {
                            index++;
                        }
                        break;
                    case DiffState.unchanged:
                    default:
                }
            }
        }
        oldData = newData;
        elementsCopy = elements.slice(0);
        const diff = performance.now() - start;
        console.log('Each Fast took: ' + diff.toFixed(2) + 'ms');
    };
    setTimeout(() => updateList(consumable), 1);
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
    setTimeout(() => updateList(consumable), 1);
    consumable.changed(updateList);
    return node;
}
//# sourceMappingURL=each.js.map
/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
import { isObservable } from './observables.js';
import { deepEquals } from './util.js';
export var DiffState;
(function (DiffState) {
    DiffState["unchanged"] = "unchanged";
    DiffState["added"] = "added";
    DiffState["removed"] = "removed";
    DiffState["swap"] = "swap";
})(DiffState || (DiffState = {}));
/**
 * Render a {@link CTag} for each item in the provided list.
 *
 * `each` can work with a goold old array, or with a {@link IObservable}.
 * If you provide a `Observable`, the list will update whenever the `Observable` changes.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * Static list
 * ```ts
 * const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
 * div(
 *     each(colors, (color) =>
 *        button(color).addStyle('color', color)
 *     )
 * );
 * ```
 *
 * @example
 * Dynamic list
 * ```ts
 *  const colors = state(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
 *  const selectedColor = state('red');
 *  div(
 *    each(colors, (color) =>
 *        button(color)
 *         .addStyle('color', color)
 *         .stylesIf(equalTo(selectedColor, color), { fontWeight: 'bold' });
 *    )
 *  );
 * ```
 */
export function each(consumable, consumer, key) {
    const node = document.createTextNode(''), elements = [];
    let oldData = [], nodeParentIndex = 0, elementsCopy = [];
    const add = (entry) => {
        var _a;
        if (entry.index >= 0) {
            const el = consumer(entry.entry);
            const elAt = elements[entry.index];
            elements.splice(entry.index, 0, el);
            (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(el.el, elAt ? elAt.el : node);
        }
    };
    const remove = (entry) => {
        var _a;
        (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(elementsCopy[entry.index].el);
        elementsCopy[entry.index].destroy();
        // This is done because if we use the original index, and the array changes size,
        // the indexes will not match
        const i = elements.indexOf(elementsCopy[entry.index]);
        elements.splice(i, 1);
    };
    const swap = (entry) => {
        var _a;
        const from = entry.index, to = (_a = entry.targetIndex) !== null && _a !== void 0 ? _a : 0;
        if (from >= 0 && to >= 0) {
            const elementFrom = elementsCopy[from];
            const elementTo = elementsCopy[to];
            const parentY = elementFrom.el.parentNode;
            const nextY = elementFrom.el.nextSibling;
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
    const actionMap = {
        [DiffState.added]: add,
        [DiffState.removed]: remove,
        [DiffState.swap]: swap,
    };
    const updateList = (newData) => {
        var _a, _b;
        if (!node.parentElement) {
            setTimeout(() => updateList(newData), 1);
            return;
        }
        const start = performance.now();
        if (!nodeParentIndex) {
            const children = Array.from((_b = (_a = node.parentElement) === null || _a === void 0 ? void 0 : _a.childNodes) !== null && _b !== void 0 ? _b : []);
            nodeParentIndex = children.indexOf(node);
        }
        const diff = diffList(newData, oldData, key);
        if (diff.length > 0) {
            for (let index = 0; index < diff.length; index++) {
                const data = diff[index];
                const nextIndex = diff[index + 1] ? diff[index + 1].index : null;
                const nextState = diff[index + 1] ? diff[index + 1].state : null;
                actionMap[data.state](data);
                if (nextState === DiffState.swap && nextIndex === data.targetIndex) {
                    index++;
                }
            }
        }
        oldData = [...newData].slice(0);
        elementsCopy = elements.slice(0);
        const timeDiff = performance.now() - start;
        console.log('Each Fast took: ' + timeDiff.toFixed(2) + 'ms');
    };
    setTimeout(() => updateList('value' in consumable ? consumable.value : consumable), 1);
    if (isObservable(consumable))
        consumable.changed(updateList);
    return node;
}
/**
 * Compares 2 lists, returns an array of {@link DiffEntry} with the operations needed to make in the {@link oldData} to create the new list.
 * It only returns the actions that are needed, if an element does not need to move, then it's not returned
 */
export function diffList(newData, oldData, key = (item) => item) {
    const diff = [], newLength = newData.length, oldLength = oldData.length;
    // If the data is the same, don't do anything
    if (newLength === oldLength && (newData == oldData || deepEquals(oldData, newData))) {
        return diff;
    }
    // If all items have been removed, just remove them, no need to diff
    if (newLength <= 0) {
        for (let i = 0; i < oldLength; i++) {
            diff[i] = {
                entry: oldData[i],
                state: DiffState.removed,
                index: i,
            };
        }
        return diff;
    }
    // If there was no data before, add all items
    if (!oldLength) {
        for (let i = 0; i < newLength; i++) {
            diff[i] = {
                entry: newData[i],
                state: DiffState.added,
                index: i,
            };
        }
        return diff;
    }
    // diff the old data with the new one
    // Count of how many items have been removed so far (inside the loop)
    let removed = 0;
    for (let oi = 0; oi < oldLength; oi++) {
        const newEntry = newData[oi - removed], oldEntry = oldData[oi], areEqual = key(oldEntry) == key(newEntry);
        if (areEqual || deepEquals(oldEntry, newEntry)) {
            continue;
        }
        const existsNew = !!newData.find(item => key(oldEntry) == key(item)), existsOld = !!oldData.find(item => key(newEntry) == key(item));
        if (!existsOld && existsNew) {
            diff.push({
                entry: newEntry,
                state: DiffState.added,
                index: oi - removed,
            });
            removed--;
            continue;
        }
        // `newEntry` can be undefined if the newData is shorter than the oldData
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        if ((existsOld && !existsNew) || newEntry == null) {
            diff.push({
                entry: oldEntry,
                state: DiffState.removed,
                index: oi,
            });
            removed++;
            continue;
        }
        // eslint-disable-next-line @typescript-eslint/prefer-includes
        if (newData.indexOf(oldEntry) >= 0) {
            diff.push({
                entry: newEntry,
                targetEntry: oldEntry,
                state: DiffState.swap,
                index: oldData.indexOf(newData[oi - removed]),
                targetIndex: oldData.indexOf(oldData[oi]),
            });
            // This swaps items, this is needed to create cohesive swapping
            const oldIndex = oldData.indexOf(newEntry);
            const temp = oldData[oi];
            oldData[oi] = newData[oi - removed];
            oldData[oldIndex] = temp;
            continue;
        }
    }
    // Get the additional items in newData, any new item added at the end
    // from the end of the oldData plus added items
    if (removed != oldLength) {
        for (let i = oldLength - removed; i < newLength; i++) {
            const newEntry = newData[i];
            diff.push({
                entry: newEntry,
                state: DiffState.added,
                index: i,
            });
        }
    }
    return diff;
}
//# sourceMappingURL=each.js.map
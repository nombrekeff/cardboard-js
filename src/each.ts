/* eslint-disable no-case-declarations */
/* eslint-disable eqeqeq */
import { getValue, isConsumable } from './consumables.js';
import { deepEquals } from './util.js';
import type { CTag } from './tag.js';
import type { IConsumable, IConsumableOr } from './types.js';

export enum DiffState {
  unchanged = 'unchanged',
  added = 'added',
  removed = 'removed',
  swap = 'swap',
}
export interface DiffEntry<T = unknown> {
  state: DiffState,
  index: number,
  entry: T,
  targetEntry?: T;
  targetIndex?: number,
}

/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export function each<T>(
  consumable: IConsumableOr<T[]>,
  consumer: (val: T) => CTag,
  key?: (val: T) => any,
): Node {
  const node = document.createTextNode(''), elements: CTag[] = [];

  let oldData: T[] = [],
    nodeParentIndex: number = 0,
    elementsCopy: CTag[] = [];

  const add = (entry: DiffEntry<T>) => {
    if (entry.index >= 0) {
      const el = consumer(entry.entry);
      const elAt = elements[entry.index];
      elements.splice(entry.index, 0, el);
      node.parentElement?.insertBefore(el.el, elAt ? elAt.el : node);
    }
  };

  const remove = (entry: DiffEntry<T>) => {
    node.parentElement?.removeChild(elementsCopy[entry.index].el);
    elementsCopy[entry.index].destroy();

    // This is done because if we use the original index, and the array changes size,
    // the indexes will not match
    const i = elements.indexOf(elementsCopy[entry.index]);
    elements.splice(i, 1);
  };

  const swap = (entry: DiffEntry<T>) => {
    const from = entry.index,
      to = entry.targetIndex ?? 0;

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

  const updateList = (newData: T[]) => {
    if (!node.parentElement) {
      setTimeout(() => updateList(newData), 1);
      return;
    }

    const start = performance.now();

    if (!nodeParentIndex) {
      const children = Array.from(node.parentElement?.childNodes ?? []);
      nodeParentIndex = children.indexOf(node);
    }

    const diff = diffList(newData, oldData);

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
  if (isConsumable(consumable)) (consumable as IConsumable).changed(updateList);
  return node;
}

export function eachOld<T>(
  consumable: IConsumableOr<T[]>,
  consumer: (val: T) => CTag,
  key?: (val: T) => any,
): Node {
  const node = document.createTextNode(''), elements: CTag[] = [];

  let oldData: T[] = [],
    nodeParentIndex: number = 0,
    children: Node[] = [],
    elementsCopy: CTag[] = [];

  const add = (item: T, index: number) => {
    if (index >= 0) {
      const el = consumer(item);
      const elAt = elements[index];
      elements.splice(index, 0, el);
      node.parentElement?.insertBefore(el.el, elAt ? elAt.el : node);
    }
  };

  const swap = (from: number, to: number) => {
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

  const remove = (index: number, entry: T) => {
    node.parentElement?.removeChild(elementsCopy[index].el);
    elementsCopy[index].destroy();

    // This is done because if we use the original index, and the array changes size,
    // the indexes will not match
    const i = elements.indexOf(elementsCopy[index]);
    elements.splice(i, 1);
  };

  const updateList = (newData: T[]) => {
    if (!node.parentElement) {
      setTimeout(() => updateList(newData), 1);
      return;
    }

    const start = performance.now();
    const newLength = newData.length;
    const oldLength = oldData.length;

    // If the data is the same, don't do anything
    if (newLength === oldLength && deepEquals(oldData, newData)) {
      const diff = performance.now() - start;
      console.log('Each slow skip took: ' + diff.toFixed(2) + 'ms');
      return;
    }

    children = Array.from(node.parentElement?.childNodes ?? []);

    if (!nodeParentIndex) nodeParentIndex = children.indexOf(node);

    // If all items have been removed, just remove them, no need to diff
    if (newLength <= 0) {
      for (let i = 0; i < oldLength; i++) {
        remove(i, oldData[i]);
      }
    }
    // If there was no data before, add all items
    else if (!oldLength) {
      for (let i = 0; i < newLength; i++) {
        add(newData[i], i);
      }
    }
    // Otherwise diff the old data with the new one
    else {
      const dataDiff: Array<DiffEntry<T>> = [];
      let removed = 0;
      let added = 0;

      for (let oi = 0; oi < oldLength; oi++) {
        const newEntry = newData[oi - removed];
        const oldEntry = oldData[oi];
        const oldIndex = oldData.indexOf(newEntry);
        const existsNew = key ? newData.find(item => key(oldEntry) == key(item)) : newData.includes(oldEntry);
        const existsOld = key ? oldData.find(item => key(newEntry) == key(item)) : oldData.includes(newEntry);
        const areEqual = key ? key(oldEntry) == key(newEntry) : oldEntry == newEntry;

        if (areEqual || deepEquals(oldEntry, newEntry)) {
          continue;
        }
        if (!existsOld && existsNew && newEntry && oldIndex < 0) {
          dataDiff.push({
            entry: newEntry,
            state: DiffState.added,
            index: oi - removed,
          });
          removed--;
          added++;
        }
        else if (existsOld && !existsNew) {
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

      for (let i = oldLength; i < newLength - added; i++) {
        const newEntry = newData[i];
        dataDiff.push({
          entry: newEntry,
          state: DiffState.added,
          index: i,
        });
      }

      for (let index = 0; index < dataDiff.length; index++) {
        const nextIndex = dataDiff[index + 1] ? dataDiff[index + 1].index : null;
        const nextState = dataDiff[index + 1] ? dataDiff[index + 1].state : null;
        // eslint-disable-next-line prefer-const
        let data = dataDiff[index];

        switch (data.state) {
          case DiffState.added:
            add(data.entry, data.index); break;
          case DiffState.removed:
            remove(data.index, data.entry); break;
          case DiffState.swap:
            swap(data.index, data.targetIndex ?? -1);
            if (nextState === DiffState.swap && nextIndex === data.targetIndex) {
              index++;
            }
            break;
          default:
        }
      }
    }

    oldData = [...newData].slice(0);
    elementsCopy = elements.slice(0);

    const diff = performance.now() - start;
    console.log('Each slow took: ' + diff.toFixed(2) + 'ms');
  };

  setTimeout(() => updateList('value' in consumable ? consumable.value : consumable), 1);
  if (isConsumable(consumable)) (consumable as IConsumable).changed(updateList);
  return node;
}

export function diffList<T>(
  newData: T[], oldData: T[],
  key: (item: T) => any = (item: T) => item
): Array<DiffEntry<T>> {
  const diff: Array<DiffEntry<T>> = [];
  const newLength = newData.length;
  const oldLength = oldData.length;

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

  // // Otherwise diff the old data with the new one
  else {
    // Count of how many items have been removed so far (inside the loop)
    let removed = 0;

    for (let oi = 0; oi < oldLength; oi++) {
      const newEntry = newData[oi - removed],
        oldEntry = oldData[oi],
        areEqual = key(oldEntry) == key(newEntry);

      if (areEqual || deepEquals(oldEntry, newEntry)) {
        continue;
      }

      const existsNew = !!newData.find(item => key(oldEntry) == key(item)),
        existsOld = !!oldData.find(item => key(newEntry) == key(item));

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
  }

  return diff;
}

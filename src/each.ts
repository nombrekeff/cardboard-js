import { type Consumable, isConsumable } from './consumables.js';
import type { CTag } from './tag.js';
import type { State } from './types.js';

enum DiffState {
  removed,
  added,
  unchanged,
}
interface DiffEntry<T = unknown> {
  entry: T,
  state: DiffState,
}

/**
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * ```ts
 * ```
 */
export function each<T>(
  consumable: State<T[]> | Consumable<T[]>,
  consumer: (val: T) => CTag,
): Node {
  const node = document.createTextNode('');

  const elements: CTag[] = [];
  let oldData: T[] = [];

  const updateList = (newData) => {
    const start = performance.now();
    newData = Array.from(isConsumable(newData) ? newData.value : newData);

    const dataDiff: DiffEntry[] = [];

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

export function eachSlow<T>(
  consumable: State<T[]> | Consumable<T[]>,
  consumer: (val: T) => CTag,
): Node {
  const node = document.createTextNode('');

  let elements: CTag[] = [];

  const updateList = (newVal) => {
    if (!node.parentElement) {
      setTimeout(() => updateList(consumable), 1);
      return;
    }

    const start = performance.now();

    newVal = Array.from(isConsumable(newVal) ? newVal.value : newVal);

    elements.forEach((el, i) => {
      node.parentElement?.removeChild(el.element);
    });
    elements = [];

    newVal.forEach((item, i) => {
      elements[i] = consumer(item);
      node.parentElement?.insertBefore(elements[i].element, node);
    });

    const diff = performance.now() - start;
    console.log('eachSlow took: ' + diff.toFixed(2) + 'ms');
  };

  consumable.changed(updateList);
  return node;
}

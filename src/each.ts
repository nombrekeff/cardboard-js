import { isObservable } from './observables.js';
import { deepEquals } from './util.js';
import type { CTag } from './tag.js';
import type { IObservable, IObservableOr } from './types.js';

/**
 * @enum {string}
 * @property {string} unchanged - The entry is unchanged.
 * @property {string} added - The entry was added.  
 * @property {string} removed - The entry was removed.
 * @property {string} swap - The entry was swapped with another entry.
 */
export enum DiffState {
  unchanged = 'unchanged',
  added = 'added',
  removed = 'removed',
  swap = 'swap',
}

/**
 * Represents a single entry in the diff process.
 * This interface is used to describe the state of an entry in the diff process,
 * including its index, the entry itself, and optionally the target entry and target index if it was swapped.
 * @property {DiffState} state - The state of the entry in the diff process.
 * @property {number} index - The index of the entry in the old data.
 * @property {T} entry - The entry itself.
 * @property {T} targetEntry - The target entry if the entry was swapped
 * @property {number} targetIndex - The index of the target entry if the entry was swapped.
 */
export interface DiffEntry<T = unknown> {
  state: DiffState,
  index: number,
  entry: T,
  targetEntry?: T;
  targetIndex?: number,
}

/**
 * Render a {@link CTag} for each item in the provided list.
 *
 * `each` can work with a goold old array, or with a {@link IObservable}.
 * If you provide a `Observable`, the list will update whenever the `Observable` changes.
 *
 * @param observable - An array or an {@link IObservable} that contains the list of items to render.
 * @param builder - A function that takes an item from the list and returns a {@link CTag} to render.
 * @param key - An optional function that returns a unique key for each item in the list. This is used to optimize the rendering process.
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
export function each<T>(
  observable: IObservableOr<T[]>,
  builder: (val: T) => CTag,
  key?: (val: T) => any,
): Node {
  const node = document.createTextNode(''), elements: CTag[] = [];
  let oldData: T[] = [],
    nodeParentIndex: number = 0,
    elementsCopy: CTag[] = [];

  // Inserts a new element into the DOM and the elements array at the specified index.
  // Uses the transform function to create the element and places it before the next sibling or anchor node.
  const actionAdd = (entry: DiffEntry<T>) => {
    if (entry.index >= 0) {
      const el = builder(entry.entry);
      const elAt = elements[entry.index];
      elements.splice(entry.index, 0, el);
      node.parentElement?.insertBefore(el.el, elAt ? elAt.el : node);
    }
  };

  // Removes the element at the specified index from the DOM and calls its destroy method.
  // Also removes the element from the internal elements array to keep it in sync.
  const actionRemove = (entry: DiffEntry<T>) => {
    node.parentElement?.removeChild(elementsCopy[entry.index].el);
    elementsCopy[entry.index].destroy();

    // This is done because if we use the original index, and the array changes size,
    // the indexes will not match
    const i = elements.indexOf(elementsCopy[entry.index]);
    elements.splice(i, 1);
  };

  // Swaps two elements in the DOM and updates their positions in the internal arrays.
  // Ensures the visual order matches the new data order after a swap operation.
  const actionSwap = (entry: DiffEntry<T>) => {
    const fromIndex = entry.index,
      toIndex = entry.targetIndex ?? 0;

    if (fromIndex >= 0 && toIndex >= 0) {
      const elementFrom = elementsCopy[fromIndex];
      const elementTo = elementsCopy[toIndex];

      const parentNode = elementFrom.el.parentNode;
      const nextSiblingNode = elementFrom.el.nextSibling;

      if (parentNode && nextSiblingNode === elementTo.el) {
        parentNode.insertBefore(elementTo.el, elementFrom.el);
      }
      else if (elementTo.el.parentNode) {
        elementTo.el.parentNode.insertBefore(elementFrom.el, elementTo.el);

        if (nextSiblingNode && parentNode) {
          parentNode.insertBefore(elementTo.el, nextSiblingNode);
        }
        else if (parentNode) {
          parentNode.appendChild(elementTo.el);
        }
      }

      const tempCopy = elementsCopy[fromIndex];
      elementsCopy[fromIndex] = elementsCopy[toIndex];
      elementsCopy[toIndex] = tempCopy;

      const temp = elements[fromIndex];
      elements[fromIndex] = elements[toIndex];
      elements[toIndex] = temp;
    }
  };

  // Map of actions to perform based on the diff state
  // This is used to avoid using a switch statement, which is slower
  // and to keep the code cleaner.
  const actionMap = {
    [DiffState.added]: actionAdd,
    [DiffState.removed]: actionRemove,
    [DiffState.swap]: actionSwap,
  };

  // Maximum number of tries to find the parent element
  // This is used to avoid infinite loops in case the parent element is not found
  const MAX_UPDATE_TRIES = 100;

  // This function updates the list of elements based on the new data.
  // It calculates the differences between the old and new data using `diffList`,
  // and applies the necessary actions to the DOM.
  const updateList = (newData: T[], tries = 0) => {
    // If the node has no parent element, it means it has not been mounted yet,
    // so we wait a bit and try again.
    if (!node.parentElement) {
      // If we have not reached the max tries, we wait a bit and try again
      if (tries < MAX_UPDATE_TRIES) {
        setTimeout(() => updateList(newData, tries + 1), 1);
      } else {
        console.warn(`[each]: parentElement not found after max retries`);
      }
      return;
    }

    if (!nodeParentIndex) {
      const children = Array.from(node.parentElement?.childNodes ?? []);
      nodeParentIndex = children.indexOf(node);
    }

    // Create the diff between the new data and the old data
    const diff = diffList(newData, oldData, key);

    // If the diff is empty, it means the data has not changed, so we do nothing
    if (diff.length <= 0) return;

    // Process the diff and apply the actions
    for (let index = 0; index < diff.length; index++) {
      const data = diff[index];
      const nextIndex = diff[index + 1] ? diff[index + 1].index : null;
      const nextState = diff[index + 1] ? diff[index + 1].state : null;
      actionMap[data.state](data);
      if (nextState === DiffState.swap && nextIndex === data.targetIndex) {
        index++;
      }
    }

    // Set the new data as the old data for the next update
    oldData = [...newData].slice(0);

    // Update the elementsCopy to match the new data
    elementsCopy = elements.slice(0);
  };

  updateList('value' in observable ? observable.value : observable);

  if (isObservable(observable)) {
    (observable as IObservable).changed(updateList);
  }

  return node;
}

/**
 * Compares 2 lists, returns an array of {@link DiffEntry} with the operations needed to make in the `oldData` to create the new list.
 * It only returns the actions that are needed, if an element does not need to move, then it's not returned
 * 
 * @param newData - The new data to compare against the old data.
 * @param oldData - The old data to compare against the new data.
 * @param key - A function that returns a unique key for each item in the list. This is used to optimize the rendering process.
 * @returns An array of {@link DiffEntry} objects that describe the differences between the two lists.
 */
export function diffList<T>(
  newData: T[], oldData: T[],
  key: (item: T) => any = (item: T) => item
): Array<DiffEntry<T>> {
  const diff: Array<DiffEntry<T>> = [],
    newLength = newData.length,
    oldLength = oldData.length;

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

  // Count of how many items have been removed so far (inside the loop)
  let removedCount = 0;

  // diff the old data with the new one
  for (let oi = 0; oi < oldLength; oi++) {
    const newEntry = newData[oi - removedCount],
      oldEntry = oldData[oi],
      areEqual = key(oldEntry) == key(newEntry);

    if (areEqual || deepEquals(oldEntry, newEntry)) {
      continue;
    }

    const existsNew = !!newData.find(item => key(oldEntry) == key(item)),
      existsOld = !!oldData.find(item => key(newEntry) == key(item));

    // If the new entry does not exist in the old data, it means it was added
    if (!existsOld && existsNew) {
      diff.push({
        entry: newEntry,
        state: DiffState.added,
        index: oi - removedCount,
      });
      removedCount--;
      continue;
    }

    // If the old entry does not exist in the new data, it means it was removed
    // `newEntry` can be undefined if the newData is shorter than the oldData
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if ((existsOld && !existsNew) || newEntry == null) {
      diff.push({
        entry: oldEntry,
        state: DiffState.removed,
        index: oi,
      });
      removedCount++;
      continue;
    }

    // If the new entry exists in the old data, it means it was swapped
    if (newData.indexOf(oldEntry) >= 0) {
      diff.push({
        entry: newEntry,
        targetEntry: oldEntry,
        state: DiffState.swap,
        index: oldData.indexOf(newData[oi - removedCount]),
        targetIndex: oldData.indexOf(oldData[oi]),
      });

      // This swaps items, this is needed to create cohesive swapping
      const oldIndex = oldData.indexOf(newEntry);
      const temp = oldData[oi];
      oldData[oi] = newData[oi - removedCount];
      oldData[oldIndex] = temp;
    }
  }

  // Add any new items that were not in the old data
  if (removedCount != oldLength) {
    for (let i = oldLength - removedCount; i < newLength; i++) {
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

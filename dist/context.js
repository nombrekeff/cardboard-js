import { singleEvent } from "./events.js";
import { CTag } from "./tag.js";
export const context = {
    mountPoint: undefined,
    mountPointHistory: [],
};
/**
 * Returns the current mountPoint {@link CTag}. See {@link mountPoint} for more information.
 */
export const getMountPoint = () => context.mountPoint;
/**
 * Makes the given tag the mount point. This means that when other tags are created with "mountToParent" or  (using `<tag_name>.mount()`, `tag('<tag_name>', [], true)`),
 * they will be added as children of this tag.
 * You can call mountPoint multiple times, and the last mount point tag will be used.
 * Then when you've finished, you can call {@link restoreMountPoint} to go back to the previously mounted tag if there is one.
 * You can clear all mount points using {@link clearMountPoints}.
 *
 * @example
 * ```ts
 * mountPoint(div()); // Div 1
 * div.mount();  // added as child of div
 * p.mount();    // added as child of div
 *
 * mountPoint(div()); // Div 2
 * div.mount();  // added as child of new div
 * p.mount();    // added as child of new div
 *
 * restoreMountPoint();      // Back to div 1
 * clearMountPoints();       // Clears all mount points, no mount point after this call
 * ```
 */
export const mountPoint = (tag) => {
    if (context.mountPoint) {
        context.mountPointHistory.push(context.mountPoint);
    }
    context.mountPoint = tag;
    return tag;
};
/**
 * Restore the currently mounted tag ({@link mountPoint}).
 * Goes back in the stack of mount points tags.
 * If there is no previous mount point tag, it will not do anything.
 */
export const restoreMountPoint = () => {
    context.mountPoint = context.mountPointHistory.pop();
};
/**
 * Restores all mount points. There will be no mount points tag after calling this function.
 */
export const clearMountPoints = () => {
    context.mountPoint = undefined;
    context.mountPointHistory = [];
};
/**
 * Clears the mount point history and resets the mount point to the first one.
 * This means that the mount point will be the first tag that was mounted,
 * and all other mount points will be cleared.
 */
export const resetMountPoints = () => {
    let first = context.mountPointHistory.shift();
    context.mountPoint = first;
    context.mountPointHistory = [];
};
/**
 * Sets the mount point to the given tag, calls the scoped callback, and then restores the mount point.
 * Useful for creating a temporary mount point for a specific tag, and then restoring the previous mount point.
 *
 * @param tag
 * @param scopedCallback
 */
export const withMountPoint = (tag, scopedCallback) => {
    mountPoint(tag);
    scopedCallback(tag);
    restoreMountPoint();
};
/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
export const init = (options = { selector: 'body' }) => {
    const tag = new CTag(`(${options.selector})`);
    context.observer = createGlobalObserver();
    return mountPoint(tag);
};
// TODO: Optimize this. Instead of observing everything, let lifecycles listen just to the parent of the element instead of everything.
export const createGlobalObserver = () => {
    const _addedEvt = singleEvent();
    const _removedEvt = singleEvent();
    const observer = new window.MutationObserver((mutations, observer) => {
        for (const mut of mutations) {
            for (const n of Array.from(mut.addedNodes)) {
                _addedEvt.dispatch(n);
            }
            for (const n of Array.from(mut.removedNodes)) {
                _removedEvt.dispatch(n);
            }
        }
    });
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
    return {
        onAdded: _addedEvt,
        onRemoved: _removedEvt,
    };
};
//# sourceMappingURL=context.js.map
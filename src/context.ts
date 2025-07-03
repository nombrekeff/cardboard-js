import { singleEvent, type CEvent } from "./events.js";
import { CTag } from "./tag.js";
import type { StyleManager } from "./types.js";

export type CardboardContext = {
    intObs?: IntersectionObserver;
    styleManager?: StyleManager;
    mp?: CTag;
    mpHistory: CTag[];
    obs?: {
        onAdded: CEvent<Node>;
        onRemoved: CEvent<Node>;
    };
    init?: boolean;
};

export const context: CardboardContext = {
    mp: undefined,
    mpHistory: [],
    styleManager: undefined,
    intObs: undefined,
    obs: undefined,
    init: false,
};

export const isInitialized = () => context.init === true;
export const checkInitialized = () => {
    if (!isInitialized()) {
        throw new Error("Cardboard is not initialized. Please call `init()`, as some features will not work.");
    }
};

/**
 * Returns the current mountPoint {@link CTag}. See {@link mountPoint} for more information.
 */
export const getMountPoint = () => context.mp;

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
export const mountPoint = (tag: CTag) => {
    if (context.mp) {
        context.mpHistory.push(context.mp);
    }
    context.mp = tag;
    return tag;
};

/**
 * Restore the currently mounted tag ({@link mountPoint}). 
 * Goes back in the stack of mount points tags.
 * If there is no previous mount point tag, it will not do anything.
 */
export const restoreMountPoint = () => {
    context.mp = context.mpHistory.pop();
};

/**
 * Restores all mount points. There will be no mount points tag after calling this function.
 */
export const clearMountPoints = () => {
    context.mp = undefined;
    context.mpHistory = [];
};

/**
 * Clears the mount point history and resets the mount point to the first one.
 * This means that the mount point will be the first tag that was mounted, 
 * and all other mount points will be cleared.
 */
export const resetMountPoints = () => {
    let first = context.mpHistory.shift();
    context.mp = first;
    context.mpHistory = [];
};

export type ScopedCallback = (tag: CTag) => void;

/**
 * Sets the mount point to the given tag, calls the scoped callback, and then restores the mount point.
 * Useful for creating a temporary mount point for a specific tag, and then restoring the previous mount point.
 * 
 * @param tag 
 * @param scopedCallback 
 */
export const withMountPoint = (tag: CTag, scopedCallback: ScopedCallback) => {
    mountPoint(tag);
    scopedCallback(tag);
    restoreMountPoint();
}

// TODO: Optimize this. Instead of observing everything, let lifecycles listen just to the parent of the element instead of everything.
export const createGlobalObserver = () => {
    const _addedEvt = singleEvent<Node>();
    const _removedEvt = singleEvent<Node>();

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

    observer.observe(window.document.body, {
        childList: true,
        subtree: true,
    });

    return {
        onAdded: _addedEvt,
        onRemoved: _removedEvt,
    };
};
import { type CEvent } from "./events.js";
import { CTag } from "./tag.js";
export type CardboardContext = {
    mountPoint?: CTag;
    mountPointHistory: CTag[];
    observer?: {
        onAdded: CEvent<Node>;
        onRemoved: CEvent<Node>;
    };
};
export declare const context: CardboardContext;
/**
 * Returns the current mountPoint {@link CTag}. See {@link mountPoint} for more information.
 */
export declare const getMountPoint: () => CTag | undefined;
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
export declare const mountPoint: (tag: CTag) => CTag;
/**
 * Restore the currently mounted tag ({@link mountPoint}).
 * Goes back in the stack of mount points tags.
 * If there is no previous mount point tag, it will not do anything.
 */
export declare const restoreMountPoint: () => void;
/**
 * Restores all mount points. There will be no mount points tag after calling this function.
 */
export declare const clearMountPoints: () => void;
/**
 * Clears the mount point history and resets the mount point to the first one.
 * This means that the mount point will be the first tag that was mounted,
 * and all other mount points will be cleared.
 */
export declare const resetMountPoints: () => void;
export type ScopedCallback = (tag: CTag) => void;
/**
 * Sets the mount point to the given tag, calls the scoped callback, and then restores the mount point.
 * Useful for creating a temporary mount point for a specific tag, and then restoring the previous mount point.
 *
 * @param tag
 * @param scopedCallback
 */
export declare const withMountPoint: (tag: CTag, scopedCallback: ScopedCallback) => void;
/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
export declare const init: (options?: {
    selector: string;
}) => CTag;
export declare const createGlobalObserver: () => {
    onAdded: CEvent<Node>;
    onRemoved: CEvent<Node>;
};

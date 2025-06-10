import { type CTag } from './tag.js';
import { type AtLeastOne } from './types.js';
/**
 * Will call {mounted} when the element is added to the DOM.
 * And will call {beforeUnmounted} before the element is removed from the DOM.
 * Finally will call {onUnmounted} when the element is removed from the DOM.
 */
export declare function onLifecycle(tag: CTag, onMounted?: (tag: CTag) => Promise<boolean> | boolean, onUnmounted?: (tag: CTag) => void, beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean): void;
/**
 * `withLifecycle` is a utility function that adds lifecycle hooks to a Cardboard tag.
 *
 * Will call `handler.mounted` when the element is added to the DOM.
 * Then call `handler.beforeUnmount` **before** the element is removed from the DOM.
 * Finally call `handler.unmounted` **when** the element is removed from the DOM.
 *
 * @example
 * ```typescript
 * const myTag = withLifecycle(
 *   div('Hello World'),
 *   {
 *     mounted: (tag) => {
 *       console.log('Mounted:', tag);
 *       return true; // or false to prevent mounting
 *     },
 *     unmounted: (tag) => {
 *       console.log('Unmounted:', tag);
 *     },
 *     beforeUnmount: (tag) => {
 *       console.log('Before Unmount:', tag);
 *       return true; // or false to prevent unmounting
 *     },
 *    }
 *  );
 */
export declare const withLifecycle: (tag: CTag, handler: AtLeastOne<{
    mounted?: ((tag: CTag) => Promise<boolean> | boolean) | undefined;
    unmounted?: ((tag: CTag) => void) | undefined;
    beforeUnmounted?: ((tag: CTag) => Promise<boolean> | boolean) | undefined;
}>) => CTag;

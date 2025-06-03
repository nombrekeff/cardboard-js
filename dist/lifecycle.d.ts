import { type CTag } from './tag.js';
export declare const createGlobalObserver: () => {
    onAdded: import("./events.js").CEvent<Node>;
    onRemoved: import("./events.js").CEvent<Node>;
};
/**
 * Will call {mounted} when the element is added to the DOM.
 * And will call {beforeUnmount} before the element is removed from the DOM.
 * Finally will call {onUnmounted} when the element is removed from the DOM.
 */
export declare function onLifecycle(tag: CTag, onMounted?: (tag: CTag) => Promise<boolean> | boolean, onUnmounted?: (tag: CTag) => void, beforeUnmount?: (tag: CTag) => Promise<boolean> | boolean): void;
/**
 * Will call `handler.mounted` when the element is added to the DOM.
 * Then call `handler.beforeUnmount` **before** the element is removed from the DOM.
 * Finally call `handler.unmounted` **when** the element is removed from the DOM.
 */
export declare const withLifecycle: (tag: CTag, handler: {
    mounted?: ((tag: CTag) => Promise<boolean> | boolean) | undefined;
    unmounted?: ((tag: CTag) => void) | undefined;
    beforeUnmount?: ((tag: CTag) => Promise<boolean> | boolean) | undefined;
}) => CTag;

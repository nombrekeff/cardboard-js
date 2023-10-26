import { type CTag } from './tag.js';
export declare const createGlobalObserver: () => {
    onAdded: import("./events.js").CEvent<Node>;
    onRemoved: import("./events.js").CEvent<Node>;
};
/**
 * Will call {onStart} when the element is added to the DOM.
 * And will call {onRemove} when the element is removed from the DOM.
 */
export declare const onLifecycle: (tag: CTag, onStart?: ((tag: CTag) => Promise<boolean> | boolean) | undefined, onRemove?: ((tag: CTag) => void) | undefined, beforeRemove?: ((tag: CTag) => Promise<boolean> | boolean) | undefined) => void;
/**
 * Will call {handler.onStart} when the element is added to the DOM.
 * And will call {handler.onRemove} when the element is removed from the DOM.
 */
export declare const withLifecycle: (tag: CTag, handler: {
    start?: ((tag: CTag) => Promise<boolean> | boolean) | undefined;
    removed?: ((tag: CTag) => void) | undefined;
    beforeRemove?: ((tag: CTag) => Promise<boolean> | boolean) | undefined;
}) => CTag;

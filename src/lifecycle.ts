import { singleEvent } from './events.js';
import { context, type CTag } from './tag.js';

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

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    return {
        onAdded: _addedEvt,
        onRemoved: _removedEvt,
    };
};

/**
 * Will call {mounted} when the element is added to the DOM.
 * And will call {beforeUnmounted} before the element is removed from the DOM.
 * Finally will call {onUnmounted} when the element is removed from the DOM.
 */
export function onLifecycle(
    tag: CTag,
    onMounted?: (tag: CTag) => Promise<boolean> | boolean,
    onUnmounted?: (tag: CTag) => void,
    beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean,
) {
    if (beforeUnmounted) {
        const tempElRemove = tag.el.remove;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        tag.el.remove = async () => {
            const result = beforeUnmounted(tag);
            if (!result || (result instanceof Promise && (await result))) {
                tempElRemove.call(tag.el);
            }
            return result.valueOf();
        };
    }

    if (onMounted) {
        const tempOnStart = tag.show;
        tag.show = async () => {
            const result = tempOnStart.call(tag);
            if (result instanceof Promise) {
                return await result;
            }
            return result;
        };
    }

    if (!context.observer) {
        context.observer = createGlobalObserver();
    }

    let onAddedCb, onRemovedCb;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    context.observer.onAdded.listen(onAddedCb = async (node: Node) => {
        if (node === tag.el && onMounted) {
            const result = onMounted(tag);
            if (result instanceof Promise) {
                await result;
            }
        }
    });
    context.observer.onRemoved.listen(onRemovedCb = (node: Node) => {
        if (node === tag.el && onUnmounted) {
            onUnmounted(tag);
        }
    });
    // Using `any` here to avoid TypeScript errors, as `_listeners` is not typed in the CTag interface.
    (tag as any)._listeners.push(() => {
        // Remove listeners and references (clear memory)
        context.observer?.onRemoved.remove(onRemovedCb);
        context.observer?.onAdded.remove(onAddedCb);
        onUnmounted = undefined;
        onMounted = undefined;
    });
};

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
export const withLifecycle = (
    tag: CTag,
    handler: {
        /**
         * Called when the tag is mounted to the DOM.
         */
        mounted?: (tag: CTag) => Promise<boolean> | boolean;
        /**
         * Called when the tag is unmounted from the DOM.
         */
        unmounted?: (tag: CTag) => void;
        /**
         * Called before the tag is unmounted from the DOM.
         * If it returns false, the tag will not be unmounted.
         */
        beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean;
    },
): CTag => {
    onLifecycle(tag, handler.mounted, handler.unmounted, handler.beforeUnmounted);
    return tag;
};

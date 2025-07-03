import { context, createGlobalObserver } from './cardboard.js';
import { type CTag } from './tag.js';
import { type AtLeastOne } from './types.js';


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

    context.obs ??= createGlobalObserver();

    const onAddedCb = async (node: Node) => {
        let isAdded = node === tag.el || node.contains(tag.el);
        if (isAdded && onMounted) {
            const result = onMounted(tag);
            if (result instanceof Promise) {
                await result;
            }
        }
    }
    const onRemovedCb = (node: Node) => {
        let isRemoved = node === tag.el || node.contains(tag.el);
        if (isRemoved && onUnmounted) {
            onUnmounted(tag);
        }
    };
    context.obs.onAdded.listen(onAddedCb);
    context.obs.onRemoved.listen(onRemovedCb);

    // Using `any` here to avoid TypeScript errors, as `_destroyers` is not typed in the CTag interface.
    (tag as any)._destroyers.push(() => {
        // Remove listeners and references (clear memory)
        context.obs?.onRemoved.remove(onRemovedCb);
        context.obs?.onAdded.remove(onAddedCb);
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
    handler: AtLeastOne<{
        // Add object here so handlers can be seen when instecting the `withLifecycle` function.
        // This is useful for IDEs to show the available properties.
        mounted?: (tag: CTag) => Promise<boolean> | boolean;
        unmounted?: (tag: CTag) => void;
        beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean;
    }>,
): CTag => {
    onLifecycle(tag, handler.mounted, handler.unmounted, handler.beforeUnmounted);
    return tag;
};

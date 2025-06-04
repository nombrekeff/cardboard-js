var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { singleEvent } from './events.js';
import { context } from './tag.js';
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
/**
 * Will call {mounted} when the element is added to the DOM.
 * And will call {beforeUnmounted} before the element is removed from the DOM.
 * Finally will call {onUnmounted} when the element is removed from the DOM.
 */
export function onLifecycle(tag, onMounted, onUnmounted, beforeUnmounted) {
    if (beforeUnmounted) {
        const tempElRemove = tag.el.remove;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        tag.el.remove = () => __awaiter(this, void 0, void 0, function* () {
            const result = beforeUnmounted(tag);
            if (!result || (result instanceof Promise && (yield result))) {
                tempElRemove.call(tag.el);
            }
            return result.valueOf();
        });
    }
    if (onMounted) {
        const tempOnStart = tag.show;
        tag.show = () => __awaiter(this, void 0, void 0, function* () {
            const result = tempOnStart.call(tag);
            if (result instanceof Promise) {
                return yield result;
            }
            return result;
        });
    }
    if (!context.observer) {
        context.observer = createGlobalObserver();
    }
    let onAddedCb, onRemovedCb;
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    context.observer.onAdded.listen(onAddedCb = (node) => __awaiter(this, void 0, void 0, function* () {
        if (node === tag.el && onMounted) {
            const result = onMounted(tag);
            if (result instanceof Promise) {
                yield result;
            }
        }
    }));
    context.observer.onRemoved.listen(onRemovedCb = (node) => {
        if (node === tag.el && onUnmounted) {
            onUnmounted(tag);
        }
    });
    // Using `any` here to avoid TypeScript errors, as `_listeners` is not typed in the CTag interface.
    tag._listeners.push(() => {
        var _a, _b;
        // Remove listeners and references (clear memory)
        (_a = context.observer) === null || _a === void 0 ? void 0 : _a.onRemoved.remove(onRemovedCb);
        (_b = context.observer) === null || _b === void 0 ? void 0 : _b.onAdded.remove(onAddedCb);
        onUnmounted = undefined;
        onMounted = undefined;
    });
}
;
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
export const withLifecycle = (tag, handler) => {
    onLifecycle(tag, handler.mounted, handler.unmounted, handler.beforeUnmounted);
    return tag;
};
//# sourceMappingURL=lifecycle.js.map
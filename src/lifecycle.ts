import { singleEvent } from './events.js';
import { context, type CTag } from './tag.js';

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
 * Will call {onStart} when the element is added to the DOM.
 * And will call {onRemove} when the element is removed from the DOM.
 */
export const onLifecycle = (
    tag: CTag,
    onStart?: (tag: CTag) => Promise<boolean> | boolean,
    onRemove?: (tag: CTag) => void,
    beforeRemove?: (tag: CTag) => Promise<boolean> | boolean,
) => {
    if (beforeRemove) {
        const tempElRemove = tag.el.remove;
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        tag.el.remove = async () => {
            const result = beforeRemove(tag);
            if (!result || (result instanceof Promise && (await result))) {
                tempElRemove.call(tag.el);
            }
            return result.valueOf();
        };
    }

    if (onStart) {
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

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    context.observer.onAdded.listen(async (node: Node) => {
        if (node === tag.el && onStart) {
            const result = onStart(tag);
            if (result instanceof Promise) {
                await result;
            }
        }
    });
    context.observer.onRemoved.listen((node: Node) => {
        if (node === tag.el && onRemove) {
            onRemove(tag);
        }
    });
};

/**
 * Will call {handler.onStart} when the element is added to the DOM.
 * And will call {handler.onRemove} when the element is removed from the DOM.
 */
export const withLifecycle = (
    tag: CTag,
    handler: {
        start?: (tag: CTag) => Promise<boolean> | boolean;
        removed?: (tag: CTag) => void;
        beforeRemove?: (tag: CTag) => Promise<boolean> | boolean;
    },
): CTag => {
    onLifecycle(tag, handler.start, handler.removed, handler.beforeRemove);
    return tag;
};

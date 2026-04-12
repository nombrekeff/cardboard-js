import type { CTag } from './tag.js';

export interface LifecycleHooks {
  attached?: Set<() => void>;
  /**
   * Returning a Promise defers physical removal until it resolves.
   * Returning false cancels the removal.
   */
  beforeRemove?: Set<() => boolean | Promise<boolean>>;
  detached?: Set<() => void>;
  teardowns?: Set<() => void>;
  _fired?: { attached: boolean; detached: boolean };
}

/**
 * The single source of truth for all component lifecycles and memory teardowns.
 * Uses a WeakMap to ensure zero memory leaks when nodes are GC'd by the browser.
 */
const lifecycleRegistry = new WeakMap<HTMLElement, LifecycleHooks>();

/**
 * Universal Observer: Handles cascading removals and external DOM injections.
 */
const observer = new window.MutationObserver((mutations) => {
  for (const mut of mutations) {
    // Handle Removals (Detached + Teardown)
    for (const node of mut.removedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) traverse(node, "detached");
    }
    // Handle External Injections (Attached)
    for (const node of mut.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) traverse(node, "attached");
    }
  }
});

// Observe the document to catch native DOM mutations
if (typeof document !== "undefined") {
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

/**
 * Rapidly traverses a detached/attached fragment using the native TreeWalker API.
 * Performs O(1) lookups in the lifecycle registry.
 */
function traverse(root: Node, type: "attached" | "detached") {
  if (typeof document === 'undefined' || !document.createTreeWalker) {
    return;
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let curr: Node | null = walker.currentNode;

  while (curr) {
    const el = curr as HTMLElement;
    if (type === "detached") {
      triggerDetached(el);
    } else {
      triggerAttached(el);
    }
    curr = walker.nextNode();
  }
}

/**
 * Registers a hook for a specific tag.
 * Automatically "upgrades" the tag instance if an interception hook (beforeRemove) is added.
 */
export function onLifecycle(tag: CTag, type: keyof LifecycleHooks, fn: any) {
  let entry = lifecycleRegistry.get(tag.el);
  if (!entry) {
    entry = { _fired: { attached: false, detached: false } };
    lifecycleRegistry.set(tag.el, entry);
  }

  let hooksForType = entry[type] as Set<any> | undefined;
  if (!hooksForType) {
    hooksForType = new Set<any>();
    (entry as any)[type] = hooksForType;
  }
  hooksForType.add(fn);

  // If registering an interception hook, upgrade the instance behavior to handle deferred removal
  if (type === "beforeRemove" && !(tag as any)._isLifecycleUpgraded) {
    upgradeInstance(tag);
  }
}

/**
 * Dynamically decorates a CTag instance to handle asynchronous removal orchestration.
 * This keeps the base CTag class "dumb" and unaware of complex lifecycle logic.
 */
function upgradeInstance(tag: CTag) {
  const originalRemove = tag.remove.bind(tag);

  tag.remove = function () {
    orchestrateRemoval(tag, () => originalRemove());
    return this;
  };

  (tag as any)._isLifecycleUpgraded = true;
}

/**
 * Orchestrates the removal process, awaiting any promises returned by beforeRemove hooks.
 */
export function orchestrateRemoval(tag: CTag, physicalRemoval: () => void) {
  const hooks = lifecycleRegistry.get(tag.el);

  const finalize = () => {
    physicalRemoval();
    triggerDetached(tag.el);
  };

  if (hooks?.beforeRemove) {
    const results = Array.from(hooks.beforeRemove).map((fn) => fn());

    // Fix: Using .some() to check for false values in a union-type array
    if (results.some((res) => res === false)) return;

    // Fix: Explicit type guard for the promise filter
    const promises = results.filter(
      (r): r is Promise<boolean> => r instanceof Promise,
    );

    if (promises.length > 0) {
      Promise.all(promises).then(finalize);
      return;
    }
  }

  finalize();
}
/**
 * Synchronously triggers attached events. Resets detached state for re-attachment.
 */
export function triggerAttached(el: HTMLElement) {
  const hooks = lifecycleRegistry.get(el);
  if (hooks && !hooks._fired?.attached) {
    hooks.attached?.forEach((fn) => fn());
    if (hooks._fired) {
      hooks._fired.attached = true;
      hooks._fired.detached = false;
    }
  }
}

/**
 * Synchronously triggers detached events. Resets attached state for re-attachment.
 */
export function triggerDetached(el: HTMLElement) {
  const hooks = lifecycleRegistry.get(el);
  if (hooks && !hooks._fired?.detached) {
    hooks.detached?.forEach((fn) => fn());
    if (hooks._fired) {
      hooks._fired.detached = true;
      hooks._fired.attached = false;
    }
    // We don't delete the registry entry here to allow for re-attachment lifecycles
  }
}

/**
 * Triggers teardown hooks for final cleanup (for example during destroy).
 */
export function triggerTeardown(el: HTMLElement) {
  const hooks = lifecycleRegistry.get(el);
  hooks?.teardowns?.forEach((fn) => fn());
  hooks?.teardowns?.clear();
}

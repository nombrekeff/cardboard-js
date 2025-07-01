import * as _context from './context.js';
import * as _tag from './tag.js';
import * as _events from './events.js';
import * as _observables from './observables.js';
import * as _styles from './style-manager.js';
export * from './context.js';
export * from './tag.js';
export * from './state.js';
export * from './css-generator.js';
export * from './util.js';
export * from './text.js';
export * from './events.js';
export * from './each.js';
export * from './lifecycle.js';
export * from './observables.js';
export * from './all-tags.js';
export type * from './types';
/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
export declare const init: (options?: {
    selector: string;
}) => _tag.CTag;
export declare const Cardboard: {
    init: (options?: {
        selector: string;
    }) => _tag.CTag;
    version: string;
    StyleManager: typeof _styles.StyleManager;
    allTags: import("./types").AllTags;
    context: _context.CardboardContext;
    isInitialized: () => boolean;
    checkInitialized: () => void;
    getMountPoint: () => _tag.CTag | undefined;
    mountPoint: (tag: _tag.CTag) => _tag.CTag;
    restoreMountPoint: () => void;
    clearMountPoints: () => void;
    resetMountPoints: () => void;
    withMountPoint: (tag: _tag.CTag, scopedCallback: _context.ScopedCallback) => void;
    createGlobalObserver: () => {
        onAdded: _events.CEvent<Node>;
        onRemoved: _events.CEvent<Node>;
    };
    onLifecycle(tag: _tag.CTag, onMounted?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined, onUnmounted?: ((tag: _tag.CTag) => void) | undefined, beforeUnmounted?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined): void;
    withLifecycle: (tag: _tag.CTag, handler: import("./types").AtLeastOne<{
        mounted?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined;
        unmounted?: ((tag: _tag.CTag) => void) | undefined;
        beforeUnmounted?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined;
    }>) => _tag.CTag;
    Observable: typeof _observables.Observable;
    isObservable: (obj: any) => boolean;
    createObservable: <T>(val: T, destroyer?: (() => void) | undefined) => import("./types").IObservable<T>;
    compute: <T_1, K>(other: import("./types").IObservable<T_1>, transform: (val: T_1) => K) => import("./types").IObservable<K>;
    computeMultiple: <T_2 extends import("./types").IObservable<any>[], K_1>(observables: [...T_2], transform: (...v_0: _observables.ExtractValue<T_2>) => K_1) => import("./types").IObservable<K_1>;
    getValue: <T_3>(val: import("./types").IObservableOr<T_3>) => T_3;
    greaterThan: (observable: import("./types").IObservable<number>, val?: number | import("./types").IObservable<number>) => import("./types").IObservable<boolean>;
    greaterThanOr: (observable: import("./types").IObservable<number>, val?: import("./types").IObservableOr<number>) => import("./types").IObservable<boolean>;
    lessThan: (observable: import("./types").IObservable<number>, val?: import("./types").IObservableOr<number>) => import("./types").IObservable<boolean>;
    lessThanOr: (observable: import("./types").IObservable<number>, val?: import("./types").IObservableOr<number>) => import("./types").IObservable<boolean>;
    equalTo: <T_4>(observable: import("./types").IObservable<T_4>, val: import("./types").IObservableOr<T_4>) => import("./types").IObservable<boolean>;
    notEqualTo: <T_5>(observable: import("./types").IObservable<T_5>, val: import("./types").IObservableOr<T_5>) => import("./types").IObservable<boolean>;
    isEmpty: <T_6 extends import("./types").WithLength>(observable: import("./types").IObservable<T_6>) => import("./types").IObservable<boolean>;
    notEmpty: <T_7 extends import("./types").WithLength>(observable: import("./types").IObservable<T_7>) => import("./types").IObservable<boolean>;
    grab: <T_8, K_2 extends keyof T_8>(observable: import("./types").IObservable<T_8>, key: K_2, defaultVal?: T_8[K_2] | undefined) => import("./types").IObservable<T_8[K_2] | undefined>;
    CEvent: typeof _events.CEvent;
    CMappedEvent: typeof _events.CMappedEvent;
    singleEvent: <T_9>() => _events.CEvent<T_9>;
    mappedEvent: <T_10>() => _events.CMappedEvent<T_10>;
    text: <T_11 extends Record<string, import("./types").Primitive>, K_3 extends import("./types").TextObj>(textTemplate: string, obj?: K_3 | import("./types").IObservable<T_11> | undefined) => Node;
    generateUID(idNumber?: number | undefined): string;
    uuidv4(): string;
    removeFromList: <T_12>(item: T_12, list?: T_12[] | undefined) => boolean;
    camelToDash: (str: any) => any;
    isObject: (obj: any) => boolean;
    isArray: (obj: any) => boolean;
    val: <T_13>(val: T_13 | ((...args: any) => T_13), ...args: any[]) => T_13;
    swapItems: (array: any[], from: number, to: number) => any[];
    arraysEqual: (a?: any[] | undefined, b?: any[] | undefined) => boolean;
    deepEquals: (a: any, b: any) => boolean;
    genCss: (styleSheet: Record<string, import("./types").NestedStyleMap> | Record<string, import("./types").NestedStyleMap>[]) => string;
    genBlock: (selector: string, style: import("./types").NestedStyleMap) => string;
    genBlockContent: (selector: string, style: import("./types").NestedStyleMap) => string[];
    state: <T_14>(initialValue: T_14) => import("./types").State<T_14>;
    listState: <T_15>(initialData: T_15[]) => {
        readonly list: import("./types").State<import("./types").State<T_15>[]>;
        readonly listValue: import("./types").State<T_15>[];
        add: (item: T_15) => void;
        addAt: (item: T_15, index: number) => void;
        remove: any;
        removeWhere: any;
        length: import("./types").IObservable<number>;
    };
    stateAdd: <T_16>(state: import("./types").State<T_16[]>, item: T_16) => void;
    stateAddAt: <T_17>(state: import("./types").State<T_17[]>, item: T_17, index: number) => void;
    stateRemoveWhere: <T_18>(state: import("./types").State<T_18[]>, cb: (item: T_18, index: number) => boolean) => void;
    stateRemove: <T_19>(state: import("./types").State<T_19[]>, item: T_19) => void;
    CTag: typeof _tag.CTag;
    tag: (arg0: string | HTMLElement, children?: import("./types").TagChildren, mountToParent?: boolean) => _tag.CTag;
};

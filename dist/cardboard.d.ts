import * as _tag from './tag.js';
import * as _events from './events.js';
import * as _consumables from './consumables.js';
import * as _routing from './ext/routing.js';
export * from './tag.js';
export * from './state.js';
export * from './css-generator.js';
export * from './util.js';
export * from './text.js';
export * from './events.js';
export * from './each.js';
export * from './lifecycle.js';
export * from './consumables.js';
export * from './ext/routing.js';
export type * from './types';
export declare const Cardboard: {
    onLifecycle(tag: _tag.CTag, onStart?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined, onRemove?: ((tag: _tag.CTag) => void) | undefined, beforeRemove?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined): void;
    createGlobalObserver: () => {
        onAdded: _events.CEvent<Node>;
        onRemoved: _events.CEvent<Node>;
    };
    withLifecycle: (tag: _tag.CTag, handler: {
        start?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined;
        removed?: ((tag: _tag.CTag) => void) | undefined;
        beforeRemove?: ((tag: _tag.CTag) => boolean | Promise<boolean>) | undefined;
    }) => _tag.CTag;
    Consumable: typeof _consumables.Consumable;
    isConsumable: (obj: any) => boolean;
    createConsumable: <T>(val: T, destroyer?: (() => void) | undefined) => _consumables.Consumable<T>;
    intersect: <T, K>(other: import("./types").IConsumable<T>, intersector: (val: T) => K) => import("./types").IConsumable<K>;
    intersectMulti: <T_1 extends import("./types").IConsumable<any>[], K_1>(consumables: [...T_1], intersector: (...v_0: _consumables.ExtractValue<T_1>) => K_1) => import("./types").IConsumable<K_1>;
    getValue: <T_2>(val: import("./types").IConsumableOr<T_2>) => T_2;
    greaterThan: (cons: import("./types").IConsumable<number>, val?: number | import("./types").IConsumable<number>) => import("./types").IConsumable<boolean>;
    greaterThanOr: (cons: import("./types").IConsumable<number>, val?: import("./types").IConsumableOr<number>) => import("./types").IConsumable<boolean>;
    lessThan: (cons: import("./types").IConsumable<number>, val?: import("./types").IConsumableOr<number>) => import("./types").IConsumable<boolean>;
    lessThanOr: (cons: import("./types").IConsumable<number>, val?: import("./types").IConsumableOr<number>) => import("./types").IConsumable<boolean>;
    equalTo: <T_3>(cons: import("./types").IConsumable<T_3>, val: import("./types").IConsumableOr<T_3>) => import("./types").IConsumable<boolean>;
    notEqualTo: <T_4>(cons: import("./types").IConsumable<T_4>, val: import("./types").IConsumableOr<T_4>) => import("./types").IConsumable<boolean>;
    isEmpty: <T_5 extends import("./types").WithLength>(cons: import("./types").IConsumable<T_5>) => import("./types").IConsumable<boolean>;
    notEmpty: <T_6 extends import("./types").WithLength>(cons: import("./types").IConsumable<T_6>) => import("./types").IConsumable<boolean>;
    grab: <T_7, K_2 extends keyof T_7>(cons: import("./types").IConsumable<T_7>, key: K_2, defaultVal?: T_7[K_2] | undefined) => import("./types").IConsumable<T_7[K_2] | undefined>;
    Router: typeof _routing.Router;
    router: _routing.Router<any> | undefined;
    makeRouter: <T_8 extends Record<string, _routing.Route> = Record<string, _routing.Route>>(opts: _routing.RouterOptions<T_8>) => _routing.Router<T_8>;
    Link: (child: string | _tag.CTag, path: any, query?: Record<string, string> | undefined) => _tag.CTag;
    CEvent: typeof _events.CEvent;
    CMappedEvent: typeof _events.CMappedEvent;
    singleEvent: <T_9>() => _events.CEvent<T_9>;
    mappedEvent: <T_10>() => _events.CMappedEvent<T_10>;
    text: <T_11 extends Record<string, import("./types").Primitive>, K_3 extends import("./types").TextObj>(textTemplate: string, obj?: K_3 | import("./types").IConsumable<T_11> | undefined) => Node;
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
    state: <T_14>(initialValue: T_14) => import("./types").IConsumable<T_14>;
    listState: <T_15>(initialData: T_15[]) => {
        readonly list: import("./types").IConsumable<import("./types").IConsumable<T_15>[]>;
        readonly listValue: import("./types").IConsumable<T_15>[];
        add: (item: T_15) => void;
        addAt: (item: T_15, index: number) => void;
        remove: any;
        removeWhere: any;
        length: import("./types").IConsumable<number>;
    };
    stateAdd: <T_16>(cons: import("./types").IConsumable<T_16[]>, item: T_16) => void;
    stateAddAt: <T_17>(cons: import("./types").IConsumable<T_17[]>, item: T_17, index: number) => void;
    stateRemoveWhere: <T_18>(cons: import("./types").IConsumable<T_18[]>, cb: (item: T_18, index: number) => boolean) => void;
    stateRemove: <T_19>(cons: import("./types").IConsumable<T_19[]>, item: T_19) => void;
    context: {
        attached?: _tag.CTag | undefined;
        stack: _tag.CTag[];
        observer?: {
            onAdded: _events.CEvent<Node>;
            onRemoved: _events.CEvent<Node>;
        } | undefined;
    };
    attached: () => _tag.CTag | undefined;
    CTag: typeof _tag.CTag;
    tag: (arg0: string | HTMLElement, children?: import("./types").TagChildren, attach?: boolean) => _tag.CTag;
    attach: (tag: _tag.CTag) => _tag.CTag;
    detach: () => void;
    detachAll: () => void;
    init: (options?: {
        root: string;
    }) => _tag.CTag;
    allTags: import("./types").AllTags;
};

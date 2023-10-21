export * from './tag.js';
export * from './state.js';
export * from './css-generator.js';
export * from './util.js';
export * from './text.js';
export * from './events.js';
export * from './ext/routing.js';
import * as _tag from './tag.js';
import * as _css from './css-generator.js';
import * as _events from './events.js';
import * as _routing from './ext/routing.js';
export declare const Cardboard: {
    makeRouter<T extends Record<string, string | ((router: _routing.Router<any>) => _tag.CTag)> = {}>(opts: {
        rootParent: _tag.CTag;
        routes: T;
        initialRoute: string;
        fallbackRoute?: string;
        noRouteBuilder?: (router: _routing.Router<any>) => _tag.CTag;
        window?: Window & typeof globalThis;
        start?: (route: _tag.CTag) => boolean | Promise<boolean>;
        remove?: (route: _tag.CTag) => boolean | Promise<boolean>;
        beforeRemove?: (route: _tag.CTag) => boolean | Promise<boolean>;
    }): _routing.Router<T>;
    Link(child: string | _tag.CTag, path: any, query?: Record<string, string>): _tag.CTag;
    Router: typeof _routing.Router;
    router: _routing.Router<any>;
    singleEvent<T_1>(): _events.CEvent<T_1>;
    mappedEvent<K extends string, T_2>(): _events.CMappedEvent<K, T_2>;
    CEvent: typeof _events.CEvent;
    CMappedEvent: typeof _events.CMappedEvent;
    text<T_3>(textTemplate: string, values?: import("./types.js").State<T_3>): Node;
    removeFromList<T_4>(item: T_4, list: T_4[]): boolean;
    isObject(obj: any): boolean;
    isArray(obj: any): boolean;
    camelToDash: (str: any) => any;
    toJson: (possiblyJsonString: any) => any;
    fromJson: (possiblyJson: any) => string;
    val: <T_5>(val: T_5 | ((...args: any) => T_5), ...args: any[]) => T_5;
    CssGenerator: typeof _css.CssGenerator;
    state<T_6 extends object>(content: T_6, fn?: (newValue: T_6) => void): import("./types.js").State<T_6>;
    attached(): _tag.CTag;
    tag(arg0: string | HTMLElement, children?: import("./types.js").TagChildren, attach?: boolean): _tag.CTag;
    onLifecycle(tag: _tag.CTag, onStart?: (tag: _tag.CTag) => boolean | Promise<boolean>, onRemove?: (tag: _tag.CTag) => void, beforeRemove?: (tag: _tag.CTag) => boolean | Promise<boolean>): MutationObserver;
    attach(tag: _tag.CTag): _tag.CTag;
    detach(): void;
    detachAll(): void;
    init(options?: {
        root: string;
    }): _tag.CTag;
    CTag: typeof _tag.CTag;
    withLifecycle: (tag: _tag.CTag, handler: {
        start?: (tag: _tag.CTag) => boolean | Promise<boolean>;
        removed?: (tag: _tag.CTag) => void;
        beforeRemove?: (tag: _tag.CTag) => boolean | Promise<boolean>;
    }) => _tag.CTag;
    allTags: import("./types.js").AllTags;
};

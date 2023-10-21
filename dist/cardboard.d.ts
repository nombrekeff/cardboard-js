export * from './tag.js';
export * from './state.js';
export * from './css-generator.js';
export * from './util.js';
export * from './text.js';
export * from './events.js';
export * from './ext/routing.js';
export type * from './types';
import * as _tag from './tag.js';
import * as _events from './events.js';
import * as _routing from './ext/routing.js';
export declare const Cardboard: {
    makeRouter<T extends Record<string, _routing.Route> = {}>(opts: _routing.RouterOptions<T>): _routing.Router<T>;
    Link(child: string | _tag.CTag, path: any, query?: Record<string, string>): _tag.CTag;
    Router: typeof _routing.Router;
    router: _routing.Router<any>;
    singleEvent<T_1>(): _events.CEvent<T_1>;
    mappedEvent<K extends string, T_2>(): _events.CMappedEvent<K, T_2>;
    CEvent: typeof _events.CEvent;
    CMappedEvent: typeof _events.CMappedEvent;
    text(textTemplate: string, values?: Record<string, any>): Node;
    removeFromList<T_3>(item: T_3, list: T_3[]): boolean;
    isObject(obj: any): boolean;
    isArray(obj: any): boolean;
    camelToDash: (str: any) => any;
    toJson: (possiblyJsonString: any) => any;
    fromJson: (possiblyJson: any) => string;
    val: <T_4>(val: T_4 | ((...args: any) => T_4), ...args: any[]) => T_4;
    genCss(styleSheet: {
        [key: string]: import("./types").NestedStyleMap;
    } | {
        [key: string]: import("./types").NestedStyleMap;
    }[]): string;
    genBlock(selector: string, style: import("./types").NestedStyleMap): string;
    genBlockContent(selector: string, style: import("./types").NestedStyleMap): string[];
    genStyle(name: string, value: string): string;
    state<T_5 extends object>(content: T_5, fn?: (newValue: T_5) => void): import("./types").State<T_5>;
    attached(): _tag.CTag;
    tag(arg0: string | HTMLElement, children?: import("./types").TagChildren, attach?: boolean): _tag.CTag;
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
    allTags: import("./types").AllTags;
};

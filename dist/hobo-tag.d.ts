import { CssGenerator } from './css-generator.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { StyleMap, StyleSet, TagChildren, TagConfig } from './types.js';
export declare let context: {
    attachedTag: HoboTag;
    attachedTagStack: HoboTag[];
    css: CssGenerator;
};
export declare function attached(): HoboTag<HTMLElement>;
export declare class HoboTag<T extends HTMLElement = HTMLElement> {
    element: T;
    parent: HoboTag;
    /** If set to true, it will not be appended to it's parent */
    private silent;
    get children(): Node[];
    get value(): string;
    set value(newValue: string);
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, silent?: boolean);
    set(children: TagChildren): void;
    add(...children: TagChildren): this;
    consume<T>(consumable: Consumable<T>, consumer: (self: HoboTag, newValue: T) => void): this;
    text(text: any): this;
    config(config: TagConfig): this;
    addClass(...classNames: string[]): this;
    className(className: string): this;
    rmClass(...classNames: string[]): this;
    replaceClass(targetClass: string, replaceClass: string): this;
    addStyle(styles: StyleMap): this;
    rmStyle(...styleNames: string[]): this;
    addAttrs(attrs: {
        [k: string]: string;
    }): this;
    rmAttr(...attrs: string[]): this;
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: HoboTag, evt: HTMLElementEventMap[K]) => void): this;
    clicked(fn: (tag: HoboTag, evt: MouseEvent) => void): this;
    keyPressed(fn: (tag: HoboTag, evt: KeyboardEvent) => void, key?: string): this;
    changed(fn: (tag: HoboTag, evt: Event) => void): this;
    submited(fn: (tag: HoboTag, evt: SubmitEvent) => void): this;
    remove(): void;
    clear(): void;
    q(selector: any): HoboTag<HTMLElement>;
    find(test: (el: HTMLElement) => boolean): Node;
    static find(selector: string): HoboTag<HTMLElement>;
}
export declare function tag(arg0: string | HTMLElement, children?: TagChildren, silent?: boolean): HoboTag<HTMLElement>;
export declare function attach(tag: HoboTag): void;
export declare function detach(): void;
export declare function init(options?: {
    root: string;
}): void;
type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
export declare const allTags: {
    [key in ValidTagName]?: ((...children: PickArgType<key>) => HoboTag) & {
        silent: (...children: PickArgType<key>) => HoboTag;
    };
};
export {};

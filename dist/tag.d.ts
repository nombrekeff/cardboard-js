import { CssGenerator } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { StyleMap, StyleSet, TagChildren, TagConfig } from './types.js';
export declare let context: {
    attachedTag: CTag;
    attachedTagStack: CTag[];
    css: CssGenerator;
};
export declare function attached(): CTag<HTMLElement>;
export declare class CTag<T extends HTMLElement = HTMLElement> {
    element: T;
    parent: CTag;
    /** If set to true, it will not be appended to it's parent */
    private silent;
    get children(): Node[];
    get value(): string;
    set value(newValue: string);
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, silent?: boolean);
    set(children: TagChildren): void;
    add(...children: TagChildren): this;
    consume<T>(consumable: Consumable<T>, consumer: (self: CTag, newValue: T) => void): this;
    listen<K extends keyof HTMLElementEventMap>(tag: CTag, evt: K, consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void): this;
    text(text: any): this;
    config(config: TagConfig): this;
    addClass(...classNames: string[]): this;
    className(className: string): this;
    rmClass(...classNames: string[]): this;
    replaceClass(targetClass: string, replaceClass: string): this;
    setStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>): void;
    addStyle(styles: StyleMap): this;
    rmStyle(...styleNames: string[]): this;
    addAttrs(attrs: {
        [k: string]: string;
    }): this;
    setAttr(key: string, value: string): void;
    rmAttr(...attrs: string[]): this;
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    clicked(fn: (tag: CTag, evt: MouseEvent) => void): this;
    keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): this;
    changed(fn: (tag: CTag, evt: Event) => void): this;
    submited(fn: (tag: CTag, evt: SubmitEvent) => void): this;
    remove(): this;
    clear(): this;
    disable(): this;
    enable(): this;
    q(selector: any): CTag<HTMLElement>;
    find(test: (el: HTMLElement) => boolean): Node;
    static find(selector: string): CTag<HTMLElement>;
}
export declare function tag(arg0: string | HTMLElement, children?: TagChildren, silent?: boolean): CTag<HTMLElement>;
export declare function attach(tag: CTag): void;
export declare function detach(): void;
export declare function init(options?: {
    root: string;
}): void;
type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
export declare const allTags: {
    [key in ValidTagName]?: ((...children: PickArgType<key>) => CTag) & {
        silent: (...children: PickArgType<key>) => CTag;
    };
};
export {};

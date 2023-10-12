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
    /** If set to true, it be appended to the attached tag */
    private attachable;
    private meta;
    get children(): Node[];
    get value(): any;
    get id(): string;
    setId(id: string): this;
    setValue(newValue: string): this;
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, attachable?: boolean);
    set(children: TagChildren): void;
    add(...children: TagChildren): this;
    /** Whenever the consumable changes, it will call the consumer */
    consume<T>(consumable: Consumable<T>, consumer: (self: CTag, newValue: T) => void): this;
    doIf(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void): this;
    doIfNot(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void): this;
    show(): boolean;
    hide(): void;
    /** Hide this element if the consumer is truthy */
    hideIf(consumable: Consumable<boolean | number>): this;
    /** Hide this element if the consumer is falsy */
    hideIfNot(consumable: Consumable<boolean | number>): this;
    /** Adds classes to the element if the consumer is truthy */
    classIf(consumable: Consumable<any>, ...classes: string[]): this;
    /** Adds classes to the element if the consumer is truthy */
    classIfNot(consumable: Consumable<any>, ...classes: string[]): this;
    /** Add attribute to the element if the consumer is truthy */
    attrIf(consumable: Consumable<any>, attr: string, value?: string): this;
    /** Add attribute to the element if the consumer is truthy */
    attrIfNot(consumable: Consumable<any>, attr: string, value?: string): this;
    /** Disable this element if the consumer is truthy */
    disableIf(consumable: Consumable<any>): this;
    /** Disable this element if the consumer is truthy */
    disableIfNot(consumable: Consumable<any>): this;
    listen<K extends keyof HTMLElementEventMap>(tag: CTag, evt: K, consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void): this;
    text(text: any): this;
    config(config: TagConfig): this;
    addClass(...classNames: string[]): this;
    className(className: string): this;
    rmClass(...classNames: string[]): this;
    hasClass(...classNames: string[]): boolean;
    replaceClass(targetClass: string, replaceClass: string): this;
    addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>): this;
    setStyle(styles: StyleMap): this;
    rmStyle(...styleNames: string[]): this;
    hasStyle(...styles: string[]): boolean;
    setAttrs(attrs: {
        [k: string]: string;
    }): this;
    addAttr(key: string, value: string): this;
    rmAttr(...attrs: string[]): this;
    hasAttr(...attr: string[]): boolean;
    getAttr(attr: string): any;
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    once<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    clicked(fn: (tag: CTag, evt: MouseEvent) => void): this;
    keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): this;
    changed(fn: (tag: CTag, evt: Event) => void): this;
    submited(fn: (tag: CTag, evt: SubmitEvent) => void): this;
    remove(): this;
    clear(): this;
    disable(): this;
    enable(): this;
    setDisabled(disabled: boolean): void;
    q(selector: any): CTag | undefined;
    find(test: (el: HTMLElement) => boolean): CTag<HTMLElement>;
    private _childrenFilterPredicate;
}
export declare function tag(arg0: string | HTMLElement, children?: TagChildren, attach?: boolean): CTag<HTMLElement>;
export declare function attach(tag: CTag): void;
export declare function detach(): void;
export declare function detachAll(): void;
export declare function init(options?: {
    root: string;
}): CTag<HTMLElement>;
type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
type AllTags = {
    [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
        attach: (...children: PickArgType<key>) => CTag;
    };
};
export declare const allTags: AllTags;
export {};

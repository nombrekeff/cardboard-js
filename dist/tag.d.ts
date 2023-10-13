import { CssGenerator } from './css-generator.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { Consumable } from './state.js';
import { TagName, ValidTagName } from './tag-names.js';
import { StyleMap, StyleSet, TagChild, TagChildren, TagConfig } from './types.js';
type CTree = {
    [key: string]: TagChild;
};
export declare let context: {
    attachedTag: CTag;
    attachedTagStack: CTag[];
    css: CssGenerator;
    tree: CTree;
};
/** Returns the currently attached {CTag}*/
export declare function attached(): CTag<HTMLElement>;
/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export declare class CTag<T extends HTMLElement = HTMLElement> {
    element: T;
    parent: CTag;
    _children: any[];
    /** If set to true, it be appended to the attached tag */
    private attachable;
    private meta;
    get children(): Node[];
    get value(): any;
    get id(): string;
    setId(id: string): this;
    setValue(newValue: string): this;
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, attachable?: boolean);
    /** Sets the children, removes previous children  */
    setChildren(children: TagChildren): void;
    append(...children: TagChildren): this;
    /** Whenever the consumable changes, it will call the consumer */
    consume<T>(consumable: Consumable<T>, consumer: (self: CTag, newValue: T) => void): this;
    /**
     * When the consumable changes, it will call {ifTrue} if the consumable is true. Or {ifFalse} if the consumable is false.
     */
    doIf(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void): this;
    /**
     * The oposite of {this.doIf}
     * When the consumable changes, it will call {ifTrue} if the consumable is false. Or {ifFalse} if the consumable is true.
     */
    doIfNot(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void): this;
    /**
     * If the element is currently hidden it will add this element to the page
     */
    show(): boolean;
    /** Hide this element (removed from DOM) */
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
    /** Set the `textContent` of the element */
    text(text: any): this;
    /**
     * Configure the element in a single call by passing @param {TagConfig} config
     * instead of having to call a method for each property you want to changes
     */
    config(config: TagConfig): this;
    /** Add classes to the elements class list */
    addClass(...classNames: string[]): this;
    /** Set the elements class name */
    className(className: string): this;
    /** Remove classes from class list */
    rmClass(...classNames: string[]): this;
    /** Check if classes are present in this element */
    hasClass(...classNames: string[]): boolean;
    /** Replace a class with another */
    replaceClass(targetClass: string, replaceClass: string): this;
    /** Toggle a class. If it's present it's removed, if it's not present its added. */
    toggleClass(targetClass: string): this;
    /** Add a single style */
    addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>): this;
    /** Set multiple styles at once */
    setStyle(styles: StyleMap): this;
    /** Remove styles */
    rmStyle(...styleNames: string[]): this;
    /** Check if this element has styles */
    hasStyle(...styles: string[]): boolean;
    setAttrs(attrs: {
        [k: string]: string;
    }): this;
    addAttr(key: string, value: string): this;
    rmAttr(...attrs: string[]): this;
    hasAttr(...attr: string[]): boolean;
    getAttr(attr: string): any;
    /** Add an event listener for a particular event */
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /** Add an event listener for a particular event that will only fire once */
    once<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /** Add a **click** event listener */
    clicked(fn: (tag: CTag, evt: MouseEvent) => void): this;
    /** Add a **keypress** event listener */
    keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): this;
    /** Add a **change** event listener */
    changed(fn: (tag: CTag, evt: Event) => void): this;
    /** Add a **submit** event listener */
    submited(fn: (tag: CTag, evt: SubmitEvent) => void): this;
    /** Remove element from the DOM */
    remove(): this;
    /** Clear the `value` */
    clear(): this;
    /** Disable the element */
    disable(): this;
    /** Enable the element */
    enable(): this;
    /** Set whether the element should be disabled or not */
    setDisabled(disabled: boolean): void;
    /** Query a child in this element */
    q(selector: any): CTag | undefined;
    private _childrenFilterPredicate;
}
export declare function tag(arg0: string | HTMLElement, children?: TagChildren, attach?: boolean): CTag<HTMLElement>;
export declare function attach(tag: CTag): void;
export declare function detach(): void;
export declare function detachAll(): void;
export declare function init(options?: {
    root: string;
}): CTag<HTMLElement>;
export declare function getElementIndex(node: Element): number;
export declare function isSelector(str: string): RegExpMatchArray;
export declare function getElementForChild(cl: TagChild): Node;
export declare function getElementChildren(element: HTMLElement): Node[];
type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
type AllTags = {
    [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
        attach: (...children: PickArgType<key>) => CTag;
    };
};
export declare const allTags: AllTags;
export {};

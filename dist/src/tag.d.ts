import type { AllTags, IObservable, Primitive, StyleMap, TagChild, TagChildren, TagConfig, TextObj } from './types';
import { type CEvent } from './events.js';
import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { TagName } from './tag-names.js';
import { CommonAttributes } from './attributes.js';
export declare const context: {
    mountPoint?: CTag;
    mountPointHistory: CTag[];
    observer?: {
        onAdded: CEvent<Node>;
        onRemoved: CEvent<Node>;
    };
};
/**
 * Returns the current mountPoint {@link CTag}. See {@link mountPoint} for more information.
 */
export declare const getMountPoint: () => CTag | undefined;
/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export declare class CTag {
    /** Reference to the HTMLElement that this @type {CTag} represents */
    el: HTMLElement & {
        remove: () => (Promise<boolean> | any);
    };
    /**
     * Any function inside this array, will be called whenever the CTag is {@link destroy}ed
     * Used to remove HTML Event Listeners and Observable listeners
     */
    private readonly _destroyers;
    /** @param parent Reference to the parent @type {CTag} of this element */
    private _parent?;
    get parent(): CTag | undefined;
    set parent(newParent: CTag);
    /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
    private _children;
    private _cachedChildren;
    get children(): Node[];
    private readonly _meta;
    get value(): any;
    setValue(newValue: string): this;
    get checked(): any;
    setChecked(checked: boolean): this;
    get style(): CSSStyleDeclaration;
    get className(): string;
    get classList(): DOMTokenList;
    /** Gets the value of the element and clears the value */
    get consumeValue(): any;
    get id(): string;
    setId(id: string): this;
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, mountToParent?: boolean);
    /** Sets the children, removes previous children  */
    setChildren(children: TagChildren): this;
    append(...children: TagChildren): this;
    prepend(...children: TagChildren): this;
    /**
     * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
     * I will be placed exactly in the correct position, even if there are other elements hidden.
     */
    show(): Promise<boolean>;
    /** Hide this element (removed from DOM) */
    hide(): Promise<void>;
    /** Whenever the observable changes, it will call the consumer */
    consume<T>(observable: IObservable<T>, consumer: (self: CTag, newValue?: T) => void): this;
    /**
     * When the observable changes, it will call {ifTrue} when the observable is true. Or {ifFalse} when the observable is false.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
     */
    doIf<T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void, invert?: boolean): this;
    /**
     * The oposite of {this.doIf}
     * When the observable changes, it will call {ifTrue} if the observable is false. Or {ifFalse} if the observable is true.
     */
    doIfNot<T>(observable: IObservable<T>, ifTrue: (value: T) => void, ifFalse: (value: T) => void): this;
    /**
     * Hide this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
     */
    hideIf<T>(observable: IObservable<T>, invert?: boolean): this;
    /** Hide this element when the consumer is falsy. Updates whenever the observable changes. */
    hideIfNot<T>(observable: IObservable<T>): this;
    /**
     * Adds classes to the element when the consumer is truthy. Updates whenever the observable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
     */
    classIf<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[]), invert?: boolean): this;
    /**
     * Adds classes to the element when the consumer is falsy. Updates whenever the observable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * For the oposite you can also use {@link classIf}
     */
    classIfNot<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[])): this;
    /**
     * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
     */
    textIf<T>(observable: IObservable<T>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     */
    textIfNot<T>(observable: IObservable<T>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string)): this;
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf<T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed
     */
    attrIfNot<T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string)): this;
    /**
     * Disable this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf<T>(observable: IObservable<T>, invert?: boolean): this;
    /** Disable this element when the consumer is falsy. Updates whenever the observable changes. */
    disableIfNot<T>(observable: IObservable<T>): this;
    /**
     * Add style to the element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
     * {value} can be a string or a function that returns a string.
     */
    styleIf<T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     */
    styleIfNot<T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string)): this;
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap), invert?: boolean): this;
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap)): this;
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen<K extends keyof HTMLElementEventMap>(tag: CTag, evt: K, consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void): CTag;
    /**
     * If {newText} is provided, it sets the `textContent` of the element.
     * If {newText} is provided, and a state is provided. It will use the {newText} as a template,
     * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
     *
     * If no argument is provided, it returns the `textContent` of the element.
     * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
     */
    text<T extends Record<string, Primitive>, K extends TextObj, J extends string>(textTemplate?: string, obj?: IObservable<T> | K): J extends string ? CTag : string;
    /**
     * Configure the element in a single call by passing @param {TagConfig} c
     * instead of having to call a method for each property you want to changes
     */
    config(c: TagConfig): this;
    /** Add classes to the elements class list */
    addClass(...classes: string[]): this;
    /** Set the elements class name */
    setClassName(className: string): this;
    /** Remove classes from class list */
    rmClass(...classes: string[]): this;
    /** Check if classes are present in this element */
    hasClass(...classes: string[]): boolean;
    /** Replace a class with another */
    replaceClass(targetClass: string, replaceClass: string): this;
    /** Toggle a class. If it's present it's removed, if it's not present its added. */
    toggleClass(targetClass: string): CTag;
    /** Add a single style */
    addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>): this;
    /** Set multiple styles at once */
    setStyle(styles: StyleMap): this;
    /** Remove styles */
    rmStyle(...styleNames: string[]): this;
    /** Check if this element has styles */
    hasStyle(...styles: CssProperty[]): boolean;
    /** Adds a set of attributes to the element */
    setAttrs(attrs: Record<string, string | undefined>): this;
    /** Adds a single attribute to the element */
    addAttr(key: CommonAttributes, value?: string): this;
    /** Remove attributes from the element */
    rmAttr(...attrs: CommonAttributes[]): this;
    /** Check if this element has attributes */
    hasAttr(...attr: CommonAttributes[]): boolean;
    /** Get an attributes value */
    getAttr(attr: CommonAttributes): any;
    /**
     * Returns a {@link IObservable} that fires when the Event {@link evtName} is fired in this element
     *
     * The return value of {@link fn} will be passed to the listeners of the {@link IObservable}
     */
    when<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (self: CTag, evt: HTMLElementEventMap[K]) => any): IObservable<any>;
    /** Add an event listener for a particular event */
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /** Add an event listener for a particular event that will only fire once */
    once<K extends keyof HTMLElementEventMap>(evtName: K & string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /** Add a **click** event listener */
    clicked(fn: (tag: CTag, evt: MouseEvent) => void): this;
    /** Add a **keypress** event listener */
    keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): this;
    /** Add a **change** event listener */
    changed(fn: (tag: CTag, evt: Event) => void): this;
    /** Add a **submit** event listener */
    submited(fn: (tag: CTag, evt: SubmitEvent) => void): this;
    /**
     * Remove element from the DOM, but keep data as is. Can then be added again.
     * To fully remove the element use {@link destroy}
     */
    remove(): Promise<this>;
    /**
     * Destroy the element, should not be used afterwards
     */
    destroy(): void;
    /**
     * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
     */
    clear(): this;
    /** Disable the element */
    disable(): this;
    /** Enable the element */
    enable(): this;
    /** Set whether the element should be disabled or not */
    setDisabled(disabled: boolean): this;
    /** Query a child in this element (in the DOM) */
    q(selector: any): CTag | undefined;
    /** Find a child in this element (in the DOM or NOT) */
    find(predicate: (el: TagChild) => boolean): string | Node | CTag | IObservable<any> | undefined;
    findTag(predicate: (el: CTag) => boolean): CTag | undefined;
    private _childrenFilterPredicate;
    private _getElementForChild;
    private _observer;
    private _getChildren;
    private _cacheChildren;
    private _mapChildren;
}
/**
 * This function can do the following based on the first argument:
 * * create a tag if you provide a tag name: (`div`, `abbr`, `custom-tag`, ...),
 * * wrap around an existing element in the page if you pass in a selector: (`'(body)'`, `'(#id)'`, `'(.class)'`), any selector is allowed.
 * * wrap around an element passed in
 *
 * Then it can receive a list of children to be added.
 * Receives a third argument for mounting this tag to the currently mounted tag ({@link mountPoint}).
 *
 * @example
 * ```ts
 * tag('div');
 * tag('(body)');
 * tag('(.someclass)');
 * tag(document.querySelector('#something'));
 * ```
 */
export declare const tag: (arg0: string | HTMLElement, children?: TagChildren, mountToParent?: boolean) => CTag;
/**
 * Makes the given tag the mount point. This means that when other tags are created with "mountToParent" or  (using `<tag_name>.mount()`, `tag('<tag_name>', [], true)`),
 * they will be added as children of this tag.
 * You can call mountPoint multiple times, and the last mount point tag will be used.
 * Then when you've finished, you can call {@link restoreMountPoint} to go back to the previously mounted tag if there is one.
 * You can clear all mount points using {@link clearMountPoints}.
 *
 * @example
 * ```ts
 * mountPoint(div()); // Div 1
 * div.mount();  // added as child of div
 * p.mount();    // added as child of div
 *
 * mountPoint(div()); // Div 2
 * div.mount();  // added as child of new div
 * p.mount();    // added as child of new div
 *
 * restoreMountPoint();      // Back to div 1
 * clearMountPoints();       // Clears all mount points, no mount point after this call
 * ```
 */
export declare const mountPoint: (tag: CTag) => CTag;
/**
 * Restore the currently mounted tag ({@link mountPoint}).
 * Goes back in the stack of mount points tags.
 * If there is no previous mount point tag, it will not do anything.
 */
export declare const restoreMountPoint: () => void;
/**
 * Restores all mount points. There will be no mount points tag after calling this function.
 */
export declare const clearMountPoints: () => void;
/**
 * Clears the mount point history and resets the mount point to the first one.
 * This means that the mount point will be the first tag that was mounted,
 * and all other mount points will be cleared.
 */
export declare const resetMountPoints: () => void;
export type ScopedCallback = (tag: CTag) => void;
/**
 * Sets the mount point to the given tag, calls the scoped callback, and then restores the mount point.
 * Useful for creating a temporary mount point for a specific tag, and then restoring the previous mount point.
 *
 * @param tag
 * @param scopedCallback
 */
export declare const withMountPoint: (tag: CTag, scopedCallback: ScopedCallback) => void;
/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
export declare const init: (options?: {
    selector: string;
}) => CTag;
/**
 * List of all HTML tag functions. From `div` to `abbr` :)
 * If you want to create any other tag, use the {@link tag} function.
 *
 * @type {AllTags}
 * @example
 * ```ts
 * const { div, p, abbr, img, style, ... } = allTags;
 * ```
 */
export declare const allTags: AllTags;

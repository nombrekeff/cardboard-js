import { CssProperty } from './css-properties.js';
import { PickPropertyValues } from './css-property-values.js';
import { TagName } from './tag-names.js';
import { AllTags, Consumable, State, StyleMap, TagChild, TagChildren, TagConfig } from './types.js';
/**
 * Returns the currently attached {@link CTag}. See {@link attach} for more information.
 */
export declare function attached(): CTag;
/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
export declare class CTag {
    /** Reference to the HTMLElement that this @type {CTag} represents */
    element: HTMLElement;
    /** Reference to the parent @type {CTag} of this element */
    parent: CTag;
    /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
    private _children;
    /** If set to true, it be appended to the attached tag */
    private attachable;
    private meta;
    get children(): Node[];
    get value(): any;
    /** Gets the value of the element and clears the value */
    get consumeValue(): any;
    get id(): string;
    setId(id: string): this;
    setValue(newValue: string): this;
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, attachable?: boolean);
    /** Sets the children, removes previous children  */
    setChildren(children: TagChildren): this;
    append(...children: TagChildren): this;
    prepend(...children: TagChildren): this;
    /** Whenever the consumable changes, it will call the consumer */
    consume<T>(consumable: Consumable<T>, consumer: (self: CTag, newValue: T) => void): this;
    /**
     * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
     * I will be placed exactly in the correct position, even if there are other elements hidden.
     */
    show(): boolean;
    /** Hide this element (removed from DOM) */
    hide(): void;
    /**
     * When the consumable changes, it will call {ifTrue} when the consumable is true. Or {ifFalse} when the consumable is false.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
     */
    doIf(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void, invert?: boolean): this;
    /**
     * The oposite of {this.doIf}
     * When the consumable changes, it will call {ifTrue} if the consumable is false. Or {ifFalse} if the consumable is true.
     */
    doIfNot(consumable: Consumable<any>, ifTrue: (value: any) => void, ifFalse: (value: any) => void): this;
    /**
     * Hide this element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
     */
    hideIf(consumable: Consumable<boolean | number>, invert?: boolean): this;
    /** Hide this element when the consumer is falsy. Updates whenever the consumable changes. */
    hideIfNot(consumable: Consumable<boolean | number>): this;
    /**
     * Adds classes to the element when the consumer is truthy. Updates whenever the consumable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
     */
    classIf(consumable: Consumable<any>, classes: string[] | ((self: CTag) => string[]), invert?: boolean): this;
    /**
     * Adds classes to the element when the consumer is falsy. Updates whenever the consumable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * For the oposite you can also use {@link classIf}
     */
    classIfNot(consumable: Consumable<any>, classes: string[] | ((self: CTag) => string[])): this;
    /**
     * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
     */
    textIf(consumable: Consumable<any>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the consumable changes.
     */
    textIfNot(consumable: Consumable<any>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string)): this;
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the consumable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf(consumable: Consumable<any>, attr: string, value?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the consumable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed
     */
    attrIfNot(consumable: Consumable<any>, attr: string, value?: string | ((self: CTag) => string)): this;
    /**
     * Disable this element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf(consumable: Consumable<any>, invert?: boolean): this;
    /** Disable this element when the consumer is falsy. Updates whenever the consumable changes. */
    disableIfNot(consumable: Consumable<any>): this;
    /**
     * Add style to the element when the consumer is truthy. Updates whenever the consumable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
     * {value} can be a string or a function that returns a string.
     */
    styleIf(consumable: Consumable<any>, style: string, value?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the consumable changes.
     * {value} can be a string or a function that returns a string.
     */
    styleIfNot(consumable: Consumable<any>, style: string, value?: string | ((self: CTag) => string)): this;
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the consumable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf(consumable: Consumable<any>, styles: StyleMap | ((self: CTag) => StyleMap), invert?: boolean): this;
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the consumable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot(consumable: Consumable<any>, styles: StyleMap | ((self: CTag) => StyleMap)): this;
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen<K extends keyof HTMLElementEventMap>(tag: CTag, evt: K, consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /**
     * If {newText} is provided, it sets the `textContent` of the element.
     * If {newText} is provided, and a state is provided. It will use the {newText} as a template,
     * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
     *
     * If no argument is provided, it returns the `textContent` of the element
     */
    text<T = string | null>(newText?: T, st?: State<any>): T extends string ? CTag : string;
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
    hasStyle<K extends CssProperty>(...styles: K[]): boolean;
    /** Adds a set of attributes to the element */
    setAttrs(attrs: {
        [k: string]: string;
    }): this;
    /** Adds a single attribute to the element */
    addAttr(key: string, value: string): this;
    /** Remove attributes from the element */
    rmAttr(...attrs: string[]): this;
    /** Check if this element has attributes */
    hasAttr(...attr: string[]): boolean;
    /** Get an attributes value */
    getAttr(attr: string): any;
    /**
     * Returns a {@link Consumable} that fires when the Event {@param evtName} is fired in this element
     *
     * The return value of {@link fn} will be passed to the listeners of the {@link Consumable}
     */
    when<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (self: CTag) => any): Consumable;
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
    /**
     * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
     */
    clear(): this;
    /** Disable the element */
    disable(): this;
    /** Enable the element */
    enable(): this;
    /** Set whether the element should be disabled or not */
    setDisabled(disabled: boolean): void;
    /** Query a child in this element (in the DOM) */
    q(selector: any): CTag | undefined;
    /** Find a child in this element (in the DOM or NOT) */
    find(predicate: (el: TagChild) => boolean): TagChild;
    findTag(predicate: (el: CTag) => boolean): CTag;
    private _childrenFilterPredicate;
    private _getElementForChild;
    private _getElementChildren;
}
/**
 * This function can do the following based on the first argument:
 * * create a tag if you provide a tag name: (`div`, `abbr`, `custom-tag`, ...),
 * * wrap around an existing element in the page if you pass in a selector: (`'(body)'`, `'(#id)'`, `'(.class)'`), any selector is allowed.
 * * wrap around an element passed in
 *
 * Then it can receive a list of children to be added.
 * And receives a third argument for attaching this tag to the currently attach tag ({@link attach})
 *
 * @example
 * ```ts
 * tag('div');
 * tag('(body)');
 * tag('(.someclass)');
 * tag(document.querySelector('#something'));
 * ```
 */
export declare function tag(arg0: string | HTMLElement, children?: TagChildren, attach?: boolean): CTag;
/**
 * Attach the given tag. This means that when other tags are created marked as attachable (using `<tag_name>.attach()`, `tag('<tag_name>', [], true)`),
 * they will be added as children of this tag.
 * You can call attach multiple times, and the last attach tag will be used.
 * Then when you've finished, you can call {@link detach} to go back to the previously attached tag if there is one, or clear the attached tag.
 *
 * @example
 * ```ts
 * attach(div());
 * div.attach();  // added as child of div
 * p.attach();    // added as child of div
 *
 * attach(div()); // New div
 * div.attach();  // added as child of new div
 * p.attach();    // added as child of new div
 *
 * detach();      // Back to previous div
 * detach();      // No attached tag
 * ```
 */
export declare function attach(tag: CTag): void;
/**
 * Detach the currently attached tag ({@link attach}). If there was another attached tag before it will become the currently attached tag.
 * If there are no previous attached tags, it will clear the attached tag.
 */
export declare function detach(): void;
/**
 * Detaches all attached tags. There will be no attached tag after calling this function.
 */
export declare function detachAll(): void;
/**
 * It makes the body the attached tag ({@link attach}).
 * You can pass in a selector for an element you want to be the default attached tag.
 */
export declare function init(options?: {
    root: string;
}): CTag;
/**
 * List of all HTML tag functions. From `div` to `abbr` :)
 * If you want to create any other tag, use the {@link tag} function.
 *
 * @example
 * ```ts
 * const { div, p, abbr, img, style, ... } = allTags;
 * ```
 */
export declare const allTags: AllTags;

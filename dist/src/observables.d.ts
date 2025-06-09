import { CEvent } from './events.js';
import type { IObservable, IObservableOr, WithLength } from './types.js';
/**
 * A class that holds a value and notifies whenever the value changes.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
export declare class Observable<T = any> extends CEvent<T> implements IObservable<T> {
    private _value;
    private readonly _destroyer?;
    get value(): T;
    /** Set the value, and dispatch to all listeners. */
    set value(val: T);
    constructor(val: T, destroyer?: () => void);
    valueOf(): T;
    toString(): any;
    /**
     * Add a listener for when this Observable changes.
     */
    changed(callback: (val: T) => void): this;
    /**
    * Remove a listener for when this Observable changes.
    */
    remove(callback: (val: T) => void): this;
    /**
     * Set's the new value, and calls all the listeners.
     * You can additionaly set the {@link value} directly.
     */
    dispatch(val: T): this;
    destroy(): void;
    /**
     * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
     * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
     *
     * @example
     * ```ts
     * const value = createObservable(2);
     * const isGreater = value.computed((value) => value > 5);
     * // > isGreater == false;
     * value.dispatch(6);
     * // > isGreater == true;
     * ```
     */
    computed: <K>(transform: (val: T) => K) => any;
    /** @see {@link greaterThan} */
    greaterThan: (val?: IObservableOr<number> | number) => IObservable<boolean>;
    /** @see {@link greaterThanOr} */
    greaterThanOr: (val?: IObservableOr<number>) => IObservable<boolean>;
    /** @see {@link lessThan} */
    lessThan: (val?: IObservableOr<number>) => IObservable<boolean>;
    /** @see {@link lessThanOr} */
    lessThanOr: (val?: IObservableOr<number>) => IObservable<boolean>;
    /** @see {@link equalTo} */
    equalTo: <K>(val: IObservableOr<K>) => IObservable<boolean>;
    /** @see {@link notEqualTo} */
    notEqualTo: <K>(val: IObservableOr<K>) => IObservable<boolean>;
    /** @see {@link isEmpty} */
    isEmpty: <K extends WithLength>() => IObservable<boolean>;
    /** @see {@link notEmpty} */
    notEmpty: <K extends WithLength>() => IObservable<boolean>;
    /** @see {@link grab} */
    grab: <K extends keyof T>(key: K, defaultVal?: T[K] | undefined) => IObservable<T[K] | undefined>;
}
/** Check if a given object {@link obj} is a {@link Observable}  */
export declare const isObservable: (obj: any) => boolean;
/**
 * Create a new {@link Observable}
 * > Consider using `state(...)` instead.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
export declare const createObservable: <T>(val: T, destroyer?: () => void) => IObservable<T>;
/**
 * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
 * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
 *
 * @example
 * ```ts
 * const value = createObservable(2);
 * // Create a derived observable that is true if value > 5
 * const isGreater = compute(value, (v) => v > 5);
 * // isGreater.value == false
 * value.dispatch(6);
 * // isGreater.value == true
 * ```
 */
export declare const compute: <T, K>(other: IObservable<T>, transform: (val: T) => K) => IObservable<K>;
export type ExtractValue<T extends Array<IObservable<any>>> = {
    [K in keyof T]: T[K] extends IObservable<infer V> ? V : never;
};
export declare const computeMultiple: <T extends IObservable<any>[], K>(observables: [...T], transform: (...v_0: ExtractValue<T>) => K) => IObservable<K>;
export declare const getValue: <T>(val: IObservableOr<T>) => T;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than {@link val} */
export declare const greaterThan: (observable: IObservable<number>, val?: IObservable<number> | number) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than or equal {@link val} */
export declare const greaterThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than {@link val} */
export declare const lessThan: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than or equal {@link val} */
export declare const lessThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is equal to {@link val} */
export declare const equalTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT equal to {@link val} */
export declare const notEqualTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export declare const isEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export declare const notEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} that is equal to some property of the original {@link Observable} */
export declare const grab: <T, K extends keyof T>(observable: IObservable<T>, key: K, defaultVal?: T[K] | undefined) => IObservable<T[K] | undefined>;

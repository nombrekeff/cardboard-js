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
     * Add a listener for when this Consumable changes.
     */
    changed(callback: (val: T) => void): this;
    /**
    * Remove a listener for when this Consumable changes.
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
    computed<K>(transform: (val: T) => K): any;
}
/** Check if a given object {@link obj} is a {@link Observable}  */
export declare const isObservable: (obj: any) => boolean;
/**
 * Create a new {@link Observable}
 * > Consider using `state(...)` instead.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
export declare const createObservable: <T>(val: T, destroyer?: () => void) => Observable<T>;
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
export declare const greaterThan: (cons: IObservable<number>, val?: IObservable<number> | number) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than or equal {@link val} */
export declare const greaterThanOr: (cons: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than {@link val} */
export declare const lessThan: (cons: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than or equal {@link val} */
export declare const lessThanOr: (cons: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is equal to {@link val} */
export declare const equalTo: <T>(cons: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT equal to {@link val} */
export declare const notEqualTo: <T>(cons: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export declare const isEmpty: <T extends WithLength>(cons: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export declare const notEmpty: <T extends WithLength>(cons: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} that is equal to some property of the original {@link Observable} */
export declare const grab: <T, K extends keyof T>(cons: IObservable<T>, key: K, defaultVal?: T[K] | undefined) => IObservable<T[K] | undefined>;

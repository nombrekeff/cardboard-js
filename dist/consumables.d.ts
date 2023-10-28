import { CEvent } from './events.js';
import type { IConsumable, IConsumableOr, WithLength } from './types';
/**
 * A class that holds a value. Listeners can be attached and whenever a new value is dispatched, the listeners are called.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export declare class Consumable<T = any> extends CEvent<T> implements IConsumable<T> {
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
     * Create a new {@link Consumable} that intersects this {@link Consumable}.
     * The new Consumable updates its value based on this {@link Consumable}.
     *
     * @example
     * ```ts
     * const value = createConsumable(2);
     * const isGreater = value.intersect((value) => value > 5);
     * // > isGreater == false;
     * value.dispatch(6);
     * // > isGreater == true;
     * ```
     */
    intersect<K>(intersector: (val: T) => K): any;
}
/** Check if a given object {@link obj} is a {@link Consumable}  */
export declare const isConsumable: (obj: any) => boolean;
/**
 * Create a new {@link Consumable}
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export declare const createConsumable: <T>(val: T, destroyer?: () => void) => Consumable<T>;
/**
 * Creates a new {@link Consumable} that intersects another {@link Consumable}.
 * The new {@link Consumable} updates and dispatches whenever the other {@link Consumable} changes.
 *
 * @example
 * ```ts
 * const value = createConsumable(2);
 * const isGreater = intersect(cons, (value) => value > 5);
 * // > isGreater == false;
 * value.dispatch(6);
 * // > isGreater == true;
 * ```
 */
export declare const intersect: <T, K>(other: IConsumable<T>, intersector: (val: T) => K) => IConsumable<K>;
export type ExtractValue<T extends Array<IConsumable<any>>> = {
    [K in keyof T]: T[K] extends IConsumable<infer V> ? V : never;
};
export declare const intersectMulti: <T extends IConsumable<any>[], K>(consumables: [...T], intersector: (...v_0: ExtractValue<T>) => K) => IConsumable<K>;
export declare const getValue: <T>(val: IConsumableOr<T>) => T;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than {@link val} */
export declare const greaterThan: (cons: IConsumable<number>, val?: IConsumable<number> | number) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than or equal {@link val} */
export declare const greaterThanOr: (cons: IConsumable<number>, val?: IConsumableOr<number>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than {@link val} */
export declare const lessThan: (cons: IConsumable<number>, val?: IConsumableOr<number>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than or equal {@link val} */
export declare const lessThanOr: (cons: IConsumable<number>, val?: IConsumableOr<number>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is equal to {@link val} */
export declare const equalTo: <T>(cons: IConsumable<T>, val: IConsumableOr<T>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT equal to {@link val} */
export declare const notEqualTo: <T>(cons: IConsumable<T>, val: IConsumableOr<T>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export declare const isEmpty: <T extends WithLength>(cons: IConsumable<T>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export declare const notEmpty: <T extends WithLength>(cons: IConsumable<T>) => IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} that is equal to some property of the original {@link Consumable} */
export declare const grab: <T, K extends keyof T>(cons: IConsumable<T>, key: K, defaultVal?: T[K] | undefined) => IConsumable<T[K] | undefined>;

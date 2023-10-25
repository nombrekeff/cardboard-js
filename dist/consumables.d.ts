import { CEvent } from './events.js';
import { IConsumable } from './types.js';
/**
 * A class that holds a value. Listeners can be attached and whenever a new value is dispatched, the listeners are called.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export declare class Consumable<T = any> extends CEvent<T> implements IConsumable<T> {
    private _value;
    private _prev;
    get value(): T;
    /** Set the value, and dispatch to all listeners. */
    set value(val: T);
    get prev(): T;
    constructor(val: T);
    valueOf(): T;
    toString(): any;
    /**
     * Add a listener for when this Consumable changes.
     */
    changed(callback: (val: T) => void): this;
    /**
     * Set's the new value, and calls all the listeners.
     * You can additionaly set the {@link value} directly.
     */
    dispatch(val: T): this;
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
export declare function isConsumable(obj: any): boolean;
/**
 * Create a new {@link Consumable}
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export declare function createConsumable<T>(val: T): Consumable<T>;
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
export declare function intersect<T, K>(other: IConsumable<T>, intersector: (val: T) => K): IConsumable<K>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than {@link val} */
export declare function greaterThan(consumable: IConsumable<number>, val: number): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than or equal {@link val} */
export declare function greaterThanOr(consumable: IConsumable<number>, val: number): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than {@link val} */
export declare function lessThan(consumable: IConsumable<number>, val: number): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than or equal {@link val} */
export declare function lessThanOr(consumable: IConsumable<number>, val: number): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is equal to {@link val} */
export declare function equalTo<T>(consumable: IConsumable<T>, val: T): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT equal to {@link val} */
export declare function notEqualTo<T>(consumable: IConsumable<T>, val: T): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export declare function isEmpty(consumable: IConsumable<string | any[]>): IConsumable<boolean>;
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export declare function notEmpty(consumable: IConsumable<string | any[]>): IConsumable<boolean>;

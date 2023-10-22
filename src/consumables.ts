import { CEvent } from './events.js';
import type { IConsumable } from './types';

/**
 * A class that holds a value. Listeners can be attached and whenever a new value is dispatched, the listeners are called.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export class Consumable<T> extends CEvent<T> implements IConsumable<T> {
  private _value: T;
  private _prev: T;

  get value(): T {
    return this._value;
  }

  get prev(): T {
    return this._prev;
  }

  /** Set the value, and dispatch to all listeners. */
  set value(val: T) {
    this.dispatch(val);
  }

  constructor(val?: T) {
    super();
    this._value = val;
    this._prev = val;
  }

  valueOf() {
    return this._value;
  }

  toString() {
    return this._value.toString();
  }

  /**
   * Add a listener for when this Consumable changes.
   */
  changed(callback: (val: T) => void) {
    this.listen(callback);
  }

  /**
   * Set's the new value, and calls all the listeners.
   * You can additionaly set the {@link value} directly.
   */
  dispatch(val: T) {
    // Make sure assining the value is before the dispatch call,
    // otherwise Consumable value is not update when the listeners are called
    this._prev = val;
    this._value = val;
    super.dispatch(val);
  }

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
  intersect<K>(intersector: (val: T) => K) {
    return intersect(this, intersector);
  }
}

/** Check if a given object {@link obj} is a {@link Consumable}  */
export function isConsumable(obj: any) {
  return obj instanceof Consumable;
}

/**
 * Create a new {@link Consumable}
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export function createConsumable<T>(val: T): Consumable<T> {
  return new Consumable<T>(val);
}

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
export function intersect<T, K>(
  other: IConsumable<T>,
  intersector: (val: T) => K,
): Consumable<K> {
  const consumable = createConsumable<K>(intersector(other.value));
  other.changed((val) => consumable.dispatch(intersector(val)));
  return consumable as any;
}

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than {@link val}*/
export function greaterThan(consumable: IConsumable<number>, val: number) {
  return intersect(consumable, (newVal) => newVal > val);
}

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than or equal {@link val}*/
export function greaterThanOr(consumable: IConsumable<number>, val: number) {
  return intersect(consumable, (newVal) => newVal >= val);
}

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than {@link val}*/
export function lessThan(consumable: IConsumable<number>, val: number) {
  return intersect(consumable, (newVal) => newVal < val);
}

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than or equal {@link val}*/
export function lessThanOr(consumable: IConsumable<number>, val: number) {
  return intersect(consumable, (newVal) => newVal <= val);
}

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is equal to {@link val}*/
export function equalTo<T>(consumable: IConsumable<T>, val: T) {
  return intersect(consumable, (newVal) => newVal === val);
}

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT equal to {@link val}*/
export function notEqualTo<T>(consumable: IConsumable<T>, val: T) {
  return intersect(consumable, (newVal) => newVal !== val);
}

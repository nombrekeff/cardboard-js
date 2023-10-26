import { CEvent } from './events.js';
import { isArray, isObject } from './util.js';
import type { IConsumable, IConsumableOr, WithLength } from './types';

/**
 * A class that holds a value. Listeners can be attached and whenever a new value is dispatched, the listeners are called.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export class Consumable<T = any> extends CEvent<T> implements IConsumable<T> {
  private _value: T;
  private _prev: T;

  get value(): T {
    return this._value;
  }

  /** Set the value, and dispatch to all listeners. */
  set value(val: T) {
    this.dispatch(val);
  }

  get prev(): T {
    return this._prev;
  }

  constructor(val: T) {
    super();

    if (val && (isObject(val) || isArray(val))) {
      val = new Proxy((val as any), {
        get(target, p, receiver) {
          return target[p];
        },
        set: (target, p, newValue, receiver) => {
          if (target[p] === newValue) return true;

          target[p] = newValue;
          super.dispatch(target);
          return true;
        },
        deleteProperty: (target, p) => {
          delete target[p];
          super.dispatch(target);
          return true;
        },
      });
    }

    this._value = val;
    this._prev = val;
  }

  valueOf() {
    return this._value;
  }

  toString() {
    return (this._value as any).toString();
  }

  /**
   * Add a listener for when this Consumable changes.
   */
  changed(callback: (val: T) => void) {
    this.listen(callback);
    return this;
  }

  /**
   * Set's the new value, and calls all the listeners.
   * You can additionaly set the {@link value} directly.
   */
  dispatch(val: T) {
    if (val === this._value) {
      return this;
    }
    // Make sure assining the value is before the dispatch call,
    // otherwise Consumable value is not update when the listeners are called
    this._prev = this._value;
    this._value = val;
    super.dispatch(val);
    return this;
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
export const isConsumable = (obj: any) => {
  return obj instanceof Consumable;
};

/**
 * Create a new {@link Consumable}
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export const createConsumable = <T>(val: T): Consumable<T> => {
  return new Consumable<T>(val);
};

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
export const intersect = <T, K>(
  other: IConsumable<T>,
  intersector: (val: T) => K,
): IConsumable<K> => {
  const cons = createConsumable<K>(intersector(other.value));
  other.changed((val) => cons.dispatch(intersector(val)));
  return cons as any;
};

export type ExtractValue<T extends Array<IConsumable<any>>> =
  { [K in keyof T]: T[K] extends IConsumable<infer V> ? V : never };

export const intersectMulti = <T extends IConsumable[], K>(
  consumables: [...T],
  intersector: (...v: [...ExtractValue<T>]) => K,
): IConsumable<K> => {
  const cons = createConsumable<K>(intersector(...(consumables.map(c => c.value) as any)));

  for (const other of consumables) {
    other.changed(() => cons.dispatch(
      intersector(...(consumables.map(c => c.value) as any))
    ));
  }
  return cons as any;
};

export const getValue = <T>(val: IConsumableOr<T>): T => {
  return isConsumable(val) ? (val as IConsumable<T>).value : val as T;
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than {@link val} */
export const greaterThan = (cons: IConsumable<number>, val: IConsumable<number> | number = 0) => {
  return intersect(cons, (newVal) => newVal > getValue(val));
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than or equal {@link val} */
export const greaterThanOr = (cons: IConsumable<number>, val: IConsumableOr<number> = 0) => {
  return intersect(cons, (newVal) => newVal >= getValue(val));
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than {@link val} */
export const lessThan = (cons: IConsumable<number>, val: IConsumableOr<number> = 0) => {
  return intersect(cons, (newVal) => newVal < getValue(val));
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than or equal {@link val} */
export const lessThanOr = (cons: IConsumable<number>, val: IConsumableOr<number> = 0) => {
  return intersect(cons, (newVal) => newVal <= getValue(val));
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is equal to {@link val} */
export const equalTo = <T>(cons: IConsumable<T>, val: IConsumableOr<T>) => {
  return intersect(cons, (newVal) => newVal === getValue(val));
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT equal to {@link val} */
export const notEqualTo = <T>(cons: IConsumable<T>, val: IConsumableOr<T>) => {
  return intersect(cons, (newVal) => newVal !== getValue(val));
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export const isEmpty = <T extends WithLength>(cons: IConsumable<T>) => {
  return intersect(cons, (newVal) => newVal.length <= 0);
};

/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export const notEmpty = <T extends WithLength>(cons: IConsumable<T>) => {
  return intersect(cons, (newVal) => newVal.length > 0);
};

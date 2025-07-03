import { CEvent } from './events.js';
import { isArray, isObject } from './util.js';
import type { IObservable, IObservableOr, WithLength } from './types.js';

/**
 * A class that holds a value and notifies whenever the value changes.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
export class Observable<T = any> extends CEvent<T> implements IObservable<T> {
  private _value: T;
  private readonly _destroyer?: () => void;

  get value(): T {
    return this._value;
  }

  /** Set the value, and dispatch to all listeners. */
  set value(val: T) {
    this.dispatch(val);
  }

  constructor(val: T, destroyer?: () => void) {
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
    this._destroyer = destroyer;
  }

  valueOf() {
    return this._value;
  }

  toString() {
    return (this._value as any).toString();
  }

  /**
   * Add a listener for when this Observable changes.
   */
  changed(callback: (val: T) => void) {
    this.listen(callback);
    return this;
  }

  /**
  * Remove a listener for when this Observable changes.
  */
  remove(callback: (val: T) => void) {
    super.remove(callback);
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
    this._value = val;
    super.dispatch(val);
    return this;
  }

  destroy() {
    if (this._destroyer) this._destroyer();
    (this._value as any) = null;
    super.destroy();
  }

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
  computed = <K>(transform: (val: T) => K) => compute(this, transform);

  /** @see {@link greaterThan} */
  greaterThan = (val: IObservableOr<number> | number = 0) => greaterThan(this as any, val);
  /** @see {@link greaterThanOr} */
  greaterThanOr = (val: IObservableOr<number> = 0) => greaterThanOr(this as any, val);
  /** @see {@link lessThan} */
  lessThan = (val: IObservableOr<number> = 0) => lessThan(this as any, val);
  /** @see {@link lessThanOr} */
  lessThanOr = (val: IObservableOr<number> = 0) => lessThanOr(this as any, val);
  /** @see {@link equalTo} */
  equalTo = <K>(val: IObservableOr<K>) => equalTo(this as any, val);
  /** @see {@link notEqualTo} */
  notEqualTo = <K>(val: IObservableOr<K>) => notEqualTo(this as any, val);
  /** @see {@link isEmpty} */
  isEmpty = <K extends WithLength>() => isEmpty(this as any as IObservable<K>);
  /** @see {@link notEmpty} */
  notEmpty = <K extends WithLength>() => notEmpty(this as any as IObservable<K>);
  /** @see {@link grab} */
  grab = <K extends keyof T>(key: K, defaultVal?: T[K]) => grab(this as any, key, defaultVal);
}

/** 
 * Check if a given object `obj` is a {@link Observable}  
 * * @param obj - The object to check.
 * @returns `true` if the object is an {@link Observable}, `false` otherwise
 */
export const isObservable = (obj: any) => {
  return obj instanceof Observable;
};

/**
 * Create a new {@link Observable}  
 * > Consider using `state(...)` instead.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 * 
 * @param val - The initial value of the observable.
 * @param destroyer - An optional function to call when the observable is destroyed.
 * @returns A new {@link Observable} instance.
 */
export const createObservable = <T>(val: T, destroyer?: () => void): IObservable<T> => {
  return new Observable<T>(val, destroyer);
};

/**
 * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
 * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
 *
 * @param other - The source {@link Observable} to derive the value from.
 * @param transform - A function that takes the value of the source {@link Observable} and returns the derived value.
 * @return A new {@link Observable} that will contain the derived value.
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
export const compute = <T, K>(
  other: IObservable<T>,
  transform: (val: T) => K,
): IObservable<K> => {
  // eslint-disable-next-line prefer-const
  let observable: IObservable<K> | null;

  const cb = (val) => observable?.dispatch(transform(val));

  observable = createObservable<K>(transform(other.value), () => {
    // remove callback in other observable when destroyed
    // remove references, free memory
    other.remove(cb);
    observable = null;
    (other as any) = null;
  });

  other.changed(cb);

  return observable as any;
};

export type ExtractValue<T extends Array<IObservable<any>>> =
  { [K in keyof T]: T[K] extends IObservable<infer V> ? V : never };

/**
 * Computes a new {@link Observable} from multiple observables.
 * The new {@link Observable} will automatically update and notify listeners whenever any of the source observables change.
 * 
 * @param observables - An array of source {@link Observable}s to derive the value from.
 * @param transform - A function that takes the values of the source observables and returns the derived value.
 * @returns A new {@link Observable} that will contain the derived value. 
 */
export const computeMultiple = <T extends IObservable[], K>(
  observables: [...T],
  transform: (...v: [...ExtractValue<T>]) => K,
): IObservable<K> => {
  const cons = createObservable<K>(transform(...(observables.map(c => c.value) as any)));

  for (const other of observables) {
    other.changed(() => cons.dispatch(
      transform(...(observables.map(c => c.value) as any))
    ));
  }
  return cons as any;
};

/** Returns the value from an observable. Convenience method if you prefer it instead of `observable.value` */
export const getValue = <T>(val: IObservableOr<T>): T => {
  return isObservable(val) ? (val as IObservable<T>).value : val as T;
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than `val` */
export const greaterThan = (observable: IObservable<number>, val: IObservable<number> | number = 0) => {
  return compute(observable, (newVal) => newVal > getValue(val));
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than or equal `val` */
export const greaterThanOr = (observable: IObservable<number>, val: IObservableOr<number> = 0) => {
  return compute(observable, (newVal) => newVal >= getValue(val));
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than `val` */
export const lessThan = (observable: IObservable<number>, val: IObservableOr<number> = 0) => {
  return compute(observable, (newVal) => newVal < getValue(val));
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than or equal `val` */
export const lessThanOr = (observable: IObservable<number>, val: IObservableOr<number> = 0) => {
  return compute(observable, (newVal) => newVal <= getValue(val));
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is equal to `val` */
export const equalTo = <T>(observable: IObservable<T>, val: IObservableOr<T>) => {
  return compute(observable, (newVal) => newVal === getValue(val));
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT equal to `val` */
export const notEqualTo = <T>(observable: IObservable<T>, val: IObservableOr<T>) => {
  return compute(observable, (newVal) => newVal !== getValue(val));
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export const isEmpty = <T extends WithLength>(observable: IObservable<T>) => {
  return compute(observable, (newVal) => newVal.length <= 0);
};

/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export const notEmpty = <T extends WithLength>(observable: IObservable<T>) => {
  return compute(observable, (newVal) => newVal.length > 0);
};

/** {@link compute} an observable and return a new {@link Observable} that is equal to some property of the original {@link Observable} */
export const grab = <T, K extends keyof T>(observable: IObservable<T>, key: K, defaultVal?: T[K]) => {
  return compute(observable, (newVal) => newVal ? (newVal[key] ? newVal[key] : defaultVal) : defaultVal);
};


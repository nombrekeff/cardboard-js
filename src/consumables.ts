import { CEvent } from './events.js';
import type { IConsumable, Consumable as _Consumable } from './types.js';

class Consumable<T> extends CEvent<T> implements IConsumable<T> {
  _value: T;
  get value(): T {
    return this._value;
  }
  constructor(val?: T) {
    super();
    this._value = val;
  }
  valueOf() {
    return this._value;
  }

  toString() {
    return this._value.toString();
  }

  changed(callback: (newValue: T) => void) {
    this.listen(callback);
  }

  dispatch(val: T) {
    // Make sure assining the value is before the dispatch call,
    // otherwise Consumable value is not update when the listeners are called
    this._value = val;
    super.dispatch(val);
  }

  updateVal(value: T) {
    this._value = value;
  }
}
export function isConsumable(obj: any) {
  return obj instanceof Consumable;
}
export function createConsumable<T>(val: T): Consumable<T> {
  return new Consumable<T>(val);
}

export function intersect<T, K>(
  consumable: IConsumable<T>,
  intersector: (ogVal: T) => K,
): Consumable<K> {
  const cons = createConsumable<K>(intersector(consumable.value));

  consumable.changed((newVal) => cons.dispatch(intersector(newVal)));

  return cons as any;
}

export function greaterThan(consumable: IConsumable<number>, val: number) {
  return intersect(consumable, (newVal) => newVal > val);
}

export function lessThan(consumable: IConsumable<number>, val: number) {
  return intersect(consumable, (newVal) => newVal < val);
}

export function equalTo<T>(consumable: IConsumable<T>, val: T) {
  return intersect(consumable, (newVal) => newVal === val);
}

export function notEqualTo<T>(consumable: IConsumable<T>, val: T) {
  return intersect(consumable, (newVal) => newVal !== val);
}

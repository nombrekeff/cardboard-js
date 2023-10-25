import { CEvent } from './events.js';
import { isArray, isObject } from './util.js';
/**
 * A class that holds a value. Listeners can be attached and whenever a new value is dispatched, the listeners are called.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export class Consumable extends CEvent {
    get value() {
        return this._value;
    }
    /** Set the value, and dispatch to all listeners. */
    set value(val) {
        this.dispatch(val);
    }
    get prev() {
        return this._prev;
    }
    constructor(val) {
        super();
        if (isObject(val) || isArray(val)) {
            val = new Proxy(val, {
                get(target, p, receiver) {
                    return target[p];
                },
                set: (target, p, newValue, receiver) => {
                    if (target[p] === newValue)
                        return true;
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
        return this._value.toString();
    }
    /**
     * Add a listener for when this Consumable changes.
     */
    changed(callback) {
        this.listen(callback);
        return this;
    }
    /**
     * Set's the new value, and calls all the listeners.
     * You can additionaly set the {@link value} directly.
     */
    dispatch(val) {
        if (val === this._value) {
            return this;
        }
        // Make sure assining the value is before the dispatch call,
        // otherwise Consumable value is not update when the listeners are called
        this._prev = val;
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
    intersect(intersector) {
        return intersect(this, intersector);
    }
}
/** Check if a given object {@link obj} is a {@link Consumable}  */
export function isConsumable(obj) {
    return obj instanceof Consumable;
}
/**
 * Create a new {@link Consumable}
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Consumables
 */
export function createConsumable(val) {
    return new Consumable(val);
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
export function intersect(other, intersector) {
    const consumable = createConsumable(intersector(other.value));
    other.changed((val) => consumable.dispatch(intersector(val)));
    return consumable;
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than {@link val} */
export function greaterThan(consumable, val = 0) {
    return intersect(consumable, (newVal) => newVal > val);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is greater than or equal {@link val} */
export function greaterThanOr(consumable, val = 0) {
    return intersect(consumable, (newVal) => newVal >= val);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than {@link val} */
export function lessThan(consumable, val = 0) {
    return intersect(consumable, (newVal) => newVal < val);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is less than or equal {@link val} */
export function lessThanOr(consumable, val = 0) {
    return intersect(consumable, (newVal) => newVal <= val);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is equal to {@link val} */
export function equalTo(consumable, val) {
    return intersect(consumable, (newVal) => newVal === val);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT equal to {@link val} */
export function notEqualTo(consumable, val) {
    return intersect(consumable, (newVal) => newVal !== val);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export function isEmpty(consumable) {
    return intersect(consumable, (newVal) => newVal.length <= 0);
}
/** {@link intersect} a consumable and return a new {@link Consumable} indicating if the value is NOT empty */
export function notEmpty(consumable) {
    return intersect(consumable, (newVal) => newVal.length > 0);
}
//# sourceMappingURL=consumables.js.map
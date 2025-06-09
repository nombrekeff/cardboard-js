import { CEvent } from './events.js';
import { isArray, isObject } from './util.js';
/**
 * A class that holds a value and notifies whenever the value changes.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
export class Observable extends CEvent {
    get value() {
        return this._value;
    }
    /** Set the value, and dispatch to all listeners. */
    set value(val) {
        this.dispatch(val);
    }
    constructor(val, destroyer) {
        super();
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
        this.computed = (transform) => compute(this, transform);
        /** @see {@link greaterThan} */
        this.greaterThan = (val = 0) => greaterThan(this, val);
        /** @see {@link greaterThanOr} */
        this.greaterThanOr = (val = 0) => greaterThanOr(this, val);
        /** @see {@link lessThan} */
        this.lessThan = (val = 0) => lessThan(this, val);
        /** @see {@link lessThanOr} */
        this.lessThanOr = (val = 0) => lessThanOr(this, val);
        /** @see {@link equalTo} */
        this.equalTo = (val) => equalTo(this, val);
        /** @see {@link notEqualTo} */
        this.notEqualTo = (val) => notEqualTo(this, val);
        /** @see {@link isEmpty} */
        this.isEmpty = () => isEmpty(this);
        /** @see {@link notEmpty} */
        this.notEmpty = () => notEmpty(this);
        /** @see {@link grab} */
        this.grab = (key, defaultVal) => grab(this, key, defaultVal);
        if (val && (isObject(val) || isArray(val))) {
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
        this._destroyer = destroyer;
    }
    valueOf() {
        return this._value;
    }
    toString() {
        return this._value.toString();
    }
    /**
     * Add a listener for when this Observable changes.
     */
    changed(callback) {
        this.listen(callback);
        return this;
    }
    /**
    * Remove a listener for when this Observable changes.
    */
    remove(callback) {
        super.remove(callback);
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
        this._value = val;
        super.dispatch(val);
        return this;
    }
    destroy() {
        if (this._destroyer)
            this._destroyer();
        this._value = null;
        super.destroy();
    }
}
/** Check if a given object {@link obj} is a {@link Observable}  */
export const isObservable = (obj) => {
    return obj instanceof Observable;
};
/**
 * Create a new {@link Observable}
 * > Consider using `state(...)` instead.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
export const createObservable = (val, destroyer) => {
    return new Observable(val, destroyer);
};
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
export const compute = (other, transform) => {
    // eslint-disable-next-line prefer-const
    let observable;
    const cb = (val) => observable === null || observable === void 0 ? void 0 : observable.dispatch(transform(val));
    observable = createObservable(transform(other.value), () => {
        // remove callback in other observable when destroyed
        // remove references, free memory
        other.remove(cb);
        observable = null;
        other = null;
    });
    other.changed(cb);
    return observable;
};
export const computeMultiple = (observables, transform) => {
    const cons = createObservable(transform(...observables.map(c => c.value)));
    for (const other of observables) {
        other.changed(() => cons.dispatch(transform(...observables.map(c => c.value))));
    }
    return cons;
};
export const getValue = (val) => {
    return isObservable(val) ? val.value : val;
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than {@link val} */
export const greaterThan = (observable, val = 0) => {
    return compute(observable, (newVal) => newVal > getValue(val));
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than or equal {@link val} */
export const greaterThanOr = (observable, val = 0) => {
    return compute(observable, (newVal) => newVal >= getValue(val));
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than {@link val} */
export const lessThan = (observable, val = 0) => {
    return compute(observable, (newVal) => newVal < getValue(val));
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than or equal {@link val} */
export const lessThanOr = (observable, val = 0) => {
    return compute(observable, (newVal) => newVal <= getValue(val));
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is equal to {@link val} */
export const equalTo = (observable, val) => {
    return compute(observable, (newVal) => newVal === getValue(val));
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT equal to {@link val} */
export const notEqualTo = (observable, val) => {
    return compute(observable, (newVal) => newVal !== getValue(val));
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export const isEmpty = (observable) => {
    return compute(observable, (newVal) => newVal.length <= 0);
};
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
export const notEmpty = (observable) => {
    return compute(observable, (newVal) => newVal.length > 0);
};
/** {@link compute} an observable and return a new {@link Observable} that is equal to some property of the original {@link Observable} */
export const grab = (observable, key, defaultVal) => {
    return compute(observable, (newVal) => newVal ? (newVal[key] ? newVal[key] : defaultVal) : defaultVal);
};
//# sourceMappingURL=observables.js.map
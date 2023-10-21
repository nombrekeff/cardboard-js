import { CEvent } from './events.js';
class Consumable extends CEvent {
    get value() {
        return this._value;
    }
    constructor(val) {
        super();
        this._value = val;
    }
    valueOf() {
        return this._value;
    }
    toString() {
        return this._value.toString();
    }
    changed(callback) {
        this.listen(callback);
    }
    dispatch(val) {
        // Make sure assining the value is before the dispatch call, 
        // otherwise Consumable value is not update when the listeners are called
        this._value = val;
        super.dispatch(val);
    }
    updateVal(value) {
        this._value = value;
    }
}
export function createConsumable(val) {
    return new Consumable(val);
}
export function intersect(consumable, intersector) {
    const cons = createConsumable(intersector(consumable.value));
    consumable.changed((newVal) => cons.dispatch(intersector(newVal)));
    return cons;
}
export function greaterThan(consumable, val) {
    return intersect(consumable, (newVal) => newVal > val);
}
export function lessThan(consumable, val) {
    return intersect(consumable, (newVal) => newVal < val);
}
export function equalTo(consumable, val) {
    return intersect(consumable, (newVal) => newVal === val);
}
export function notEqualTo(consumable, val) {
    return intersect(consumable, (newVal) => newVal !== val);
}

import { removeFromList } from './util.js';
/**
 * As the name indicates, it's a implementation of an event emitter. Listen to, and trigger, events.
 *
 * @example
 * ```ts
 * const evt = new EventEmitter<bool>();
 * evt.listen(listener);
 * evt.dispatch(true);
 * evt.remove(listener);
 * ```
 */
export class EventEmitter {
    constructor() {
        this._listeners = [];
    }
    listen(callback) {
        this._listeners.push(callback);
        return this;
    }
    remove(callback) {
        removeFromList(callback, this._listeners);
    }
    dispatch(data) {
        this._listeners.forEach((el) => el(data));
        return this;
    }
}
export function eventEmitter() {
    return new EventEmitter();
}
//# sourceMappingURL=events.js.map
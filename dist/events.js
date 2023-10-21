import { removeFromList } from './util.js';
/**
 * As the name indicates, it's an implementation of an event listener/emitter (single events, for multiple events use {@link}). Listen to, and trigger, events.
 *
 * @example
 * ```ts
 * const evt = new CEvent<bool>();
 * evt.listen(listener);
 * evt.dispatch(true);
 * evt.remove(listener);
 * ```
 */
export class CEvent {
    constructor() {
        this._listeners = [];
    }
    listen(fn) {
        this._listeners.push(fn);
    }
    remove(fn) {
        removeFromList(fn, this._listeners);
    }
    dispatch(data) {
        this._listeners.forEach((el) => el(data));
    }
}
export class CMappedEvent {
    constructor() {
        this._listeners = {};
    }
    listen(evt, fn) {
        if (!(evt in this._listeners)) {
            this._listeners[evt] = [fn];
        }
        else {
            this._listeners[evt].push(fn);
        }
    }
    remove(evt, fn) {
        removeFromList(fn, this._listeners[evt]);
    }
    dispatch(evt, data) {
        if (evt in this._listeners) {
            this._listeners[evt].forEach((el) => el(data));
        }
    }
}
export function singleEvent() {
    return new CEvent();
}
export function mappedEvent() {
    return new CMappedEvent();
}

import { removeFromList } from './util.js';
/**
 * Single event listener/emitter, listen to, and trigger events. (for mapped events use {@link CMappedEvent}).
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
/**
 * Mapped event listener/emitter, listen to, and trigger events. (for single events use {@link CEvent}).
 *
 * @example
 * ```ts
 * const evt = new CMappedEvent<bool>();
 * evt.listen('evt', listener);
 * evt.dispatch('evt', true);
 * evt.remove('evt', listener);
 * ```
 */
export class CMappedEvent {
    constructor() {
        this._listeners = {};
    }
    listen(evt, fn) {
        if (!(evt in this._listeners)) {
            this._listeners[evt] = [fn];
        }
        else if (this._listeners[evt]) {
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
export const singleEvent = () => {
    return new CEvent();
};
export const mappedEvent = () => {
    return new CMappedEvent();
};
//# sourceMappingURL=events.js.map
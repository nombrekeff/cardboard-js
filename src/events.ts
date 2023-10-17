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
export class EventEmitter<T> {
  private _listeners: ((data: T) => void)[] = [];

  listen(callback: (data: T) => void) {
    this._listeners.push(callback);
    return this;
  }

  remove(callback: (data: T) => void) {
    removeFromList(callback, this._listeners);
  }

  dispatch(data?: T) {
    this._listeners.forEach((el) => el(data));
    return this;
  }
}

export function eventEmitter<T>() {
  return new EventEmitter<T>();
}

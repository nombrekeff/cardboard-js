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
export class CEvent<T> {
  private readonly _listeners: Array<(data: T | undefined) => void> = [];

  listen(fn: (data?: T) => void) {
    this._listeners.push(fn);
  }

  remove(fn: (data?: T) => void) {
    removeFromList(fn, this._listeners);
  }

  dispatch(data?: T) {
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

export class CMappedEvent<T> {
  private _listeners: Record<string, Array<(data?: T) => void>> = {};

  listen(evt: string, fn: (data?: T) => void) {
    if (!(evt in this._listeners)) {
      this._listeners[evt] = [fn];
    }
    else if (this._listeners[evt]) {
      this._listeners[evt].push(fn);
    }
  }

  remove(evt: string, fn: (data?: T) => void) {
    removeFromList(fn, this._listeners[evt]);
  }

  dispatch(evt: string, data?: T) {
    if (evt in this._listeners) {
      this._listeners[evt].forEach((el) => el(data));
    }
  }
}

export function singleEvent<T>() {
  return new CEvent<T>();
}

export function mappedEvent<T>() {
  return new CMappedEvent<T>();
}

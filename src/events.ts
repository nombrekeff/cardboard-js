import type { CEventCallback } from './types';
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
  private _listeners: ((data: T) => void)[] = [];

  listen(fn: (data: T) => void) {
    this._listeners.push(fn);
  }

  remove(fn: (data: T) => void) {
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

export class CMappedEvent<K extends string = string, T = any> {
  private _listeners: { [key in K]?: CEventCallback[] } = {};

  listen(evt: K, fn: CEventCallback<T>) {
    if (!(evt in this._listeners)) {
      this._listeners[evt] = [fn];
    } else {
      this._listeners[evt].push(fn);
    }
  }

  remove(evt: K, fn: CEventCallback<T>) {
    removeFromList(fn, this._listeners[evt]);
  }

  dispatch(evt: K, data?: T) {
    if (evt in this._listeners) {
      this._listeners[evt].forEach((el) => el(data));
    }
  }
}

export function singleEvent<T>() {
  return new CEvent<T>();
}

export function mappedEvent<K extends string, T>() {
  return new CMappedEvent<K, T>();
}

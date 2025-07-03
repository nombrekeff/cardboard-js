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
  protected _lstrs: Array<(data: T | undefined) => void> = [];

  listen(fn: (data?: T) => void) {
    this._lstrs.push(fn);
  }

  remove(fn: (data?: T) => void) {
    removeFromList(fn, this._lstrs);
  }

  dispatch(data?: T) {
    this._lstrs.forEach((el) => el(data));
  }

  destroy() {
    this._lstrs = [];
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
  private _lstrs: Record<string, Array<(data?: T) => void>> = {};

  listen(evt: string, fn: (data?: T) => void) {
    if (!(evt in this._lstrs)) {
      this._lstrs[evt] = [fn];
    }
    else if (this._lstrs[evt]) {
      this._lstrs[evt].push(fn);
    }
  }

  remove(evt: string, fn: (data?: T) => void) {
    removeFromList(fn, this._lstrs[evt]);
  }

  dispatch(evt: string, data?: T) {
    if (evt in this._lstrs) {
      this._lstrs[evt].forEach((el) => el(data));
    }
  }

  destroy() {
    this._lstrs = {};
  }
}

export const singleEvent = <T>() => {
  return new CEvent<T>();
};

export const mappedEvent = <T>() => {
  return new CMappedEvent<T>();
};

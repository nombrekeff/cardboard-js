import type { CEventCallback } from './types';
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
export declare class CEvent<T> {
    private _listeners;
    listen(fn: (data: T) => void): void;
    remove(fn: (data: T) => void): void;
    dispatch(data?: T): void;
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
export declare class CMappedEvent<K extends string = string, T = any> {
    private _listeners;
    listen(evt: K, fn: CEventCallback<T>): void;
    remove(evt: K, fn: CEventCallback<T>): void;
    dispatch(evt: K, data?: T): void;
}
export declare function singleEvent<T>(): CEvent<T>;
export declare function mappedEvent<K extends string, T>(): CMappedEvent<K, T>;

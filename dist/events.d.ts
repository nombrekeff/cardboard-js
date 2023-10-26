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
    private readonly _listeners;
    listen(fn: (data?: T) => void): void;
    remove(fn: (data?: T) => void): void;
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
export declare class CMappedEvent<T> {
    private _listeners;
    listen(evt: string, fn: (data?: T) => void): void;
    remove(evt: string, fn: (data?: T) => void): void;
    dispatch(evt: string, data?: T): void;
}
export declare const singleEvent: <T>() => CEvent<T>;
export declare const mappedEvent: <T>() => CMappedEvent<T>;

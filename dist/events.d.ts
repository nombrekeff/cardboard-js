type CEventCallback<T = any> = (data: T) => void;
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
export declare class CEvent<T> {
    private _listeners;
    listen(fn: (data: T) => void): this;
    remove(fn: (data: T) => void): void;
    dispatch(data?: T): this;
}
export declare class CMappedEvent<K extends string = string, T = any> {
    private _listeners;
    listen(evt: K, fn: CEventCallback<T>): void;
    remove(evt: K, fn: CEventCallback<T>): void;
    dispatch(evt: K, data?: T): void;
}
export declare function singleEvent<T>(): CEvent<T>;
export declare function mappedEvent<K extends string, T>(): CMappedEvent<K, T>;
export {};

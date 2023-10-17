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
export declare class EventEmitter<T> {
    private _listeners;
    listen(callback: (data: T) => void): this;
    remove(callback: (data: T) => void): void;
    dispatch(data?: T): this;
}
export declare function eventEmitter<T>(): EventEmitter<T>;

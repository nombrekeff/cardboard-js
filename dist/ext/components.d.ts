import { CTag } from '../cardboard.js';
import type { EventCallback, IObservable, NestedStyleMap } from '../types';
type Component<T extends Function> = T & {
    styled: (styles: NestedStyleMap, name?: string) => Component<T>;
};
type AnyFn = (...args: any[]) => CTag;
type ThatFn<F extends AnyFn> = (...args: Parameters<F>) => ReturnType<F>;
export declare function Component<F extends AnyFn>(fn: F): Component<ThatFn<F>>;
export interface HInputOptions<T = string> {
    value?: T | IObservable<T>;
    placeholder?: string;
    tooltip?: string;
    mountToParent?: boolean;
    attr?: Record<string, string | undefined>;
    type?: string;
    input?: EventCallback<'input'>;
    submit?: (tag: CTag, evt: Event) => void;
}
export declare const Input: <T>(options?: HInputOptions<T>) => CTag;
export declare const Checkbox: (options?: HInputOptions<boolean>) => CTag;
export {};

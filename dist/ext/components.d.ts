import { NestedStyleMap, CTag, IObservable, EventCallback } from '../cardboard.js';

type AnyFn = (...args: any[]) => CTag;
type ThatFn<F extends AnyFn> = (...args: Parameters<F>) => ReturnType<F>;
type Component<T extends Function> = T & {
    styled: (styles: NestedStyleMap, name?: string) => Component<T>;
};
declare function Component<F extends AnyFn>(fn: F): Component<ThatFn<F>>;
interface HInputOptions<T = string> {
    value?: T | IObservable<T>;
    placeholder?: string;
    tooltip?: string;
    mountToParent?: boolean;
    attr?: Record<string, string | undefined>;
    type?: string;
    input?: EventCallback<'input'>;
    change?: EventCallback<'change'>;
    submit?: (tag: CTag, evt: Event) => void;
}
declare const Input: Component<ThatFn<(<T>(options?: HInputOptions<T>) => CTag)>>;
declare const Checkbox: (options?: HInputOptions<boolean>) => CTag;

export { type AnyFn, Checkbox, Component, type HInputOptions, Input, type ThatFn };

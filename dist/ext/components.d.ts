import { CTag, IObservable, EventCallback, NestedStyleMap } from '../cardboard.js';

type AnyFn = (...args: any[]) => CTag;
type ComponentFactory<T extends AnyFn> = T & {
    styled: (styles: NestedStyleMap, name?: string) => ComponentFactory<T>;
};
type ThatFn<F extends AnyFn> = (...args: Parameters<F>) => ReturnType<F>;
declare function Component<F extends AnyFn>(fn: F): ComponentFactory<ThatFn<F>>;
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
declare const Input: ComponentFactory<ThatFn<(<T>(options?: HInputOptions<T>) => CTag)>>;
declare const Checkbox: (options?: HInputOptions<boolean>) => CTag;

export { type AnyFn, Checkbox, Component, type ComponentFactory, type HInputOptions, Input, type ThatFn };

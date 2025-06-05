import { CTag } from '../cardboard.js';
import type { EventCallback, IObservable } from '../types';
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

import { CTag } from '../cardboard.js';
import type { EventCallback, IConsumable } from '../types';
export interface HInputOptions<T = string> {
    value?: T | IConsumable<T>;
    placeholder?: string;
    tooltip?: string;
    attach?: boolean;
    attr?: Record<string, string | undefined>;
    type?: string;
    input?: EventCallback<'input'>;
    submit?: (tag: CTag, evt: Event) => void;
}
export declare function Input<T>(options?: HInputOptions<T>): CTag;
export declare function Checkbox(options?: HInputOptions<boolean>): CTag;

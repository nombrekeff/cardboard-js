import { CTag } from '../cardboard.js';
import type { EventCallback } from '../types';
export type HInputOptions = {
    value?: string;
    placeholder?: string;
    tooltip?: string;
    attach?: boolean;
    input?: EventCallback<'input'>;
    submit?: (tag: CTag, evt: Event) => void;
};
export declare function Input(options?: HInputOptions): CTag;

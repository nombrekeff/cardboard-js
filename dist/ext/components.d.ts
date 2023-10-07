import { CTag } from '../cardboard.js';
import { EventCallback } from '../types.js';
export type HInputOptions = {
    value?: string;
    placeholder?: string;
    tooltip?: string;
    attach?: boolean;
    input?: EventCallback<'input'>;
    submit?: (tag: CTag, evt: Event) => void;
};
export declare function hinput(options?: HInputOptions): CTag<HTMLElement>;

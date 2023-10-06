import { HoboTag } from '../hobo-rt.js';
import { EventCallback } from '../types.js';
export type HInputOptions = {
    value?: string;
    placeholder?: string;
    tooltip?: string;
    silent?: boolean;
    change?: EventCallback<'change'>;
    submit?: (tag: HoboTag, evt: Event) => void;
};
export declare function hinput(options?: HInputOptions): HoboTag<HTMLElement>;

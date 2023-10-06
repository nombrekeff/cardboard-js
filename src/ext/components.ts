import { allTags, HoboTag } from '../hobo-rt.js';
import { EventCallback } from '../types.js';
const { input } = allTags;

export type HInputOptions = {
  value?: string;
  placeholder?: string;
  tooltip?: string;
  silent?: boolean;
  change?: EventCallback<'change'>;
  submit?: (tag: HoboTag, evt: Event) => void;
};

export function hinput(options: HInputOptions = {}) {
  const el = options.silent == true ? input.silent() : input();

  el.config({
    attr: { tooltip: options.tooltip, placeholder: options.placeholder },
    on: {
      change: options.change,
      submit: options.submit,
      keypress: (tag, evt) => {
        if (evt.key == 'Enter') {
          options.submit(tag, evt);
        }
      },
    },
    value: options.value ?? '',
  });

  return el;
}

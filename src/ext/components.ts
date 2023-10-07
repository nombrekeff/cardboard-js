import { allTags, CTag } from '../cardboard.js';
import { EventCallback } from '../types.js';
const { input } = allTags;

export type HInputOptions = {
  value?: string;
  placeholder?: string;
  tooltip?: string;
  silent?: boolean;
  input?: EventCallback<'input'>;
  submit?: (tag: CTag, evt: Event) => void;
};

export function hinput(options: HInputOptions = {}) {
  const el = options.silent == true ? input.silent() : input();

  el.config({
    attr: { tooltip: options.tooltip, placeholder: options.placeholder },
    on: {
      input: options.input,
      submit: options.submit,
      keypress: (tag, evt) => {
        if (evt.key == 'Enter') {
          options.submit(el, evt);
        }
      },
    },
    value: options.value ?? '',
  });

  return el;
}

import { allTags, CTag } from '../cardboard.js';
import type { EventCallback } from '../types';
const { input } = allTags;

export interface HInputOptions {
  value?: string;
  placeholder?: string;
  tooltip?: string;
  attach?: boolean;
  input?: EventCallback<'input'>;
  submit?: (tag: CTag, evt: Event) => void;
}

export function Input(options: HInputOptions = {}): CTag {
  const el = options.attach ? input.attach() : input();

  el.config({
    attr: { tooltip: options.tooltip, placeholder: options.placeholder },
    on: {
      input: options.input,
      submit: options.submit,
      keypress: (tag, evt) => {
        if (evt.key === 'Enter' && options.submit) {
          options.submit(el, evt);
        }
      },
    },
    value: options.value ?? '',
  });

  return el;
}

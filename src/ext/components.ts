import { allTags, CTag, isConsumable } from '../cardboard.js';
import type { EventCallback, IConsumable } from '../types';
const { input } = allTags;

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

export function Input<T>(options: HInputOptions<T> = {}): CTag {
  const el = options.attach ? input.attach() : input();
  el.config({
    attr: {
      tooltip: options.tooltip,
      placeholder: options.placeholder,
      ...(options.attr ?? {}),
      type: options.type,
    },
    on: {
      input: (self, evt) => {
        if (options.input) options.input(self, evt);
        if (options.value && isConsumable(options.value)) {
          (options.value as IConsumable).dispatch(el.value);
        }
      },
      submit: options.submit,
      keypress: (tag, evt) => {
        if (evt.key === 'Enter' && options.submit) {
          options.submit(el, evt);
        }
      },
    },
    value: isConsumable(options.value) ? (options.value as IConsumable).value : options.value,
  });
  if (options.value && isConsumable(options.value)) {
    (options.value as IConsumable).changed((newValue) => {
      el.setValue(newValue);
    });
  }

  return el.addClass('CInput');
}

export function Checkbox(options: HInputOptions<boolean> = {}) {
  return Input({
    ...options,
    type: 'checkbox',
  });
}

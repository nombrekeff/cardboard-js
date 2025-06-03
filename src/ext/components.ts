import { allTags, CTag, isObservable } from '../cardboard.js';
import type { EventCallback, IObservable } from '../types';
const { input } = allTags;

export interface HInputOptions<T = string> {
  value?: T | IObservable<T>;
  placeholder?: string;
  tooltip?: string;
  attach?: boolean;
  attr?: Record<string, string | undefined>;
  type?: string;
  input?: EventCallback<'input'>;
  submit?: (tag: CTag, evt: Event) => void;
}

export const Input = <T>(options: HInputOptions<T> = {}): CTag => {
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
        if (options.value && isObservable(options.value)) {
          (options.value as IObservable).dispatch(el.value);
        }
      },
      submit: options.submit,
      keypress: (tag, evt) => {
        if (evt.key === 'Enter' && options.submit) {
          options.submit(el, evt);
        }
      },
    },
    value: isObservable(options.value) ? (options.value as IObservable).value : options.value,
  });
  if (options.value && isObservable(options.value)) {
    (options.value as IObservable).changed((newValue) => {
      el.setValue(newValue);
    });
  }

  return el.addClass('CInput');
};

export const Checkbox = (options: HInputOptions<boolean> = {}) => {
  return Input({
    ...options,
    type: 'checkbox',
  });
};

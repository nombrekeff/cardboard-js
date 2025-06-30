import { allTags, CTag, isObservable, context, uuidv4, withLifecycle } from '../cardboard.js';
import type { EventCallback, IObservable, NestedStyleMap } from '../types';
const { input } = allTags;

type Component<T extends Function> = T & {
  styled: (styles: NestedStyleMap, name?: string) => Component<T>
};
type AnyFn = (...args: any[]) => CTag;
type ThatFn<F extends AnyFn> = (...args: Parameters<F>) => ReturnType<F>;

export function Component<F extends AnyFn>(fn: F): Component<ThatFn<F>> {
  let stylesAreAdded = false;
  let className = uuidv4();
  let stylesheet: NestedStyleMap | undefined;

  const builder = function (...args) {
    if (!stylesheet) return fn(...args);
    if (!stylesAreAdded) {
      stylesAreAdded = true;
      if (stylesheet) {
        context.styleManager?.add({
          [`.${className}`]: stylesheet,
        });
      }
    }

    return fn(...args).addClass(className);
  }

  builder.styled = (styles: NestedStyleMap, name?: string): typeof builder => {
    stylesheet = styles || {};
    className = name || className;
    return builder;
  };

  return builder as Component<ThatFn<F>>;
}

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

export const Input = <T>(options: HInputOptions<T> = {}): CTag => {
  const el = options.mountToParent ? input.mount() : input();
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

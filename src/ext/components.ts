import {
  type CTag,
  type NestedStyleMap,
  type EventCallback,
  type IObservable,
  isObservable,
  uuidv4,
  allTags,
} from '../cardboard.js';

const { input } = allTags;

export type Component<T extends Function> = T & {
  styled: (styles: NestedStyleMap, name?: string) => Component<T>
};
export type AnyFn = (...args: any[]) => CTag;
export type ThatFn<F extends AnyFn> = (...args: Parameters<F>) => ReturnType<F>;

export function Component<F extends AnyFn>(fn: F): Component<ThatFn<F>> {
  let className = uuidv4();
  let stylesheet: NestedStyleMap | undefined;

  const builder = function (...args) {
    if (!stylesheet) return fn(...args);
    return fn(...args).styled(stylesheet, className);
  }

  builder.styled = (styles: NestedStyleMap, name?: string): typeof builder => {
    stylesheet = styles || {};
    className = name ?? className;
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
  change?: EventCallback<'change'>;
  submit?: (tag: CTag, evt: Event) => void;
}

export const Input = Component(<T>(options: HInputOptions<T> = {}): CTag => {
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
      change: (self, evt) => {
        if (options.change) options.change(self, evt);
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

  return el;
}).styled({
  border: '1px solid #eee',
  borderRadius: '3px',
  background: '#eee',
  padding: '8px 16px',
  margin: '0 8px',
  outline: 'none',
  ':focus': {
    border: '1px solid #aaa',
  },
}, 'c_input');

export const Checkbox = (options: HInputOptions<boolean> = {}) => {
  return Input({
    ...options,
    type: 'checkbox',
  });
};

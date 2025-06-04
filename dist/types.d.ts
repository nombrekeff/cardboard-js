import type { CssProperty } from './css-properties.js';
import type { PickPropertyValues } from './css-property-values.js';
import type { CTag } from './tag.js';
import type { ValidTagName } from './tag-names.js';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
export type NoOp = () => void;
// eslint-disable-next-line @typescript-eslint/array-type, @typescript-eslint/ban-types
export type KeysOf<T extends Record<string, unknown>> = keyof T;

export type Suffix<K extends string, T extends string> = `${T}${K}`;
export type Suffixer<K, T extends string> = {
  [P in keyof K as Suffix<T, string & P>]: K[P];
};
export type Primitive = number | string | boolean | symbol | bigint;
export type NestedStyleMap = {
  [key in CssProperty]?: PickPropertyValues<key> | StyleMap;
};
export type StyleSet = Record<string, NestedStyleMap>;
export type TagChildren = TagChild[];
export type EventCallback<T extends EventName> = (
  tag: CTag,
  evt: HTMLElementEventMap[T],
) => void;
export type EventName = keyof HTMLElementEventMap;
export type EventMap = {
  [k in EventName]?: EventCallback<k>;
};
export type TagBuilder = (children: TagChildren, silent: boolean) => CTag;
export interface IObservable<T = any> {
  changed: (callback: (newValue: T) => void) => IObservable<T>;
  remove: (callback: (newValue: T) => void) => IObservable<T>;
  dispatch: (newValue: T) => IObservable<T>;
  destroy: () => void;
  computed: <K>(transform: (val: T) => K) => IObservable<K>;
  value: T;
  prev?: T;
}
export type State<T> = IObservable<T>;
export type IObservableOr<T = any> = IObservable<T> | T;
export interface WithLength {
  length: number;
}
export type TextObj<T extends IObservable<Primitive> = any> = Record<string, T>;
export type TagChild = string | CTag | HTMLElement | Node | IObservable<any>;
export interface TagConfig {
  style?: StyleMap;
  attr?: Record<string, string | undefined>;
  classList?: string[];
  text?: string;
  children?: TagChildren;
  on?: EventMap;
  value?: string;
  className?: string;
}

export type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
export type AllTags = {
  [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
    /**
     * This will attach (append) this tag to the currently attached tag if there is one.
     */
    attach: (...children: PickArgType<key>) => CTag;
  };
};

type AtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

export type LifecycleHandlers = {
    mounted?: (tag: CTag) => Promise<boolean> | boolean;
    unmounted?: (tag: CTag) => void;
    beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean;
};
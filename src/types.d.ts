import type { CssProperty } from './css-properties.js';
import type { PickPropertyValues } from './css-property-values.js';
import type { CTag } from './tag.js';
import type { ValidTagName } from './tag-names.js';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
export type NoOp = () => void;
export type Suffix<K extends string, T extends string> = `${T}${K}`;
export type Suffixer<K, T extends string> = {
  [P in keyof K as Suffix<T, string & P>]: K[P];
};

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
export interface IConsumable<T> {
  changed: (callback: (newValue: T) => void) => any;
  dispatch: (newValue: T) => any;
  value: T;
}
export type StateConsumable<T> = T & Partial<IConsumable<T>>;
export type AnyConsumable<T> = IConsumable<T> | StateConsumable<T>;

export type TagChild = string | CTag | HTMLElement | Node | AnyConsumable<any>;
export type State<T extends Record<string, any>> = T extends any[]
  ? T & {
    changed: (callback: (newValue: T) => void) => State<T>;
    update: (newValue: T) => void;
    length: StateConsumable<number>;
  }
  : {
    [K in keyof T]: T[K] extends Record<string, any>
    ? State<T[K]>
    : StateConsumable<T[K]>;
  }
  & {
    changed: (callback: (newValue: T) => void) => State<T>;
  };
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

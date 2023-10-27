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
export interface IConsumable<T = any> {
  changed: (callback: (newValue: T) => void) => IConsumable<T>;
  remove: (callback: (newValue: T) => void) => IConsumable<T>;
  dispatch: (newValue: T) => IConsumable<T>;
  destroy: () => void;
  intersect: <K>(intersector: (val: T) => K) => IConsumable<K>;
  value: T;
  prev?: T;
}
export type IConsumableOr<T = any> = IConsumable<T> | T;
export interface WithLength {
  length: number;
}
export type TextObj<T extends IConsumable<Primitive> = any> = Record<string, T>;
export type TagChild = string | CTag | HTMLElement | Node | IConsumable<any>;
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

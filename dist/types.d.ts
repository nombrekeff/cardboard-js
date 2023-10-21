import type { CssProperty } from './css-properties.js';
import type { PickPropertyValues } from './css-property-values.js';
import type { CTag } from './tag.js';
import type { ValidTagName } from './tag-names.js';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
export type NestedStyleMap = {
  [key in CssProperty]?: PickPropertyValues<key> | StyleMap;
};
export type StyleSet = { [key: string]: NestedStyleMap };
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
  changed?(callback: (newValue: T) => void);
  dispatch?(newValue: T);
  value?: T;
}
export type StateConsumable<T> = T & Partial<IConsumable<T>>;
export type TagChild = string | CTag | HTMLElement | Node | IConsumable<any>;
export type ConsumableTypes = string | bigint | number | boolean | object;
export type PickConsumableType<T extends ConsumableTypes> = T extends string
  ? string
  : T extends object
  ? object
  : T extends bigint
  ? string
  : T extends bigint
  ? bigint
  : T extends number
  ? number
  : T extends boolean
  ? boolean
  : any;

export type PrimitiveConsumable = StateConsumable<string | number | boolean>;
export type State<T extends Record<string, any>> = T extends any[]
  ? T & {
      changed: (callback: (newValue: T) => void) => void;
      length: StateConsumable<number>;
    }
  : {
      [K in keyof T]: T[K] extends Record<string, any>
        ? State<T[K]>
        : StateConsumable<T[K]>;
    } & {
      changed: (callback: (newValue: T) => void) => void;
    };
export type TagConfig = {
  style?: StyleMap;
  attr?: { [k: string]: string };
  classList?: string[];
  text?: string;
  children?: TagChildren;
  on?: EventMap;
  value?: string;
  className?: string;
};

export type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
export type AllTags = {
  [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
    /**
     * This will attach (append) this tag to the currently attached tag if there is one.
     */
    attach: (...children: PickArgType<key>) => CTag;
  };
};
export type CEventCallback<T = any> = (data: T) => void;

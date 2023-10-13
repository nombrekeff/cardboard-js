import { CssProperty } from './css-properties';
import { PickPropertyValues } from './css-property-values';
import { CTag } from './tag';
import { ValidTagName } from './tag-names';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
export type NestedStyleMap = {
  [key in CssProperty]?: PickPropertyValues<key> | StyleMap;
};
export type StyleSet = { [key: string]: NestedStyleMap };
export type TagChild = string | CTag | HTMLElement;
export type TagChildren = TagChild[];
export type EventCallback<T extends EventName> = (tag: CTag, evt: HTMLElementEventMap[T]) => void;
export type EventName = keyof HTMLElementEventMap;
export type EventMap = {
  [k in EventName]?: EventCallback<k>;
};
export type TagBuilder = (children: TagChildren, silent: boolean) => CTag;

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
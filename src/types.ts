import { CssProperty } from './css-properties';
import { PickPropertyValues } from './css-property-values';
import { HoboTag } from './hobo-tag';

export type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
export type NestedStyleMap = {
  [key in CssProperty]?: PickPropertyValues<key> | StyleMap;
};
export type StyleSet = { [key: string]: NestedStyleMap };
export type TagChild = string | HoboTag | HTMLElement;
export type TagChildren = TagChild[];
export type EventCallback<T extends EventName> = (tag: HoboTag, evt: HTMLElementEventMap[T]) => void;
export type EventName = keyof HTMLElementEventMap;
export type EventMap = {
  [k in EventName]?: EventCallback<k>;
};
export type TagBuilder = (children: TagChildren, silent: boolean) => HoboTag;

export type TagConfig = {
  style?: StyleMap;
  attr?: { [k: string]: string };
  classList?: string[];
  text?: string;
  children?: TagChildren;
  on?: EventMap;
  value?: string;
};

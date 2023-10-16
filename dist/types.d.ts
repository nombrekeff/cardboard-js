import { CssProperty } from './css-properties';
import { PickPropertyValues } from './css-property-values';
import { CTag } from './tag';
import { ValidTagName } from './tag-names';
export type StyleMap = {
    [key in CssProperty]?: PickPropertyValues<key>;
};
export type NestedStyleMap = {
    [key in CssProperty]?: PickPropertyValues<key> | StyleMap;
};
export type StyleSet = {
    [key: string]: NestedStyleMap;
};
export type TagChild = string | CTag | HTMLElement | Node;
export type TagChildren = TagChild[];
export type EventCallback<T extends EventName> = (tag: CTag, evt: HTMLElementEventMap[T]) => void;
export type EventName = keyof HTMLElementEventMap;
export type EventMap = {
    [k in EventName]?: EventCallback<k>;
};
export type TagBuilder = (children: TagChildren, silent: boolean) => CTag;
export type Consumable<T = any> = T & Partial<{
    changed: (callback: (newValue: T) => void) => void;
}>;
export type PrimitiveConsumable = Consumable<string | number | boolean>;
export type State<T extends Record<string, any>> = {
    [K in keyof T]: T[K] extends Record<string, any> ? State<T[K]> : Consumable<T[K]>;
} & {
    changed: (callback: (newValue: T) => void) => void;
};
export type TagConfig = {
    style?: StyleMap;
    attr?: {
        [k: string]: string;
    };
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
        attach: (...children: PickArgType<key>) => CTag;
    };
};

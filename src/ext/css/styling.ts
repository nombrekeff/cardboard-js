// src/ext/styling.ts
import { CTag } from "../../tag.js";
import { NestedStyleMap, StyleMap } from "../../types.js";
import { context } from "../../context.js";
import { uuidv4, camelToDash } from "../../util.js";

export function addClass(this: CTag, ...classes: string[]): CTag {
  this.classList.add(...classes);
  return this;
}

export function setClassName(this: CTag, className: string): CTag {
  this.el.className = className;
  return this;
}

export function rmClass(this: CTag, ...classes: string[]): CTag {
  this.classList.remove(...classes);
  return this;
}

export function hasClass(this: CTag, ...classes: string[]): boolean {
  return classes.every((cls) => this.classList.contains(cls));
}

export function replaceClass(
  this: CTag,
  targetClass: string,
  replaceClass: string,
): CTag {
  if (this.classList.contains(targetClass)) {
    this.classList.replace(targetClass, replaceClass);
  }
  return this;
}

export function toggleClass(this: CTag, targetClass: string): CTag {
  this.classList.toggle(targetClass);
  return this;
}

export function addStyle(this: CTag, styleName: string, value: string): CTag {
  this.el.style.setProperty(camelToDash(styleName), value);
  return this;
}

export function rmStyle(this: CTag, ...styleNames: string[]): CTag {
  for (const key of styleNames) {
    this.el.style.removeProperty(camelToDash(key));
  }
  return this;
}

export function hasStyle(this: CTag, styleName: string): boolean {
  return this.el.style.getPropertyValue(camelToDash(styleName)) !== "";
}

export function setStyle(this: CTag, styles: StyleMap): CTag {
  for (const key in styles) {
    const value = styles[key] ?? "";
    this.el.style.setProperty(camelToDash(key), String(value));
  }
  return this;
}

export function styled(
  this: CTag,
  stylesheet: NestedStyleMap | undefined,
  className?: string,
): CTag {
  className ??= uuidv4();
  if (stylesheet) {
    context.styleManager?.add({ [`.${className}`]: stylesheet });
  }
  return addClass.call(this, className);
}

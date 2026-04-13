import type { CommonAttributes } from './attributes.js';
import {
  attrIf,
  attrIfNot,
  classIf,
  classIfNot,
  consume,
  disableIf,
  disableIfNot,
  doIf,
  doIfNot,
  hideIf,
  hideIfNot,
  styleIf,
  styleIfNot,
  stylesIf,
  stylesIfNot,
  textIf,
  textIfNot,
} from './ext/reactivity.js';
import { CTag } from './tag.js';
import type { IObservable, StyleMap } from './types.js';

/**
 * Chaining Extensions for CTag
 * 
 * This module adds methods to CTag's prototype to enable chaining of reactive utilities.
 * Each method is implemented as a wrapper around the core logic defined in ext/reactivity.ts.
 * 
 * The process involves:
 * 1. Module Augmentation: We declare new methods on the CTag interface so that TypeScript recognizes them.
 * 2. Prototype Injection: We assign the actual implementations to CTag's prototype, allowing for chaining.
 * 3. Core Logic Extraction: The core logic for each method is defined in ext/reactivity.ts, and we simply call those functions here.
 * 
 * This separation of concerns allows us to keep the core logic of our reactive utilities in one place (ext/reactivity.ts) while still providing a clean and intuitive API for users through method chaining on CTag instances.
 */

// Tell TypeScript about the chained methods
declare module './tag.js' {
  interface CTag {
    consume<T>(
      observable: IObservable<T>,
      onChange: (self: CTag, val?: T) => void,
    ): this;
    classIf<T>(
      obs: IObservable<T>,
      classes: string[] | ((self: CTag) => string[]),
      invert?: boolean,
    ): this;
    classIfNot<T>(
      obs: IObservable<T>,
      classes: string[] | ((self: CTag) => string[]),
    ): this;
    doIf<T>(
      observable: IObservable<T>,
      ifTrue: (value?: T) => void,
      ifFalse: (value?: T) => void,
      invert?: boolean,
    ): this;
    doIfNot<T>(
      observable: IObservable<T>,
      ifTrue: (value?: T) => void,
      ifFalse: (value?: T) => void,
    ): this;
    hideIf<T>(observable: IObservable<T>, invert?: boolean): this;
    hideIfNot<T>(observable: IObservable<T>): this;
    textIf<T>(
      observable: IObservable<T>,
      text: string | ((self: CTag) => string),
      elseText?: string | ((self: CTag) => string),
      invert?: boolean,
    ): this;
    textIfNot<T>(
      observable: IObservable<T>,
      text: string | ((self: CTag) => string),
      elseText?: string | ((self: CTag) => string),
    ): this;
    attrIf<T>(
      observable: IObservable<T>,
      attr: CommonAttributes,
      value?: string | ((self: CTag) => string),
      invert?: boolean,
    ): this;
    attrIfNot<T>(
      observable: IObservable<T>,
      attr: CommonAttributes,
      value?: string | ((self: CTag) => string),
    ): this;
    disableIf<T>(observable: IObservable<T>, invert?: boolean): this;
    disableIfNot<T>(observable: IObservable<T>): this;
    styleIf<T>(
      observable: IObservable<T>,
      style: string,
      value?: string | ((self: CTag) => string),
      invert?: boolean,
    ): this;
    styleIfNot<T>(
      observable: IObservable<T>,
      style: string,
      value?: string | ((self: CTag) => string),
    ): this;
    stylesIf<T>(
      observable: IObservable<T>,
      styles: StyleMap | ((self: CTag) => StyleMap),
      invert?: boolean,
    ): this;
    stylesIfNot<T>(
      observable: IObservable<T>,
      styles: StyleMap | ((self: CTag) => StyleMap),
    ): this;
  }
}

// Prototype Injection
CTag.prototype.consume = function (observable, onChange) {
  return this.use(consume(observable, onChange));
};

CTag.prototype.classIf = function (observable, classes, invert = false) {
  return this.use(classIf(observable, classes, invert));
};

CTag.prototype.classIfNot = function (observable, classes) {
  return this.use(classIfNot(observable, classes));
};

CTag.prototype.doIf = function (observable, ifTrue, ifFalse, invert = false) {
  return this.use(doIf(observable, ifTrue, ifFalse, invert));
};

CTag.prototype.doIfNot = function (observable, ifTrue, ifFalse) {
  return this.use(doIfNot(observable, ifTrue, ifFalse));
};

CTag.prototype.hideIf = function (observable, invert = false) {
  return this.use(hideIf(observable, invert));
};

CTag.prototype.hideIfNot = function (observable) {
  return this.use(hideIfNot(observable));
};

CTag.prototype.textIf = function (
  observable,
  text,
  elseText = '',
  invert = false,
) {
  return this.use(textIf(observable, text, elseText, invert));
};

CTag.prototype.textIfNot = function (observable, text, elseText = '') {
  return this.use(textIfNot(observable, text, elseText));
};

CTag.prototype.attrIf = function (
  observable,
  attr,
  value = '',
  invert = false,
) {
  return this.use(attrIf(observable, attr, value, invert));
};

CTag.prototype.attrIfNot = function (observable, attr, value = '') {
  return this.use(attrIfNot(observable, attr, value));
};

CTag.prototype.disableIf = function (observable, invert = false) {
  return this.use(disableIf(observable, invert));
};

CTag.prototype.disableIfNot = function (observable) {
  return this.use(disableIfNot(observable));
};

CTag.prototype.styleIf = function (
  observable,
  style,
  value = '',
  invert = false,
) {
  return this.use(styleIf(observable, style, value, invert));
};

CTag.prototype.styleIfNot = function (observable, style, value = '') {
  return this.use(styleIfNot(observable, style, value));
};

CTag.prototype.stylesIf = function (observable, styles, invert = false) {
  return this.use(stylesIf(observable, styles, invert));
};

CTag.prototype.stylesIfNot = function (observable, styles) {
  return this.use(stylesIfNot(observable, styles));
};
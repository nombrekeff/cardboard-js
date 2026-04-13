import { classIf, consume } from './ext/reactivity.js';
import { CTag } from './tag.js';
import type { IObservable } from './types.js';

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
    consume<T>(observable: IObservable<T>, onChange: (self: CTag, val?: T) => void): this;
    classIf<T>(obs: IObservable<T>, classes: string[] | ((self: CTag) => string[]), invert?: boolean): this;
  }
}

// Prototype Injection
CTag.prototype.consume = function (observable, onChange) {
  return this.use(consume(observable, onChange));
};

CTag.prototype.classIf = function (observable, classes, invert = false) {
  return this.use(classIf(observable, classes, invert));
};
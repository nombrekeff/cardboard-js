import { isObservable } from "../observables.js";
import { CTag } from "../tag.js";
import { text } from "../text.js";
import { IObservable } from "../types.js";
import { val } from "../util.js";

/**
 * Reactivity Extensions for CTag
 * 
 * This module provides utility functions that can be used to create reactive behaviors on CTag instances.
 * The main utilities include:
 * - consume: A function that allows a CTag to react to changes in an Observable by providing a callback.
 * - classIf: A function that conditionally applies CSS classes to a CTag based on the value of an Observable.
 * 
 * Additionally, we perform module augmentation to allow Observables to be used as children of CTags, and we inject logic into CTag's child processing to handle Observables appropriately. 
 * This setup allows us to seamlessly integrate reactivity into our CTag instances, enabling dynamic updates to the DOM based on changes in Observables.
 */


// Module Augmentation: Tell TS that Observables are valid children!
declare module '../types.js' {
  export interface TagChildRegistry {
    observable: IObservable<any>;
  }
}

// Runtime Augmentation: Teach CTag how to handle Observables as children
CTag.childTransformers.push((child) => {
  if (isObservable(child)) {
    return text("$val", { val: child as IObservable<any> });
  }
  return undefined;
});

// Reactivity Utilities

export const consume = <T>(
  observable: IObservable<T>,
  onChange: (self: CTag, newValue?: T) => void
) => {
  return (tag: CTag) => {
    if (observable?.changed) {
      const listener = (newValue: T) => onChange(tag, newValue);
      observable.changed(listener);
      listener(observable.value);

      tag.onTeardown(() => {
        observable.remove(listener);
      });
    }
  };
};

export const classIf = <T>(
  observable: IObservable<T>,
  classes: string[] | ((self: CTag) => string[]),
  invert = false
) => {
  return (tag: CTag) => {
    tag.use(consume(observable, (self, value) => {
      const shouldApply = invert ? !value : !!value;
      const classList = val(classes, self);
      if (shouldApply) self.addClass(...classList);
      else self.rmClass(...classList);
    }));
  };
};

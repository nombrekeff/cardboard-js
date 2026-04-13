import type { CommonAttributes } from '../attributes.js';
import { isObservable } from '../observables.js';
import { CTag } from '../tag.js';
import { text } from '../text.js';
import type { IObservable, StyleMap } from '../types.js';
import { val } from '../util.js';

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
    return text('$val', { val: child as IObservable<any> });
  }
  return undefined;
});

// Reactivity Utilities

export const consume = <T>(
  observable: IObservable<T>,
  onChange: (self: CTag, newValue?: T) => void,
) => {
  return (tag: CTag) => {
    if (observable?.changed) {
      const listener = (newValue: T) => onChange(tag, newValue);
      observable.changed(listener);
      listener(observable.value);

      tag.onTeardown(() => {
        observable.remove(listener);
      });
      return;
    }

    console.warn('An invalid Observable was supplied to `tag.consume`');
  };
};

export const classIf = <T>(
  observable: IObservable<T>,
  classes: string[] | ((self: CTag) => string[]),
  invert = false,
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

export const classIfNot = <T>(
  observable: IObservable<T>,
  classes: string[] | ((self: CTag) => string[]),
) => {
  return (tag: CTag) => {
    tag.use(classIf(observable, classes, true));
  };
};

export const doIf = <T>(
  observable: IObservable<T>,
  ifTrue: (value?: T) => void,
  ifFalse: (value?: T) => void,
  invert = false,
) => {
  return (tag: CTag) => {
    let whenTrue = ifTrue;
    let whenFalse = ifFalse;

    if (invert) {
      const temp = whenTrue;
      whenTrue = whenFalse;
      whenFalse = temp;
    }

    const callback = (_: CTag, value: T | undefined) => {
      if (!!value) whenTrue(value);
      else whenFalse(value);
    };

    tag.use(consume(observable, callback));
  };
};

export const doIfNot = <T>(
  observable: IObservable<T>,
  ifTrue: (value?: T) => void,
  ifFalse: (value?: T) => void,
) => {
  return (tag: CTag) => {
    tag.use(doIf(observable, ifTrue, ifFalse, true));
  };
};

export const hideIf = <T>(observable: IObservable<T>, invert = false) => {
  return (tag: CTag) => {
    const handleHide = (_: CTag, value: T | undefined) => {
      const hide = !!value;
      const shouldHide = invert ? !hide : hide;

      if (shouldHide) {
        void tag.hide();
      } else {
        void tag.show();
      }
    };

    tag.use(consume(observable, handleHide));
  };
};

export const hideIfNot = <T>(observable: IObservable<T>) => {
  return (tag: CTag) => {
    tag.use(hideIf(observable, true));
  };
};

export const textIf = <T>(
  observable: IObservable<T>,
  textValue: string | ((self: CTag) => string),
  elseText: string | ((self: CTag) => string) = '',
  invert = false,
) => {
  return (tag: CTag) => {
    tag.use(
      doIf(
        observable,
        () => tag.text(val(textValue, tag)),
        () => tag.text(val(elseText, tag)),
        invert,
      ),
    );
  };
};

export const textIfNot = <T>(
  observable: IObservable<T>,
  textValue: string | ((self: CTag) => string),
  elseText: string | ((self: CTag) => string) = '',
) => {
  return (tag: CTag) => {
    tag.use(textIf(observable, textValue, elseText, true));
  };
};

export const attrIf = <T>(
  observable: IObservable<T>,
  attr: CommonAttributes,
  value: string | ((self: CTag) => string) = '',
  invert = false,
) => {
  return (tag: CTag) => {
    tag.use(
      doIf(
        observable,
        () => tag.addAttr(attr, val(value, tag)),
        () => tag.rmAttr(attr),
        invert,
      ),
    );
  };
};

export const attrIfNot = <T>(
  observable: IObservable<T>,
  attr: CommonAttributes,
  value: string | ((self: CTag) => string) = '',
) => {
  return (tag: CTag) => {
    tag.use(attrIf(observable, attr, value, true));
  };
};

export const disableIf = <T>(observable: IObservable<T>, invert = false) => {
  return (tag: CTag) => {
    tag.use(attrIf(observable, 'disabled', '', invert));
  };
};

export const disableIfNot = <T>(observable: IObservable<T>) => {
  return (tag: CTag) => {
    tag.use(disableIf(observable, true));
  };
};

export const styleIf = <T>(
  observable: IObservable<T>,
  style: string,
  value: string | ((self: CTag) => string) = '',
  invert = false,
) => {
  return (tag: CTag) => {
    tag.use(
      doIf(
        observable,
        () => tag.addStyle(style, val(value, tag)),
        () => tag.rmStyle(style),
        invert,
      ),
    );
  };
};

export const styleIfNot = <T>(
  observable: IObservable<T>,
  style: string,
  value: string | ((self: CTag) => string) = '',
) => {
  return (tag: CTag) => {
    tag.use(styleIf(observable, style, value, true));
  };
};

export const stylesIf = <T>(
  observable: IObservable<T>,
  styles: StyleMap | ((self: CTag) => StyleMap),
  invert = false,
) => {
  return (tag: CTag) => {
    tag.use(
      doIf(
        observable,
        () => tag.setStyle(val(styles, tag)),
        () => tag.rmStyle(...Object.keys(styles)),
        invert,
      ),
    );
  };
};

export const stylesIfNot = <T>(
  observable: IObservable<T>,
  styles: StyleMap | ((self: CTag) => StyleMap),
) => {
  return (tag: CTag) => {
    tag.use(stylesIf(observable, styles, true));
  };
};

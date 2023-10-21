import { createConsumable } from './consumables.js';
import { CEvent, CMappedEvent } from './events.js';
import { isArray, isObject } from './util.js';
import type { StateConsumable, State } from './types';

/**
 * `state` creates a reactive object that can the be used with tags to create dinamic and reactive apps.
 * {@link content} can be an `object` or an `array`. Objects can be nested, and evey property will be reactive.
 * In arrays, length will also be reactive.
 *
 * You can pass an optional {@link fn}, that will be called anything in the state changes.
 *
 * Additionally you can listen to it after creating it: `state().changed(() => { })`  
 * 
 * @see https://github.com/nombrekeff/cardboard-js/wiki/State
 * 
 * @example
 * ```ts
 * const st = state({ count: 0 });
 * st.changed(() => { ... });
 * st.count.changed(() => { ... });
 *
 * st.count++;
 * st.count = 3;
 *
 * div().hideIf(st.count);
 * div().disableIf(st.count);
 * div(template('Count is: $count', st));
 * ```
 */
export function state<T extends object>(
  content: T,
  fn?: (newValue: T) => void,
): State<T> {
  let _stateEvt = new CEvent<T>();
  let _consumables: Record<string | symbol, StateConsumable<any>> = {};

  if (fn) _stateEvt.listen(fn);

  const emit = (target, prop, value) => {
    target[prop] = value;
    if (_consumables[prop] != null) {
      _consumables[prop].dispatch(value);
    }
    _stateEvt.dispatch(target);
  };

  const makeConsumable = (target, prop) => {
    return (_consumables[prop] = createConsumable(target[prop]));
  };

  // TODO: Think if having nested states is worth it or not.
  // It might be better to not make nested objects/arrays into states
  for (let prop of Object.getOwnPropertyNames(content)) {
    let val = content[prop];

    if (isObject(val) || isArray(val)) {
      content[prop] = state(val, emit.bind(this, content, prop));
    } else if (!(typeof val === 'function') && !Number.isInteger(+prop)) {
      makeConsumable(content, prop);
    }
  }

  const proxy = new Proxy(content, {
    deleteProperty: function (target, prop) {
      emit(target, prop, target[prop]);
      delete target[prop];
      return true;
    },
    get: (target, prop) => {
      return _consumables[prop] ?? target[prop];
    },
    set: (target, prop, value) => {
      if (prop == 'changed' && !target[prop]) {
        target[prop] = value;
        return true;
      }

      emit(target, prop, value);
      return true;
    },
  }) as any;

  proxy.changed = (callback: (newValue: T) => void) =>
    _stateEvt.listen(callback);

  return proxy as State<T>;
}

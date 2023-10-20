import { CEvent, CMappedEvent } from './events.js';
import type { State } from './types.js';
import { isArray, isObject } from './util.js';

/**
 * `state` creates a reactive object that can the be used with tags to create dinamic and reactive apps.
 * {@param content} can be an `object` or an `array`. Objects can be nested, and evey property will be reactive.
 * In arrays, length will also be reactive.
 *
 * You can pass an optional {@param callback}, that will be called anything in the state changes.
 *
 * Additionally you can listen to it after creating it: `state().changed(() => { })`
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
  callback?: (newValue: T) => void,
): State<T> {
  let _propListeners: CMappedEvent<string, T> = new CMappedEvent();
  let _stateListeners = new CEvent<T>();

  if (callback) _stateListeners.listen(callback);

  const addListener = (prop, callback) => {
    _propListeners.listen(prop, callback);
  };

  const emitChange = (target, prop) => {
    _propListeners.dispatch(prop, target[prop]);
    _stateListeners.dispatch(target);
  };

  const addChangedMethod = (target, prop) => {
    const value: any = target[prop];

    try {
      if (isObject(value)) {
        value.changed = (callback) => addListener(prop, callback);
      } else if (value.__proto__) {
        value.__proto__.changed = (callback) => addListener(prop, callback);
      }
    } catch (error) {}

    return value;
  };

  for (let prop of Object.getOwnPropertyNames(content)) {
    let val = content[prop];
    if (isObject(val) || isArray(val)) {
      content[prop] = state(val, emitChange.bind(this, content, prop));
    }
  }

  const proxy = new Proxy(content, {
    deleteProperty: function (target, prop) {
      emitChange(target, prop);
      delete target[prop];
      return true;
    },
    get: (target, prop) => {
      return addChangedMethod(target, prop);
    },
    set: (target, prop, value) => {
      if (prop == 'changed') {
        target[prop] = value;
        return true;
      }

      target[prop] = value;
      emitChange(target, prop);
      return true;
    },
  }) as any;

  proxy.changed = (callback: (newValue: T) => void) =>
    _stateListeners.listen(callback);

  return proxy as State<T>;
}

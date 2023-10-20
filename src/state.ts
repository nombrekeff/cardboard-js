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
  fn?: (newValue: T) => void,
): State<T> {
  let _propEvt: CMappedEvent<string, T> = new CMappedEvent();
  let _stateEvt = new CEvent<T>();

  if (fn) _stateEvt.listen(fn);

  const emitChange = (target, prop) => {
    _propEvt.dispatch(prop, target[prop]);
    _stateEvt.dispatch(target);
  };

  const addChangedMethod = (target, prop) => {
    const value: any = target[prop];

    try {
      if (isObject(value)) {
        value.changed = (callback) => _propEvt.listen(prop, callback);
      } else if (value.__proto__) {
        value.__proto__.changed = (callback) => _propEvt.listen(prop, callback);
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
    _stateEvt.listen(callback);

  return proxy as State<T>;
}

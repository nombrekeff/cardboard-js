import { isObject } from './util.js';

export type Consumable<T = any> = T & Partial<{ changed: (callback: (newValue: T) => void) => void }>;

export type State<T extends Record<string, any>> = {
  [K in keyof T]: Consumable<T[K]>;
};

export function state<T extends {}>(content: T): State<T> {
  let _propListeners = {};
  let _stateListeners = [];

  for (let prop of Object.getOwnPropertyNames(content)) {
    if (isObject(content[prop])) {
      content[prop] = state(content[prop]);
    } else if (content[prop] instanceof Array) {
      content[prop] = state(content[prop]);
    }
  }

  const proxy = new Proxy(content, {
    deleteProperty: function (target, prop) {
      if (_propListeners[prop]) {
        for (const listener of _propListeners[prop]) {
          listener(target[prop]);
        }
      }

      for (const listener of _stateListeners) {
        listener(target[prop]);
      }

      delete target[prop];

      return true;
    },
    get: (target, prop) => {
      const value: any = target[prop];

      if (isObject(content[prop])) {
        value.changed = (callback) => {
          if (!_propListeners[prop]) _propListeners[prop] = [];
          _propListeners[prop].push(callback);
        };
      } else if (value.__proto__) {
        value.__proto__.changed = (callback) => {
          if (!_propListeners[prop]) _propListeners[prop] = [];
          _propListeners[prop].push(callback);
        };
      }
      return target[prop];
    },
    set: (target, prop, value) => {
      target[prop] = value;

      if (_propListeners[prop]) {
        for (const listener of _propListeners[prop]) {
          listener(target[prop]);
        }
      }

      for (const listener of _stateListeners) {
        listener(target);
      }

      return true;
    },
  }) as any;

  // Whole state changed
  proxy.changed = (callback) => {
    _stateListeners.push(callback);
  };

  return proxy as State<T>;
}

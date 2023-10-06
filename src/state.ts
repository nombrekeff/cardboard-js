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
    }
  }

  return new Proxy(content, {
    get: (target, prop) => {
      const value: any = target[prop];

      if (isObject(content[prop])) {
        value.changed = (callback) => {
          if (!_propListeners[prop]) _propListeners[prop] = [];
          _propListeners[prop].push(callback);
        };
      } 
      
      else if (value.__proto__) {
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
        listener(target[prop]);
      }

      return true;
    },
  }) as State<T>;
}

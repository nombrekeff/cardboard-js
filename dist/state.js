import { createConsumable } from './consumables.js';
import { CEvent, CMappedEvent } from './events.js';
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
export function state_(content, fn) {
    let _propEvt = new CMappedEvent();
    let _stateEvt = new CEvent();
    if (fn)
        _stateEvt.listen(fn);
    const emitChange = (target, prop) => {
        _propEvt.dispatch(prop, target[prop]);
        _stateEvt.dispatch(target);
    };
    const addChangedMethod = (target, prop) => {
        const value = target[prop];
        try {
            if (isObject(value)) {
                value.changed = (callback) => _propEvt.listen(prop, callback);
            }
            else if (value.__proto__) {
                value.__proto__.changed = (callback) => _propEvt.listen(prop, callback);
            }
        }
        catch (error) { }
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
    });
    proxy.changed = (callback) => _stateEvt.listen(callback);
    return proxy;
}
export function state(content, fn) {
    let _stateEvt = new CEvent();
    let _consumables = {};
    if (fn)
        _stateEvt.listen(fn);
    const emitChange = (target, prop, value) => {
        target[prop] = value;
        if (_consumables[prop] != null) {
            console.log({ target, prop, value });
            _consumables[prop].dispatch(value);
        }
        _stateEvt.dispatch(target);
    };
    const addChangedMethod = (target, prop) => {
        return (_consumables[prop] = createConsumable(target[prop]));
    };
    // TODO: Think if having nested states is worth it or not.
    // It might be better to not make nested objects/arrays into states
    for (let prop of Object.getOwnPropertyNames(content)) {
        let val = content[prop];
        if (isObject(val) || isArray(val)) {
            content[prop] = state(val, emitChange.bind(this, content, prop));
        }
        else if (!(typeof val === 'function')) {
            addChangedMethod(content, prop);
        }
    }
    const proxy = new Proxy(content, {
        deleteProperty: function (target, prop) {
            emitChange(target, prop, target[prop]);
            delete target[prop];
            return true;
        },
        get: (target, prop) => {
            var _a;
            return (_a = _consumables[prop]) !== null && _a !== void 0 ? _a : target[prop];
        },
        set: (target, prop, value) => {
            if (prop == 'changed' && !target[prop]) {
                target[prop] = value;
                return true;
            }
            emitChange(target, prop, value);
            return true;
        },
    });
    proxy.changed = (callback) => _stateEvt.listen(callback);
    return proxy;
}

import { isObject } from './util.js';
export function state(content) {
    let _propListeners = {};
    let _stateListeners = [];
    const addListener = (prop, callback) => {
        if (!_propListeners[prop])
            _propListeners[prop] = [];
        _propListeners[prop].push(callback);
    };
    const emitChange = (target, prop) => {
        if (_propListeners[prop]) {
            for (const listener of _propListeners[prop]) {
                listener(target[prop]);
            }
        }
        for (const listener of _stateListeners) {
            listener(target);
        }
    };
    const addChangedMethod = (target, prop) => {
        const value = target[prop];
        try {
            if (isObject(content[prop])) {
                value.changed = (callback) => addListener(prop, callback);
            }
            else if (value.__proto__) {
                value.__proto__.changed = (callback) => addListener(prop, callback);
            }
        }
        catch (error) { }
        return value;
    };
    for (let prop of Object.getOwnPropertyNames(content)) {
        if (isObject(content[prop])) {
            content[prop] = state(content[prop]);
            content[prop].changed(() => emitChange(content, prop));
        }
        else if (content[prop] instanceof Array) {
            content[prop] = state(content[prop]);
            content[prop].changed(() => emitChange(content, prop));
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
            target[prop] = value;
            emitChange(target, prop);
            return true;
        },
    });
    // Whole state changed
    proxy.changed = (callback) => {
        _stateListeners.push(callback);
    };
    return proxy;
}
//# sourceMappingURL=state.js.map
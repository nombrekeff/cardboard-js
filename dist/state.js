import { createConsumable } from './consumables.js';
import { CEvent } from './events.js';
import { isArray, isObject } from './util.js';
/**
 * `state` creates a reactive object that can the be used with tags to create dinamic and reactive apps.
 * {@link content} can be an `object` or an `array`. Objects can be nested, and evey property will be reactive.
 * In arrays, length will also be reactive.
 * *
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
export function state(content) {
    const _stateEvt = new CEvent();
    const _consumables = {};
    const emit = (target, prop, value) => {
        target[prop] = value;
        if (Number.isInteger(+prop.toString()) ||
            (prop === 'changed' && !target[prop])) {
            return;
        }
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
    for (const prop of Object.getOwnPropertyNames(content)) {
        const val = content[prop];
        if (isObject(val) || isArray(val)) {
            content[prop] = state(val);
            content[prop].changed(emit.bind(this, content, prop));
        }
        else if (!(typeof val === 'function') && !Number.isInteger(+prop)) {
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
            var _a;
            return (_a = _consumables[prop]) !== null && _a !== void 0 ? _a : target[prop];
        },
        set: (target, prop, value) => {
            emit(target, prop, value);
            return true;
        },
    });
    proxy.changed = (callback) => _stateEvt.listen(callback);
    return proxy;
}
//# sourceMappingURL=state.js.map
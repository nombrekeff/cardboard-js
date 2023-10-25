import { allTags, isConsumable } from '../cardboard.js';
const { input } = allTags;
export function Input(options = {}) {
    var _a;
    const el = options.attach ? input.attach() : input();
    el.config({
        attr: Object.assign(Object.assign({ tooltip: options.tooltip, placeholder: options.placeholder }, ((_a = options.attr) !== null && _a !== void 0 ? _a : {})), { type: options.type }),
        on: {
            input: (self, evt) => {
                if (options.input)
                    options.input(self, evt);
                if (options.value && isConsumable(options.value)) {
                    options.value.dispatch(el.value);
                }
            },
            submit: options.submit,
            keypress: (tag, evt) => {
                if (evt.key === 'Enter' && options.submit) {
                    options.submit(el, evt);
                }
            },
        },
        value: isConsumable(options.value) ? options.value.value : options.value,
    });
    if (options.value && isConsumable(options.value)) {
        options.value.changed((newValue) => {
            el.setValue(newValue);
        });
    }
    return el.addClass('CInput');
}
export function Checkbox(options = {}) {
    return Input(Object.assign(Object.assign({}, options), { type: 'checkbox' }));
}
//# sourceMappingURL=components.js.map
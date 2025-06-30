import { allTags, isObservable, context, uuidv4 } from '../cardboard.js';
const { input } = allTags;
export function Component(fn) {
    let stylesAreAdded = false;
    let className = uuidv4();
    let stylesheet;
    const builder = function (...args) {
        var _a;
        if (!stylesheet)
            return fn(...args);
        if (!stylesAreAdded) {
            stylesAreAdded = true;
            if (stylesheet) {
                (_a = context.styleManager) === null || _a === void 0 ? void 0 : _a.add({
                    [`.${className}`]: stylesheet,
                });
            }
        }
        return fn(...args).addClass(className);
    };
    builder.styled = (styles, name) => {
        stylesheet = styles || {};
        className = name || className;
        return builder;
    };
    return builder;
}
export const Input = (options = {}) => {
    var _a;
    const el = options.mountToParent ? input.mount() : input();
    el.config({
        attr: Object.assign(Object.assign({ tooltip: options.tooltip, placeholder: options.placeholder }, ((_a = options.attr) !== null && _a !== void 0 ? _a : {})), { type: options.type }),
        on: {
            input: (self, evt) => {
                if (options.input)
                    options.input(self, evt);
                if (options.value && isObservable(options.value)) {
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
        value: isObservable(options.value) ? options.value.value : options.value,
    });
    if (options.value && isObservable(options.value)) {
        options.value.changed((newValue) => {
            el.setValue(newValue);
        });
    }
    return el.addClass('CInput');
};
export const Checkbox = (options = {}) => {
    return Input(Object.assign(Object.assign({}, options), { type: 'checkbox' }));
};
//# sourceMappingURL=components.js.map
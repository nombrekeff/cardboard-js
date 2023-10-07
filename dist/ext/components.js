import { allTags } from '../cardboard.js';
const { input } = allTags;
export function hinput(options = {}) {
    var _a;
    const el = options.silent == true ? input.silent() : input();
    el.config({
        attr: { tooltip: options.tooltip, placeholder: options.placeholder },
        on: {
            input: options.input,
            submit: options.submit,
            keypress: (tag, evt) => {
                if (evt.key == 'Enter') {
                    options.submit(el, evt);
                }
            },
        },
        value: (_a = options.value) !== null && _a !== void 0 ? _a : '',
    });
    return el;
}
//# sourceMappingURL=components.js.map
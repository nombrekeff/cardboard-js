import { allTags } from '../hobo-rt.js';
const { input } = allTags;
export function hinput(options = {}) {
    var _a;
    const el = options.silent == true ? input.silent() : input();
    el.config({
        attr: { tooltip: options.tooltip, placeholder: options.placeholder },
        on: {
            change: options.change,
            submit: options.submit,
            keypress: (tag, evt) => {
                if (evt.key == 'Enter') {
                    options.submit(tag, evt);
                }
            },
        },
        value: (_a = options.value) !== null && _a !== void 0 ? _a : '',
    });
    return el;
}
//# sourceMappingURL=components.js.map
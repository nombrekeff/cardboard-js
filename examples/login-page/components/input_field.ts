import {
    allTags,
    CTag,
    isEmpty,
    State,
    state,
    withLifecycle,
    type PickPropertyValues,
} from '../../../dist/cardboard.js';
import { Component, Input } from '../../../dist/ext/components.js';
import { makeTween, tween, tweenTag } from '../../../dist/ext/tween.js';

const { div, p, input, label } = allTags;

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export type InputFieldProps = {
    id?: string;
    labelText?: string;
    placeholder?: string;
    type?: PickPropertyValues<'type'>;
    error?: State<string>;
    value?: State<string>;
    onInput?: (newValue: string) => void;
    onChange?: (newValue: string) => void;
    onSubmit?: (newValue: string) => void;
    validators?: ((value: string) => string | null)[];
};

export const InputField = Component(({
    id,
    labelText = 'Username',
    placeholder,
    type = 'text',
    error = state(''),
    value = state(''),
    onInput = () => { },
    onChange = () => { },
    onSubmit = () => { },
    validators = [],
}: InputFieldProps) => {
    const _id = id ?? makeid(8);

    const _validate = (value: string) => {
        if (!value || !validators.length) {
            error.value = '';
            return;
        }

        for (const validator of validators) {
            const errorMessage = validator(value);
            if (errorMessage) {
                error.value = errorMessage;
                return;
            }
        }

        error.value = '';
    };

    return div()
        .append(
            label(labelText)
                .styled({
                    padding: '8px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                }, 'input_label') // By adding a class, we ensure that the style is only added once
                .addAttr('for', _id),
            Input({
                value: value.value,
                placeholder: placeholder,
                type: type,
                input: (_) => {
                    error.value = '';
                },
                change: (event) => {
                    value.value = event.value;
                    onChange(event.value);
                    _validate(event.value);
                    console.log('Input changed:', event.value);
                },
                submit: (event) => {
                    value.value = event.value;
                    onSubmit(event.value);
                },
            })
                .stylesIfNot(isEmpty(error), { 'border': '1px solid #ff0000', background: '#fff0f0' })
                .setId(_id),
            div(ErrorMessage(error)).styled({ 'height': '12px', zIndex: '0' }, 'c_error'),
        );
}).styled({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
    ' .c_input': {
        zIndex: '1',
    }
}, 'input_field');

const ErrorMessage = Component((error = state('')) => {
    let errorTag = p(error)
        .hideIf(isEmpty(error));
    return withLifecycle(errorTag, {
        mounted(tag) {
            tweenTag(tag, slideOut);
            return true;
        },
        beforeUnmounted(tag) {
            return new Promise((resolve) =>
                tweenTag(tag, slideIn, () => resolve(true)),
            );
        },
    });
}).styled({
    padding: '0 8px',
    fontSize: '12px',
    fontWeight: 'normal',
    color: '#ff0000',
    zIndex: '0',
    height: '12px',
}, 'error_message');

const sizeEnd = { y: -15 };
const sizeStart = { y: 8 };
const sharedOpts = { duration: 300, easing: tween.Easing.Quadratic.InOut };
const updateTag = (tag: CTag, value: typeof sizeEnd) =>
    tag.setStyle({ marginTop: `${value.y}px` });

const slideOut = (tag: CTag) =>
    makeTween({
        from: { ...sizeEnd },
        to: { ...sizeStart },
        ...sharedOpts,
        update: updateTag.bind(this, tag),
    });

const slideIn = (tag: CTag) =>
    makeTween({
        from: { ...sizeStart },
        to: { ...sizeEnd },
        ...sharedOpts,
        update: updateTag.bind(this, tag),
    });
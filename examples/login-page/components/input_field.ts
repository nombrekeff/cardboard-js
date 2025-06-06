import {
    allTags,
    CTag,
    isEmpty,
    State,
    state,
    withLifecycle,
} from '../../../dist/cardboard.js';
import { PickPropertyValues } from '../../../dist/css-property-values.js';
import { makeTween, tween, tweenTag } from '../../../dist/ext/tween.js';

const { div, p, input, label, br, button } = allTags;

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

export function InputField({
    id,
    labelText = 'Username',
    placeholder,
    type = 'text',
    error = state(''),
    value = state(''),
    onInput = (newValue) => { },
    onChange = (newValue) => { },
    onSubmit = (newValue) => { },
    validators = [],
}: InputFieldProps) {
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

    const fieldDiv = div()
        .setStyle({
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '16px',
        })
        .append(
            label(labelText)
                .setStyle({
                    padding: '8px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                })
                .addAttr('for', _id),
            input()
                .setValue(value.value)
                .addStyle('zIndex', '99')
                .setId(_id)
                .stylesIfNot(isEmpty(error), { 'border': '1px solid #ff0000', background: '#fff0f0' })
                .addAttr('placeholder', placeholder)
                .addAttr('type', type)
                .on('input', (event) => {
                    value.value = event.value;
                    onInput(event.value);
                })
                .on('change', (event) => {
                    value.value = event.value;
                    onChange(event.value);
                    _validate(value.value);
                })
                .on('submit', (event) => {
                    value.value = event.value;
                    onSubmit(event.value);
                }),
            div(ErrorMessage(error)).setStyle({ 'height': '12px' }),
        );
    return fieldDiv;
}

function ErrorMessage(error = state('')) {
    let errorTag = p(error)
        .setStyle({
            padding: '0 8px',
            fontSize: '12px',
            fontWeight: 'normal',
            color: '#ff0000',
            zIndex: '0',
        })
        .addClass('error-message')
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
}

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
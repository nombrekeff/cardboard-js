import {
    allTags,
    getMountPoint,
    computeMultiple,
    State,
} from '../../../dist/cardboard.js';
import { InputField } from './../components/input_field.js';

const { h3, br, button, form } = allTags;

export type LoginFormData = {
    username: State<string>;
    password: State<string>;
    usernameError: State<string>;
    passwordError: State<string>;
}

export function LoginForm(formData: State<LoginFormData>) {
    const inputNotFilled = computeMultiple([formData.value.username, formData.value.password], (u, p) => u.length <= 0 || p.length <= 0);

    h3.mount('Login').setStyle({
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    });

    const onSubmit = () => {
        console.log('submitted:', formData);
        formData.value.usernameError.value = 'Invalid username';
        formData.value.passwordError.value = 'Invalid password';
    }

    const loginForm = form(
        InputField({
            id: 'username',
            labelText: 'Username',
            placeholder: 'Enter your username',
            type: 'text',
            error: formData.value.usernameError,
            value: formData.value.username,
            validators: [
                (value) => value.length < 6 ? 'Username must be at least 6 characters long' : null,
                (value) => !/^[a-zA-Z0-9]+$/.test(value) ? 'Username can only contain letters and numbers' : null,
            ],
            onSubmit: onSubmit
        }),
        InputField({
            id: 'password',
            labelText: 'Password',
            placeholder: 'Enter your password',
            type: 'password',
            error: formData.value.passwordError,
            value: formData.value.password,
            validators: [
                (value) => value.length < 6 ? 'Password must be at least 6 characters long' : null,
                (value) => !/^[^\s]+$/.test(value) ? 'Password can only contain letters and numbers' : null,
            ],
            onSubmit: onSubmit
        }),
        br(),
        button.mount('Login')
            .setId('login-button')
            .attrIf(inputNotFilled, 'disabled', 'true')
            .on('click', onSubmit)
    ).addAttr('action', '#');

    getMountPoint()
        .append(loginForm);
}


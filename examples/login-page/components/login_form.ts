import {
    allTags,
    getMountPoint,
    computeMultiple,
    State,
    state,
} from '../../../dist/cardboard.js';
import { loginUser } from '../api/api.js';
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

    const loading = state(false);
    const onSubmit = async () => {
        loading.value = true;
        var result = (await loginUser(formData.value.username.value, formData.value.password.value));
        console.log('result:', result);
        if (result.status !== 200) {
            const errorMessage = await result.json();
            console.error('Login failed:', errorMessage);
            formData.value.usernameError.value = errorMessage.message || 'Invalid username';
            formData.value.passwordError.value = errorMessage.message || 'Invalid password';
        } else {
            formData.value.usernameError.value = '';
            formData.value.passwordError.value = '';
        }

        formData.value.username.value = '';
        formData.value.password.value = '';
        loading.value = false;
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

        button.mount()
            .disableIf(loading)
            .setId('login-button')
            .textIf(loading, 'Logging in...', 'Login')
            .attrIf(inputNotFilled, 'disabled', 'true')
            .addAttr('type', 'submit'),

    ).addAttr('action', '#').on('submit', (_, e) => {
        e.preventDefault();
        onSubmit();
    });

    getMountPoint()
        .append(loginForm);
}

function ErrorMessage(error: any): any {
    throw new Error('Function not implemented.');
}


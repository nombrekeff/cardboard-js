import {
  init,
  allTags,
  tag,
  mountPoint,
  state,
  getMountPoint,
  withMountPoint,
} from '../../dist/cardboard.js';
import { LoginForm } from './components/login_form.js';
import { baseStyleSheet, rootStyles } from './styles.js';

const { div, style } = allTags;


function setup() {
  init()
    .append(
      style(baseStyleSheet)
    )
    .setStyle(rootStyles);
  tag('(html)').setStyle({ overflow: 'hidden' });
}

function main() {
  const appWell = div().setId('app-well');
  getMountPoint().append(appWell);
  mountPoint(appWell);

  const loginBox = div.mount().setId('login-box');
  const formData = state({
    username: state(''),
    password: state(''),
    usernameError: state(''),
    passwordError: state(''),
  });

  withMountPoint(loginBox, () => {
    LoginForm(formData);
  });
}

setup();
main();
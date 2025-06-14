import {
  init,
  allTags,
  tag,
  mountPoint,
  state,
  getMountPoint,
  withMountPoint,
} from '../../dist/cardboard.js';
import { BaseStyle } from '../../dist/ext/base_style.js';
import { LoginForm } from './components/login_form.js';
import { baseStyleSheet, rootStyles } from './styles.js';

const { div, style } = allTags;


function setup() {
  tag('(html)').setStyle({ overflow: 'hidden' });
  init()
    .append(
      BaseStyle(),
      style(baseStyleSheet)
    )
    .setStyle(rootStyles);
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
    LoginForm(formData)
  });
}

setup();
main();
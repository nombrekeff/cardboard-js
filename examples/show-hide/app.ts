import { init, allTags, state } from '../../dist/cardboard.js';

const { div, style, p } = allTags;

const hide = state(false);

setTimeout(() => (hide.value = true), 2000);
setTimeout(() => (hide.value = false), 3000);
setTimeout(() => (hide.value = true), 4000);
setTimeout(() => (hide.value = false), 5000);

const root = init().append(
  style({
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: '0',
      fontFamily: 'Arial',
    },
    div: {
      fontSize: '5rem',
    },
  }),
  div(p('Hello')).hideIf(hide),
);

for (let i = 0; i < 1000; i++) {
  root.append(div(`${i}`).hideIf(hide));
}
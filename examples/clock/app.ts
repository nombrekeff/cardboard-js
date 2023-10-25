import {
  CTag,
  allTags,
  init,
  state,
  withLifecycle,
} from '../../dist/cardboard.js';

const { div, style, span, button, p } = allTags;

const Clock = () => {
  const seconds = state('00');
  const minutes = state('00');
  const hours = state('00');

  const setTime = () => {
    const currentDate = new Date();
    seconds.value = currentDate.getSeconds().toString().padStart(2, '0');
    minutes.value = currentDate.getMinutes().toString().padStart(2, '0');
    hours.value = currentDate.getHours().toString().padStart(2, '0');
  };

  let interval: any;

  return withLifecycle(
    div(
      span(hours),
      ':',
      span(minutes),
      ':',
      span(seconds),
    ),
    {
      start() {
        setTime();
        clearInterval(interval);
        interval = setInterval(setTime, 500);
        return true;
      },
      removed() {
        clearInterval(interval);
        return true;
      },
    },
  );
};

let clock: CTag;
init().append(
  style({
    body: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: '0',
    },
    div: {
      fontSize: '5rem',
    },
  }),
  (clock = Clock()),
);

setTimeout(() => {
  clock.hide();
}, 3000);

setTimeout(() => {
  clock.show();
}, 6000);

const list = div.attach();

button.attach('Add item').clicked(() => list.append(p('Item')));

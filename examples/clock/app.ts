// Importing from individual modules will help with tree shaking if building with esbuild
import { state } from '../../dist/state.js';
import { withLifecycle } from '../../dist/lifecycle.js';
import { allTags, init } from '../../dist/tag.js';

const { div, style, span } = allTags;

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
  Clock(),
);


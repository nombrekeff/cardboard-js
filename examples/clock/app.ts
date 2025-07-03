// Importing from individual modules will help with tree shaking if building with esbuild
import { allTags, init, state, withLifecycle } from '../../dist/cardboard.js';

const { div, style, span } = allTags;
const padd = (d) => d.toString().padStart(2, '0')


const Clock = () => {
  const seconds = state('00');
  const minutes = state('00');
  const hours = state('00');

  const setTime = () => {
    const currentDate = new Date();
    seconds.value = padd(currentDate.getSeconds());
    minutes.value = padd(currentDate.getMinutes());
    hours.value = padd(currentDate.getHours());
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
      mounted() {
        setTime();
        clearInterval(interval);
        interval = setInterval(setTime, 500);
        return true;
      },
      beforeUnmounted() {
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


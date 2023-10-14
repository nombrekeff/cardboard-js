import { init, allTags, state, hstyle, CTag } from '../../dist/cardboard.js';

const { div, h4, style, span } = allTags;

const Clock = () => {
  const st = state({
    seconds: '00',
    minutes: '00',
    hours: '00',
  });

  const setTime = () => {
    const currentDate = new Date();
    st.seconds = currentDate.getSeconds().toString().padStart(2, '0');
    st.minutes = currentDate.getMinutes().toString().padStart(2, '0');
    st.hours = currentDate.getHours().toString().padStart(2, '0');
  };

  setInterval(setTime, 500);

  setTime();

  return div(
    span().text('$hours', st),
    ':',
    span().text('$minutes', st),
    ':',
    span().text('$seconds', st),
  );
};

let clock: CTag;
init().append(
  hstyle(),
  style({
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: '0',
      fontSize: '5rem',
    },
  }),
  (clock = Clock()),
);

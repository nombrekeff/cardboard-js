import { init, allTags, state, CTag, attached } from '../../dist/cardboard.js';

const { div, style, span, p } = allTags;

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

const st = state({
  hide: false,
});
setTimeout(() => (st.hide = true), 2000);
setTimeout(() => (st.hide = false), 3000);
setTimeout(() => (st.hide = true), 4000);
setTimeout(() => (st.hide = false), 5000);

let clock: CTag;
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
  (clock = Clock()),
  div(p('Hello')).hideIf(st.hide),
);

for (let i = 0; i < 1000; i++) {
  root.append(div(`${i}`).hideIf(st.hide));
}

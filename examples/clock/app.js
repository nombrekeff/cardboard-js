import { init, allTags, state, hstyle, withLifecycle, } from '../../dist/cardboard.js';
const { div, style, span, button, p } = allTags;
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
    let interval;
    return withLifecycle(div(span().text('$hours', st), ':', span().text('$minutes', st), ':', span().text('$seconds', st)), {
        start() {
            setTime();
            clearInterval(interval);
            interval = setInterval(setTime, 500);
        },
        removed() {
            clearInterval(interval);
        },
    });
};
let clock;
init().append(hstyle(), style({
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
}), (clock = Clock()));
setTimeout(() => {
    clock.hide();
}, 3000);
setTimeout(() => {
    clock.show();
}, 6000);
const list = div.attach();
button.attach('Add item').clicked(() => list.append(p('Item')));
//# sourceMappingURL=app.js.map
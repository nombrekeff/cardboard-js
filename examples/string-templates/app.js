import { init, allTags, state, text } from '../../dist/cardboard.js';
const { button, p } = allTags;
const st = state({ count: 0 });
init().append(p(text(`Count: $count`, st)), //
p().text(`Count: $count`, st));
button.attach('Increase count').clicked(() => st.count++);

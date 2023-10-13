import { init, allTags, state, template } from '../../dist/cardboard.js';

const { button, p } = allTags;

const st = state({ count: 0 });

init().append(
  p(template(`Count: $count`, st)), //
  p(template(`Count: $0`, [st.count])),
);

button.attach('Increase count').clicked(() => st.count++);

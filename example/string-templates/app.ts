import { init, allTags, state, template } from '../../dist/cardboard.js';

const { button, p } = allTags;

const st = state({ count: 0 });

init().append(
  p(template(`Count: $count`, st)), //
);

button.attach('Increase count').clicked(() => st.count++);

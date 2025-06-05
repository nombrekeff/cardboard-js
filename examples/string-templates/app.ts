import { init, allTags, text, state } from '../../dist/cardboard.js';

const { button, p } = allTags;

const st = state({ count: 0 });

init().append(
  p(text(`Count: $count`, st)),
  p().text(`Count: $count`, st), 
  button('Increase count')
    .clicked(() => st.value.count++)
);
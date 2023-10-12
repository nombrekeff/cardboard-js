import { init, allTags, hinput, hstyle, attach, tag, state, CTag } from '../../dist/cardboard.js';

const { div, button, h3, link, p, input, br } = allTags;

init();
let testState = state({ hide: true, disable: true });

// testState.hide.changed((hide) => {
//   console.log('hide changed', hide);
// });
// testState.disable.changed((disable) => {
//   console.log('disable changed', disable);
// });

div.attach(
  p('Paragraph 1'),
  p('Paragraph 2').showIf(testState.hide),
  p('Paragraph 3'),
  input().setValue('Value').disableIf(testState.disable),
  br(),
  br(),
  button('Toggle paragraph 2').clicked(() => {
    testState.hide = !testState.hide;
  }),
  button('Disable Input').clicked(() => {
    testState.disable = !testState.disable;
  }),
);

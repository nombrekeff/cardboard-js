import { init, allTags, state } from '../../dist/cardboard.js';

const { div, button, p, input, br } = allTags;

init();
let testState = state({ hide: true, disable: true });
div.attach(
  p('Paragraph 1'),
  p('Paragraph 2').hideIf(testState.hide),
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

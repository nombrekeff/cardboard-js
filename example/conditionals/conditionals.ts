import { init, allTags, state, context } from '../../dist/cardboard.js';

const { div, button, p, input, br } = allTags;

init();
let testState = state({ hide1: false, hide2: false, hide3: false, disable: true });

div.attach(
  div(
    p('Paragraph 1').setId('p1').hideIf(testState.hide1),
    p('Paragraph 2').setId('p2').hideIf(testState.hide2),
    "Sexy",
    p('Paragraph 3').setId('p3').hideIf(testState.hide3),
  ),
  br(),
  br(),
  "Standalone text",
  button('Toggle 1').clicked(() => (testState.hide1 = !testState.hide1)),
  button('Toggle 2').clicked(() => (testState.hide2 = !testState.hide2)),
  button('Toggle 3').clicked(() => (testState.hide3 = !testState.hide3)),

  input().setValue('Value').disableIf(testState.disable),
  button('Disable Input').clicked(() => {
    testState.disable = !testState.disable;
  }),
);

console.log(context.tree);

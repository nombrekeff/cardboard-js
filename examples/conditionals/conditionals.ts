import { init, allTags, state } from '../../dist/cardboard.js';
const { div, button, p, input, br } = allTags;

init();

const hide1 = state(false);
const hide2 = state(false);
const hide3 = state(false);
const hide4 = state(false);
const hide5 = state(false);
const disable = state(true);

div.mount(
  div(
    p('Paragraph 1').setId('p1').hideIf(hide1),
    p('Paragraph 2').setId('p2').hideIf(hide2),
    'Standalone text',
    p('Paragraph 3').setId('p3').hideIf(hide3),
    p('Paragraph 4').setId('p4').hideIf(hide4),
    p('Paragraph 5').setId('p5').hideIf(hide5),
  ),
  br(),
  br(),
  button('Toggle 1').clicked(() => (hide1.value = !hide1.value)),
  button('Toggle 2').clicked(() => (hide2.value = !hide2.value)),
  button('Toggle 3').clicked(() => (hide3.value = !hide3.value)),
  button('Toggle 4').clicked(() => (hide4.value = !hide4.value)),
  button('Toggle 5').clicked(() => (hide5.value = !hide5.value)),
  br(),
  input().setValue('Value').disableIf(disable),
  button('Disable Input').clicked(() => {
    disable.value = !disable.value;
  }),
);


const show = state(false);

const pp1 = p("I'm here 1");
const pp2 = p("I'm here 2");
const pp3 = p("I'm here 3");

br.mount();
button.mount('Toggle').clicked(() => (show.value = !show.value));
div.mount(
  pp1,
  pp2.hideIfNot(show), //
  pp3,
);

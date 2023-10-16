import { init, allTags, state } from '../../dist/cardboard.js';
const { div, button, p, input, br } = allTags;
init();
let testState = state({
    hide1: false,
    hide2: false,
    hide3: false,
    hide4: false,
    hide5: false,
    disable: true,
});
div.attach(div(p('Paragraph 1').setId('p1').hideIf(testState.hide1), p('Paragraph 2').setId('p2').hideIf(testState.hide2), 'Standalone text', p('Paragraph 3').setId('p3').hideIf(testState.hide3), p('Paragraph 4').setId('p4').hideIf(testState.hide4), p('Paragraph 5').setId('p5').hideIf(testState.hide5)), br(), br(), button('Toggle 1').clicked(() => (testState.hide1 = !testState.hide1)), button('Toggle 2').clicked(() => (testState.hide2 = !testState.hide2)), button('Toggle 3').clicked(() => (testState.hide3 = !testState.hide3)), button('Toggle 4').clicked(() => (testState.hide4 = !testState.hide4)), button('Toggle 5').clicked(() => (testState.hide5 = !testState.hide5)), br(), input().setValue('Value').disableIf(testState.disable), button('Disable Input').clicked(() => {
    testState.disable = !testState.disable;
}));
let st = state({ show: true });
const pp1 = p("I'm here 1");
const pp2 = p("I'm here 2");
const pp3 = p("I'm here 3");
br();
button.attach('Toggle').clicked(() => (st.show = !st.show)),
    div.attach(pp1, pp2.hideIfNot(st.show), //
    pp3);
//# sourceMappingURL=conditionals.js.map
import { tag, init, allTags, state, attached, hinput, hstyle } from '../dist/hobo-rt.js';
const { div, button, input, a, ul, li, hr, style } = allTags;
init();
hstyle();
style({
    '#list:after': {
        content: '"No items in list!"',
        position: 'absolute',
        opacity: '0',
    },
    '#list:empty:after': {
        opacity: '1',
    },
});
div('Hey!!');
div('Heyy 2');
const link = (text, link) => a(text).addAttrs({ href: link });
div('Hello world 2!').config({ style: { color: 'red' } });
tag('br');
link('Link', 'https://www.google.com');
tag('br');
hr();
let counterState = state({ count: 0 });
button()
    .consume(counterState.count, (self, count) => self.text(`Clicked ${count} times`))
    .clicked((_) => counterState.count++);
hr();
input()
    .addAttrs({ placeholder: 'Enter number', type: 'number' })
    .changed((t, evt) => {
    console.log(evt);
});
hr();
const list = ul.silent().addAttrs({ id: 'list' });
const itemInput = hinput({ placeholder: 'Enter item content', submit: (_) => addItem() });
const addItem = () => {
    if (itemInput.value) {
        list.add(li.silent(itemInput.value).clicked((self) => self.remove()));
        itemInput.clear();
    }
};
button('Add item').clicked(addItem);
attached().add(list);
//# sourceMappingURL=app.js.map
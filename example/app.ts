import { tag, init, allTags, state, attached, hinput, hstyle, template } from '../dist/cardboard.js';
const { div, button, input, a, ul, li, hr, style } = allTags;

init();
hstyle();
style.attach({
  '#list:after': {
    content: '"No items in list!"',
    position: 'absolute',
    opacity: '0',
  },
  '#list:empty:after': {
    opacity: '1',
  },
});

div.attach('Hey!!');
div.attach('Heyy 2');

const link = (text, link?) => a.attach(text).setAttrs({ href: link });

div.attach('Hello world 2!').config({ style: { color: 'red' } });
tag('br');
link('Link', 'https://www.google.com');
tag('br');
hr();

let counterState = state({ count: 0 });
button.attach(template(`Clicked $count times`, counterState))
  .clicked((_) => counterState.count++);

hr();
input.attach()
  .setAttrs({ placeholder: 'Enter number', type: 'number' })
  .changed((t, evt) => {
    console.log(evt);
  });
hr();

const list = ul.attach().setAttrs({ id: 'list' });
const itemInput = hinput({ placeholder: 'Enter item content', submit: (_) => addItem() });

const addItem = () => {
  if (itemInput.value) {
    list.append(li(itemInput.value).clicked((self) => self.remove()));
    itemInput.clear();
  }
};

button('Add item').clicked(addItem);
attached().append(list);

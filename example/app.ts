import {
  tag,
  init,
  allTags,
  state,
  attached,
  hstyle,
  text,
  Input,
} from '../dist/cardboard.js';
const { div, button, input, a, ul, li, hr, style } = allTags;

const root = init();
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

// Counter
const Counter = () => {
  let counterState = state({ count: 0 });

  return button(text(`Clicked $count times`, counterState)).clicked(
    (_) => counterState.count++,
  );
};

root.append(Counter());

// Attributes

hr.attach();
input
  .attach()
  .setAttrs({ placeholder: 'Enter number', type: 'number' })
  .changed((t, evt) => {
    console.log(evt);
  });
hr.attach();

// Todo List

const Todo = (value) =>
  li(
    value,
    button('X').clicked((self) => self.parent.remove()),
  );

const TodoList = () => {
  const list = ul().setId('list');
  const itemInput = Input({
    placeholder: 'Enter item content',
    submit: (_) => addItem(),
  });

  const addItem = () => {
    if (itemInput.value) {
      list.append(Todo(itemInput.consumeValue));
    }
  };

  return div(itemInput, button('Add item').clicked(addItem), list);
};

attached().append(TodoList());

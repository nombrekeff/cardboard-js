import {
  init,
  tag,
  allTags,
  mountPoint,
  each,
  isEmpty,
} from '../../dist/cardboard.js';
import { Input } from '../../dist/ext/components.js';
import styles from './style.js';
import TodoItem from './todo-item.js';
import { todos, todoCount, addTodo, removeTodo, newTodo, removeAll, addAll } from './state.js';
const { div, button, h3, link, p } = allTags;

const pageLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300&display=swap',
];
const makeLinks = () => pageLinks.map((url) => link().addAttr('href', url));

const root = init().append(
  tag('(head)').append(...makeLinks()),
  styles(),
);


mountPoint(div.mount().addClass('todo-app'));

h3.mount('Cardboard TODO - count: ', todoCount).setStyle({
  textAlign: 'center',
  margin: '40px 0',
});

const itemInput = Input({
  placeholder: 'Enter item content',
  submit: addItemFromInput,
  value: newTodo,
});

const addItemBtn = button('+')
  .addClass('btn-add')
  .disableIf(isEmpty(newTodo))
  .clicked(addItemFromInput);

div.mount(
  button('remove').clicked(() => removeAll()),
  button('add').clicked(() => addAll()),
);
div.mount(itemInput, addItemBtn).addClass('header');
div
  .mount(
    p('There are no items: ', todoCount).addClass('list-empty').hideIf(todoCount),
    each(todos, (item) => {
      return TodoItem(item, (s, c) => removeTodo(c));
    }),
  )
  .addClass('todo-list');

/* Adds a new TODO, from input field, adds to state */
function addItemFromInput() {
  const value = itemInput.consumeValue;

  if (value) {
    addTodo(value);
  }
}

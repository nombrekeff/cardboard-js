import {
  init,
  tag,
  allTags,
  attach,
  each,
} from '../../dist/cardboard.js';
import { Input } from '../../dist/ext/components.js';
import { BaseStyle } from '../../dist/ext/base_style.js';
import styles from './style.js';
import TodoItem from './todo-item.js';
import { todos, todoCount, addTodo, removeTodo, addTodoAt } from './state.js';

const { div, button, h3, link, p } = allTags;

const pageLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300&display=swap',
];
const makeLinks = () => pageLinks.map((url) => link().addAttr('href', url));

init();
BaseStyle();
tag('(head)').append(...makeLinks());
styles();

attach(div.attach().addClass('todo-app'));

h3.attach('Cardboard TODO - count: ', todoCount).setStyle({
  textAlign: 'center',
  margin: '40px 0',
});

const itemInput = Input({
  placeholder: 'Enter item content',
  submit: addItemFromInput,
});

const addItemBtn = button('+')
  .addClass('btn-add')
  .disableIf(itemInput.when('input', (el) => !el.value))
  .clicked(addItemFromInput);

// button('Insert at 2').clicked(() => {
//   addTodoAt('abababa', 2);
// }),

div.attach(itemInput, addItemBtn).addClass('header');
div
  .attach(
    p('There are no items').addClass('list-empty').hideIf(todoCount),
    each(todos, (item) => {
      return TodoItem(item, {
        remove: (s, c) => removeTodo(c),
      });
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

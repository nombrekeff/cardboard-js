import { hstyle, hinput, init, tag, state, allTags, attach } from '../../dist/cardboard.js';
import styles from './style.js';
import todoItem from './todo-item.js';

const { div, button, h3, link, p, span } = allTags;

const pageLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300&display=swap',
];
const makeLinks = () => pageLinks.map((url) => link().addAttr('href', url));

init();
hstyle();
tag('(head)').append(...makeLinks());
styles();

const todoState = state([...(JSON.parse(localStorage.getItem('TODOS')) || [])], (newState) => {
  localStorage.setItem('TODOS', JSON.stringify([...newState]));
});

const todoApp = div.attach().addClass('todo-app');
attach(todoApp);

h3.attach(
  'Cardboard TODO',
  span().consume(todoState.length, (self, count) => self.text(` (count: ${count}) `)),
).setStyle({ textAlign: 'center', margin: '40px 0' });

const itemInput = hinput({
  placeholder: 'Enter item content',
  submit: addItemFromInput,
});
const addItemBtn = button('+')
  .addClass('btn-add')
  .disable()
  .listen(itemInput, 'input', (self, other) => (other.value ? self.enable() : self.disable()))
  .clicked(addItemFromInput);

div.attach(itemInput, addItemBtn).addClass('header');

const todoList = div
  .attach(p('There are no items').addClass('list-empty').hideIf(todoState.length))
  .addClass('todo-list');

function addItem(value: string) {
  if (value) {
    todoList.append(
      todoItem(value, {
        remove: (s, c) => {
          const index = todoState.indexOf(c);
          todoState.splice(index, 1);
        },
      }),
    );
  }
}

/* Adds a new TODO, from input field, adds to state */
function addItemFromInput() {
  if (itemInput.value) {
    addItem(itemInput.value);
    todoState.push(itemInput.value);
    itemInput.clear();
  }
}

for (const item of [...todoState]) {
  addItem(item);
}

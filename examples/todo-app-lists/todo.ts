import {
  init,
  tag,
  allTags,
  attach,
  text,
  each,
  eachSlow,
} from '../../dist/cardboard.js';
import { Input } from '../../dist/ext/components.js';
import { BaseStyle } from '../../dist/ext/base_style.js';
import styles from './style.js';
import TodoItem from './todo-item.js';
import { appState } from './state.js';
console.log({ appState });

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

h3.attach('Cardboard TODO - count: ', appState.length).setStyle({
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

div.attach(
  button('Insert at 2').clicked(() => {
    appState.splice(2, 0, 'abababa');
  }),
  button('Sort').clicked(() => {
    // let newState = swap([...appState], 2, 7);
    // newState = swap([...appState], 1, 5);
    // let temp = newState[1];
    // newState[1] = newState[4];
    // newState[4] = temp;
    console.log(appState);

    appState.update(
      [...appState].sort((a, b) => {
        return a.localeCompare(b);
        // if (a.loca < b) {
        //   return -1;
        // }
        // if (a > b) {
        //   return 1;
        // }
        // return 0;
      }),
    );
  }),
);

div.attach(itemInput, addItemBtn).addClass('header');
let test;
div
  .attach(
    div
      .attach(
        "Slow",
        p('There are no items').addClass('list-empty').hideIf(appState.length),
        eachSlow(appState, (item) => {
          return TodoItem(item, {
            remove: (s, c) => {
              const index = appState.indexOf(c);
              appState.splice(index, 1);
            },
          });
        }),
      )
      .addClass('todo-list'),
    test = div
      .attach(
        "Fast",
        p('There are no items').addClass('list-empty').hideIf(appState.length),
        each(appState, (item) => {
          return TodoItem(item, {
            remove: (s, c) => {
              const index = appState.indexOf(c);
              appState.splice(index, 1);
            },
          });
        }),
      )
      .addClass('todo-list'),
  )
  .setStyle({ display: 'flex', flexDirection: 'row', overflowY: 'auto' });

console.log(test);

/* Adds a new TODO, from input field, adds to state */
function addItemFromInput() {
  const value = itemInput.consumeValue;

  if (value) {
    appState.push(value);
  }
}

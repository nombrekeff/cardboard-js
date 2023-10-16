import { hstyle, Input, init, tag, allTags, attach, text, } from '../../dist/cardboard.js';
import styles from './style.js';
import TodoItem from './todo-item.js';
import appState from './state.js';
const { div, button, h3, link, p } = allTags;
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
attach(div.attach().addClass('todo-app'));
h3.attach('Cardboard TODO', text(' (count: $length) ', appState)).setStyle({
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
div.attach(itemInput, addItemBtn).addClass('header');
const todoList = div
    .attach(p('There are no items').addClass('list-empty').hideIf(appState.length))
    .addClass('todo-list');
function addItem(value) {
    if (value) {
        todoList.append(TodoItem(value, {
            remove: (s, c) => {
                const index = appState.indexOf(c);
                appState.splice(index, 1);
            },
        }));
    }
}
/* Adds a new TODO, from input field, adds to state */
function addItemFromInput() {
    const value = itemInput.consumeValue;
    if (value) {
        addItem(value);
        appState.push(value);
    }
}
for (const item of [...appState]) {
    addItem(item);
}
//# sourceMappingURL=todo.js.map
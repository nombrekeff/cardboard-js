import styles from './style.js';
import { init, allTags, hinput, hstyle, attach, tag, state } from '../../dist/cardboard.js';
import todoItem from './todo-item.js';
const { div, button, h3, link, p, span } = allTags;
init();
hstyle();
tag('(head)').add(link().addAttrs({ href: 'https://fonts.googleapis.com' }), link().addAttrs({ href: 'https://fonts.gstatic.com' }), link().addAttrs({
    href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300&display=swap',
}));
styles();
const todoState = state({
    items: [...JSON.parse(localStorage.getItem('TODOS'))],
});
todoState.items.changed((newItems) => {
    localStorage.setItem('TODOS', JSON.stringify([...newItems]));
});
const todoApp = div().addClass('todo-app');
attach(todoApp);
const itemInput = hinput({
    placeholder: 'Enter item content',
    submit: addItemFromInput,
});
const addItemBtn = button('+')
    .addClass('btn-add')
    .disable()
    .listen(itemInput, 'input', (self, other) => (other.value ? self.enable() : self.disable()))
    .clicked(addItemFromInput);
const todoCount = span.silent('0').consume(todoState.items.length, (self, count) => self.text(` (count: ${count}) `));
h3('Cardboard TODO'.toUpperCase(), todoCount).addStyle({ textAlign: 'center', margin: '24px 0' });
div(itemInput, addItemBtn).addClass('header');
const todoList = div(p('There are no items')
    .addClass('list-empty')
    .consume(todoState.items.length, (t, v) => {
    t.setStyle('display', v ? 'none' : 'block');
})).addClass('todo-list');
function addItem(value) {
    if (value) {
        todoList.add(todoItem(value, {
            remove: (s, c) => {
                const index = todoState.items.indexOf(c);
                todoState.items.splice(index, 1);
            },
        }));
    }
}
/* Adds a new TODO, from input field, adds to state */
function addItemFromInput() {
    if (itemInput.value) {
        addItem(itemInput.value);
        todoState.items.push(itemInput.value);
        itemInput.clear();
    }
}
for (const item of [...todoState.items]) {
    addItem(item);
}
//# sourceMappingURL=todo.js.map
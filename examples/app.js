import { init, allTags, state, attached } from '../dist/cardboard.js';
import { Input } from '../dist/ext/components.js';
import { hstyle } from '../dist/ext/base-style.js';
import { makeTween, tween, tweenTag } from '../dist/ext/tween.js';
const { div, button, input, ul, li, hr, style } = allTags;
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
const bounceOut = (tag) => makeTween({
    from: { scale: '0.9' },
    to: { scale: '1' },
    duration: 100,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) => tag.setStyle({ scale: `${value.scale}` }),
});
const bounceIn = (tag) => makeTween({
    from: { scale: '1' },
    to: { scale: '0.9' },
    duration: 100,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) => tag.setStyle({ scale: `${value.scale}` }),
});
const Counter = () => {
    let counter = state({ count: 0 });
    return button()
        .text(`Clicked $count times`, counter)
        .addStyle('color', 'red')
        .addClass('clicker')
        .clicked((self) => {
        counter.count++;
        tweenTag(self, bounceIn, () => {
            tweenTag(self, bounceOut);
        });
    });
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
const Todo = (value) => li(value, button('X').clicked((self) => self.parent.remove()));
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

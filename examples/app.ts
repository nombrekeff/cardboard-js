import { init, allTags, state, getMountPoint, CTag } from '../dist/cardboard.js';
import { Input } from '../dist/ext/components.js';
import { makeTween, tween, tweenTag } from '../dist/ext/tween.js';

// spread allTags to get desired HTML tags
const { div, button, input, ul, li, hr, style } = allTags;

// Initialize Cardboard
// This will initialize the Cardboard framework
// and create a root element referencing the 'body' by default
// You can also pass a custom mount point if needed
const root = init();

// Add custom stylesheet to the root element
root.append(style({
  '#list:after': {
    content: '"No items in list!"',
    position: 'absolute',
    opacity: '0',
  },
  '#list:empty:after': {
    opacity: '1',
  },
}));

//////////////////////////////////////////////////////////////

// Counter example

// This example demonstrates a button that increments a counter
// and applies a bounce animation on click.
// The bounce animation is achieved using the tweening library


// The `bounceIn` and `bounceOut` functions create the tween animations
// `bounceIn` scales the button down to 0.9 and then back to 1
// `bounceOut` scales the button up from 0.9 to 1
const bounceOut = (tag: CTag) =>
  makeTween({
    from: { scale: '0.9' },
    to: { scale: '1' },
    duration: 100,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) => tag.setStyle({ scale: `${value.scale}` }),
  });

const bounceIn = (tag: CTag) =>
  makeTween({
    from: { scale: '1' },
    to: { scale: '0.9' },
    duration: 100,
    easing: tween.Easing.Quadratic.InOut,
    update: (value) => tag.setStyle({ scale: `${value.scale}` }),
  });

// The `Counter` component creates a button that displays the number of clicks
const Counter = () => {
  // It uses a state variable to keep track of the count
  let count = state(0);

  return button()
    // The button displays the current count
    .text(`Clicked $count times`, { count })
    // set the color of the button to red
    .addStyle('color', 'red')
    // add a class to the button for styling
    .addClass('clicker')
    // add a click event listener
    .clicked((self) => {
      // When the button is clicked, increment the count
      count.value++;

      // Apply the bounceIn animation
      tweenTag(self, bounceIn, () => {
        tweenTag(self, bounceOut);
      });
    });
};

// Append the Counter component to the root element
root.append(Counter());

//////////////////////////////////////////////////////////////

// Attributes

root.append(hr());
root.append(
  input()
    // adds a placeholder attribute to the input element and sets its type to 'number'
    .setAttrs({ placeholder: 'Enter number', type: 'number' })
    .changed((t, evt) => {
      console.log(evt);
    })
);
root.append(hr());

//////////////////////////////////////////////////////////////

// Todo List
// This example demonstrates a simple todo list application

// Creates a Todo item component
const Todo = (value) =>
  li(
    value,
    button('X')
      // remove list item from the list when clicked
      .clicked((self) => self.parent.remove()),
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

getMountPoint().append(TodoList());

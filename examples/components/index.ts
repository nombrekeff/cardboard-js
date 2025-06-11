import { init, allTags, tag } from '../../dist/cardboard.js';
const { div, p, style } = allTags;

// Example of a styled component using Cardboard.js
// This example demonstrates how to create a simple styled component
// with custom styles applied to it.

// It adds a css style block to the head of the document
// and uses a class to apply styles to the component.

// This is done like this instead of using inline styles
// to keep the styles organized and reusable. 

// Inline styles can be used for quick prototyping, in tags/components that are not reused,
// or in places where dynamic styles are needed,
// but for reusable components, it's better to use classes, 
// otherwise the styles get added to each instance of the component,
// which can lead to performance issues.

tag('(head)').append(style({
  '.styled_thing': {
    backgroundColor: 'lightblue',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    color: 'darkslategray',
    textAlign: 'center',
    margin: '10px 0',
  }
}));

const StyledThing = () => {
  return div(
    p('This is a styled component'),
  ).addClass('styled_thing');
}

init().append(
  StyledThing(),
  StyledThing(),
);